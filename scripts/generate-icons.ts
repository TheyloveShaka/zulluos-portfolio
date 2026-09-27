
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import pngToIco from 'png-to-ico'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const iconSvgPath = resolve(root, 'src/img/s-monogram.svg')
const publicDir = resolve(root, 'public')

const iconSvg = readFileSync(iconSvgPath)

async function renderPng(size: number): Promise<Buffer> {
  return sharp(iconSvg, { density: 384 })
    .resize(size, size)
    .png()
    .toBuffer()
}

async function writePng(relativePath: string, size: number) {
  const buffer = await renderPng(size)
  const outPath = resolve(publicDir, relativePath)
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, buffer)
  console.log(`  wrote ${relativePath} (${size}x${size}, ${buffer.length} bytes)`)
}

const pngTargets: Record<string, number> = {
  'favicon-16x16.png': 16,
  'favicon-32x32.png': 32,
  'apple-touch-icon-60x60.png': 60,
  'apple-touch-icon-60x60-precomposed.png': 60,
  'apple-touch-icon-76x76.png': 76,
  'apple-touch-icon-76x76-precomposed.png': 76,
  'apple-touch-icon-120x120.png': 120,
  'apple-touch-icon-120x120-precomposed.png': 120,
  'apple-touch-icon-152x152.png': 152,
  'apple-touch-icon-152x152-precomposed.png': 152,
  'apple-touch-icon-180x180.png': 180,
  'apple-touch-icon-180x180-precomposed.png': 180,
  'apple-touch-icon.png': 180,
  'apple-touch-icon-precomposed.png': 180,
  'android-chrome-192x192.png': 192,
  'android-chrome-512x512.png': 512,
  'mstile-150x150.png': 150,
  'logo192.png': 192,
  'logo512.png': 512,
}

async function generateFaviconIco() {
  const sizes = [16, 32, 48]
  const buffers = await Promise.all(sizes.map(renderPng))
  const ico = await pngToIco(buffers)
  const outPath = resolve(publicDir, 'favicon.ico')
  writeFileSync(outPath, ico)
  console.log(`  wrote favicon.ico (16/32/48 combined, ${ico.length} bytes)`)
}

async function copyFaviconSvg() {
  const outPath = resolve(publicDir, 'favicon.svg')
  writeFileSync(outPath, iconSvg)
  console.log('  wrote favicon.svg (copied from src/img/s-monogram.svg)')
}

async function main() {
  console.log(`Generating icons from ${iconSvgPath}\n`)

  for (const [file, size] of Object.entries(pngTargets)) {
    await writePng(file, size)
  }

  await generateFaviconIco()
  await copyFaviconSvg()

  console.log('\nDone. safari-pinned-tab.svg is hand-authored (monochrome mask) and not touched by this script.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
