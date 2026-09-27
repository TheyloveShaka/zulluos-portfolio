const path = require('path')
const { chromium } = require('C:/Users/DELL/Desktop/projects/Money makers/frozen-basket/node_modules/playwright')

const url = process.argv[2] || 'http://localhost:3000'
const outDir = path.join(__dirname, '..', '..', 'docs', 'shots')

const results = []
const record = (label, pass, detail) => {
  results.push({ label, pass, detail })
  console.log(`[${pass ? 'PASS' : 'FAIL'}] ${label}${detail ? ' - ' + detail : ''}`)
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function run(viewport) {
  const browser = await chromium.launch()
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1 })
  const page = await context.newPage()

  const consoleErrors = []
  const pageErrors = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text())
  })
  page.on('pageerror', (e) => pageErrors.push(e.message))

  await page.goto(url, { waitUntil: 'networkidle' })
  await page.waitForSelector('#window-about', { timeout: 20000 })
  await page.waitForSelector('.clippy', { timeout: 20000 })
  await page.waitForTimeout(800)

  const merlinBox = async () => page.locator('.clippy').boundingBox()

  const clickMerlin = async () => {
    const box = await merlinBox()
    const vp = page.viewportSize()
    const x = Math.min(Math.max(box.x + box.width / 2, 2), vp.width - 2)
    const y = Math.min(Math.max(box.y + box.height / 2, 2), vp.height - 2)
    await page.mouse.click(x, y)
  }

  const chatWindowCount = async () => page.locator('#window-merlinChat').count()
  const chatVisible = async () => {
    const count = await chatWindowCount()
    if (count === 0) return false
    return page.locator('#window-merlinChat').first().isVisible()
  }
  const chatRootCount = async () => page.locator('.wizard-chat').count()

  const isMerlinChatFocused = async () =>
    page.evaluate(() => {
      const el = document.getElementById('window-merlinChat')
      if (!el) return false
      const zIndex = Number(getComputedStyle(el).zIndex) || 0
      const others = Array.from(document.querySelectorAll('[id^="window-"]'))
        .filter((n) => n.id !== 'window-merlinChat' && getComputedStyle(n).visibility === 'visible')
        .map((n) => Number(getComputedStyle(n).zIndex) || 0)
      return others.every((z) => z <= zIndex)
    })

  await clickMerlin()
  await page.waitForTimeout(300)
  record('single click opens the chat', await chatVisible())

  for (let i = 0; i < 3; i++) await clickMerlin()
  await page.waitForTimeout(300)
  record('3 fast clicks leave exactly one chat instance', (await chatWindowCount()) === 1 && (await chatRootCount()) === 1)

  for (let i = 0; i < 10; i++) await clickMerlin()
  await page.waitForTimeout(300)
  const afterTenClicksCount = await chatWindowCount()
  const afterTenClicksVisible = await chatVisible()
  const afterTenClicksFocused = await isMerlinChatFocused()
  record(
    '10 clicks leave exactly one chat window, open and focused',
    afterTenClicksCount === 1 && afterTenClicksVisible && afterTenClicksFocused,
    `count=${afterTenClicksCount} visible=${afterTenClicksVisible} focused=${afterTenClicksFocused}`,
  )

  const stateBeforeDrag = await chatVisible()
  const box = await merlinBox()
  const startX = box.x + box.width / 2
  const startY = box.y + box.height / 2
  await page.mouse.move(startX, startY)
  await page.mouse.down()
  await page.mouse.move(startX + 60, startY, { steps: 12 })
  await page.mouse.up()
  await page.waitForTimeout(300)
  const stateAfterDrag = await chatVisible()
  record(
    'releasing a drag never opens or closes the chat',
    stateBeforeDrag === stateAfterDrag,
    `before=${stateBeforeDrag} after=${stateAfterDrag}`,
  )

  await clickMerlin()
  await page.waitForTimeout(300)
  record('chat open after explicit open step', await chatVisible())

  const balloonSamples = []
  const clippyStyleSamples = new Set()
  for (let elapsed = 0; elapsed < 30000; elapsed += 3000) {
    await sleep(3000)
    const sample = await page.evaluate(() => {
      const b = document.querySelector('.clippy-balloon')
      const shown = !!b && !b.hasAttribute('hidden') && getComputedStyle(b).display !== 'none' && b.textContent.trim().length > 0
      return {
        balloon: shown,
        style: document.querySelector('.clippy')?.getAttribute('style') || '',
      }
    })
    balloonSamples.push(sample.balloon)
    clippyStyleSamples.add(sample.style)
  }
  const anyBalloon = balloonSamples.some(Boolean)
  record(
    '30s idle shows zero unprompted balloons',
    !anyBalloon,
    `samples=${JSON.stringify(balloonSamples)}`,
  )
  record(
    '30s idle: no unprompted sprite animation (position/style held steady)',
    clippyStyleSamples.size <= 1,
    `distinct style snapshots=${clippyStyleSamples.size}`,
  )

  await page.locator('#window-merlinChat .close-window').click()
  await page.waitForTimeout(500)
  const closedOk = !(await chatVisible())
  await clickMerlin()
  await page.waitForTimeout(300)
  const reopenedOk = await chatVisible()
  record('close then reopen works', closedOk && reopenedOk, `closed=${closedOk} reopened=${reopenedOk}`)

  const taskbarButtonExists = await page.locator('#task-merlinChat').count()
  if (viewport.width >= 768) {
    await page.locator('#task-merlinChat').first().click()
    await page.waitForTimeout(300)
    const stillOpenAfterTaskbarClick = await chatVisible()
    const focusedAfterTaskbarClick = await isMerlinChatFocused()
    record(
      'taskbar button exists and restores/focuses (same contract as any other window)',
      taskbarButtonExists > 0 && stillOpenAfterTaskbarClick && focusedAfterTaskbarClick,
      `exists=${taskbarButtonExists} stillOpen=${stillOpenAfterTaskbarClick} focused=${focusedAfterTaskbarClick}`,
    )
  } else {
    record(
      'taskbar button DOM node exists (icon-only under 768px)',
      taskbarButtonExists > 0,
      `exists=${taskbarButtonExists}`,
    )
  }
  await page.locator('#window-merlinChat .close-window').click()
  await page.waitForTimeout(500)
  const taskbarGoneAfterClose = (await page.locator('#task-merlinChat').count()) === 0
  record('taskbar button disappears once the chat is closed', taskbarGoneAfterClose)

  await clickMerlin()
  await page.waitForTimeout(300)
  record('click after close reopens the chat', await chatVisible())

  await page.screenshot({ path: path.join(outDir, `merlin-${viewport.width}.png`) })

  const isPreexisting = (msg) =>
    msg.includes('findDOMNode') || msg.includes('ipapi.co') || msg.includes('Error fetching IP address') || msg.includes('ERR_FAILED')
  const wizardConsoleErrors = consoleErrors.filter((m) => !isPreexisting(m))
  const wizardPageErrors = pageErrors.filter((m) => !isPreexisting(m))
  record(
    'zero console errors from the wizard',
    wizardConsoleErrors.length === 0 && wizardPageErrors.length === 0,
    `consoleErrors=${JSON.stringify(wizardConsoleErrors)} pageErrors=${JSON.stringify(wizardPageErrors)} (${consoleErrors.length} total console errors, ${consoleErrors.length - wizardConsoleErrors.length} pre-existing/unrelated)`,
  )

  await context.close()
  await browser.close()
}

;(async () => {
  const only = process.argv[3]
  if (!only || only === '1440') await run({ width: 1440, height: 900 })
  if (!only || only === '375') await run({ width: 375, height: 812 })

  const failed = results.filter((r) => !r.pass)
  console.log(`\n${results.length - failed.length}/${results.length} checks passed`)
  if (failed.length) {
    console.log('FAILURES:')
    failed.forEach((f) => console.log(`  - ${f.label}${f.detail ? ' (' + f.detail + ')' : ''}`))
    process.exitCode = 1
  }
})()
