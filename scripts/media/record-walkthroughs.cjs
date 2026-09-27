'use strict'

const path = require('path')
const fs = require('fs')
const { execFileSync } = require('child_process')
const { chromium } = require('C:/Users/DELL/Desktop/projects/Money makers/frozen-basket/node_modules/playwright')

const REPO_ROOT = path.resolve(__dirname, '..', '..')
const PUBLIC_ROOT = path.join(REPO_ROOT, 'public', 'case-studies')
const RAW_ROOT = path.join(__dirname, '.raw')
const MAX_BYTES = 2 * 1024 * 1024
const HERO_HOLD_MS = 2000
const MOTION_BUDGET_MS = 9200
const TAIL_MS = 300
const MIN_CLIP_S = 10
const MAX_CLIP_S = 12

function parseArgs(argv) {
  const [id, url] = argv
  if (!id || !url) {
    console.error('Usage: node record-walkthroughs.cjs <id> <url>')
    process.exit(1)
  }
  return { id, url }
}

const HIDE_OVERLAYS_CSS = `
  nextjs-portal, #__next-build-watcher, [data-nextjs-toast], [data-next-badge-root],
  #webpack-dev-server-client-overlay, vite-plugin-checker-error-overlay {
    display: none !important;
    visibility: hidden !important;
  }
`

async function dismissBanners(page) {
  const patterns = [/accept/i, /allow all/i, /got it/i, /agree/i, /decline/i, /no thanks/i, /reject/i, /^close$/i, /^x$/i]
  try {
    const buttons = await page.$$('button, a[role="button"], [role="button"]')
    for (const btn of buttons.slice(0, 40)) {
      const text = ((await btn.innerText().catch(() => '')) || '').trim()
      if (!text || text.length > 30) continue
      if (patterns.some((p) => p.test(text))) {
        const visible = await btn.isVisible().catch(() => false)
        if (visible) {
          await btn.click({ timeout: 1000 }).catch(() => {})
          await page.waitForTimeout(300)
        }
      }
    }
  } catch {
  }
}

async function waitForImagesLoaded(page, timeoutMs) {
  await page
    .evaluate((timeout) => {
      const imgs = Array.from(document.images).filter((img) => !img.complete)
      if (imgs.length === 0) return undefined
      return Promise.race([
        Promise.all(
          imgs.map(
            (img) =>
              new Promise((resolve) => {
                img.addEventListener('load', resolve, { once: true })
                img.addEventListener('error', resolve, { once: true })
              }),
          ),
        ),
        new Promise((resolve) => setTimeout(resolve, timeout)),
      ])
    }, timeoutMs)
    .catch(() => {})
}

async function easedWalkthrough(page) {
  const metrics = await page.evaluate(() => ({
    scrollHeight: document.documentElement.scrollHeight,
    viewportHeight: window.innerHeight,
  }))
  const maxScroll = Math.max(0, metrics.scrollHeight - metrics.viewportHeight)
  const isShort = maxScroll < metrics.viewportHeight * 0.3

  if (isShort) {
    const candidates = await page.$$('a, button')
    const targets = []
    for (const el of candidates) {
      if (targets.length >= 2) break
      const visible = await el.isVisible().catch(() => false)
      if (!visible) continue
      const box = await el.boundingBox().catch(() => null)
      if (!box || box.width < 20 || box.height < 10) continue
      targets.push(el)
    }
    if (targets.length === 0) {
      await page.waitForTimeout(MOTION_BUDGET_MS)
      return
    }
    const each = Math.floor(MOTION_BUDGET_MS / targets.length)
    for (const el of targets) {
      await el.hover({ timeout: 1000 }).catch(() => {})
      await page.waitForTimeout(each)
    }
    return
  }

  const fractions = [0.18, 0.4, 0.6, 0.78, 0.9]
  const waits = [1800, 1700, 1700, 1700, 1600]
  for (let i = 0; i < fractions.length; i += 1) {
    const target = Math.round(maxScroll * fractions[i])
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'smooth' }), target)
    await page.waitForTimeout(waits[i])
  }
}

function ffprobeField(file, args) {
  return execFileSync('ffprobe', args.concat([file])).toString().trim()
}

function fileReport(file) {
  const stat = fs.statSync(file)
  const duration = parseFloat(
    ffprobeField(file, ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1']),
  )
  const audioStreams = ffprobeField(file, ['-v', 'error', '-select_streams', 'a', '-show_entries', 'stream=index', '-of', 'csv=p=0'])
  return {
    path: file,
    bytes: stat.size,
    kb: Math.round(stat.size / 1024),
    duration,
    hasAudio: audioStreams.length > 0,
  }
}

function encodeVariant(src, dest, start, clipLen, buildArgs, qualitySteps, sizes) {
  for (const size of sizes) {
    for (const q of qualitySteps) {
      const args = ['-y', '-ss', String(start), '-i', src]
        .concat(buildArgs(size, q))
        .concat(['-t', String(clipLen), dest])
      execFileSync('ffmpeg', args)
      if (fs.statSync(dest).size <= MAX_BYTES) return
    }
  }
}

function encodeMp4(src, dest, start, clipLen) {
  encodeVariant(
    src,
    dest,
    start,
    clipLen,
    (size, crf) => ['-an', '-r', '24', '-vf', `scale=${size}`, '-c:v', 'libx264', '-crf', String(crf), '-pix_fmt', 'yuv420p', '-movflags', '+faststart'],
    [28, 30, 32, 34, 36, 38],
    ['1280:720', '960:540'],
  )
}

function encodeWebm(src, dest, start, clipLen) {
  encodeVariant(
    src,
    dest,
    start,
    clipLen,
    (size, crf) => ['-an', '-r', '24', '-vf', `scale=${size}`, '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', String(crf)],
    [34, 38, 42, 46],
    ['1280:720', '960:540'],
  )
}

function encodePosterFromScreenshot(pngPath, dest) {
  execFileSync('ffmpeg', ['-y', '-i', pngPath, '-frames:v', '1', '-vf', 'scale=1280:720', '-c:v', 'libwebp', '-quality', '80', dest])
}

async function run() {
  const { id, url } = parseArgs(process.argv.slice(2))
  const outDir = path.join(PUBLIC_ROOT, id)
  const rawDir = path.join(RAW_ROOT, id)
  fs.mkdirSync(outDir, { recursive: true })
  fs.mkdirSync(rawDir, { recursive: true })

  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1,
    recordVideo: { dir: rawDir, size: { width: 1280, height: 720 } },
  })
  const recordingStartedAt = Date.now()
  const page = await context.newPage()
  await page.addInitScript((css) => {
    const style = document.createElement('style')
    style.textContent = css
    document.documentElement.appendChild(style)
  }, HIDE_OVERLAYS_CSS)

  let failed = null
  let heroHoldStart = null
  const posterPngPath = path.join(rawDir, 'poster-source.png')

  try {
    await page.goto(url, { waitUntil: 'load', timeout: 45000 })
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {})
    await page.addStyleTag({ content: HIDE_OVERLAYS_CSS }).catch(() => {})
    await page.evaluate(() => document.fonts && document.fonts.ready).catch(() => {})
    await waitForImagesLoaded(page, 4000)
    await dismissBanners(page)
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(150)
    await page.mouse.move(640, 360)

    await page.screenshot({ path: posterPngPath, type: 'png' })

    heroHoldStart = Date.now()
    await page.waitForTimeout(HERO_HOLD_MS)
    await easedWalkthrough(page)
    await page.waitForTimeout(TAIL_MS)
  } catch (err) {
    failed = err
  }

  const videoHandle = page.video()
  await page.close().catch(() => {})
  await context.close()
  await browser.close()

  if (failed) {
    throw failed
  }

  const recordedPathTmp = await videoHandle.path()
  const recordedPath = path.join(rawDir, 'recording.webm')
  if (fs.existsSync(recordedPath)) fs.rmSync(recordedPath, { force: true })
  fs.renameSync(recordedPathTmp, recordedPath)

  const rawDuration = parseFloat(
    ffprobeField(recordedPath, ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1']),
  )
  const clipStart = Math.max(0, (heroHoldStart - recordingStartedAt) / 1000)
  const available = Math.max(0, rawDuration - clipStart)
  const clipLen = Math.max(0, Math.min(MAX_CLIP_S, available))

  fs.writeFileSync(
    path.join(rawDir, 'meta.json'),
    JSON.stringify(
      {
        id,
        url,
        recordedAt: new Date(recordingStartedAt).toISOString(),
        heroHoldOffsetSeconds: clipStart,
        rawDurationSeconds: rawDuration,
        clipLenSeconds: clipLen,
        underTargetMin: clipLen < MIN_CLIP_S,
      },
      null,
      2,
    ),
  )

  const mp4Path = path.join(outDir, 'walkthrough.mp4')
  const webmPath = path.join(outDir, 'walkthrough.webm')
  const posterPath = path.join(outDir, 'poster.webp')

  encodeMp4(recordedPath, mp4Path, clipStart, clipLen)
  encodeWebm(recordedPath, webmPath, clipStart, clipLen)
  encodePosterFromScreenshot(posterPngPath, posterPath)

  const report = {
    id,
    url,
    clipStartSeconds: Number(clipStart.toFixed(2)),
    clipLenSeconds: Number(clipLen.toFixed(2)),
    mp4: fileReport(mp4Path),
    webm: fileReport(webmPath),
    poster: { path: posterPath, kb: Math.round(fs.statSync(posterPath).size / 1024) },
  }
  console.log(JSON.stringify(report, null, 2))
}

run().catch((err) => {
  console.error('record-walkthroughs failed:', err && err.stack ? err.stack : err)
  process.exit(1)
})
