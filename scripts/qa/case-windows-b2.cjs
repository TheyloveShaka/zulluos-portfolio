const path = require('path')
const { chromium } = require('C:/Users/DELL/Desktop/projects/Money makers/frozen-basket/node_modules/playwright')

const url = process.argv[2] || 'http://localhost:3000'
const out = path.join(__dirname, '..', '..', 'docs', 'shots')
const sizes = [
  [1440, 900],
  [375, 812],
]

const FONT_TARGETS = [
  ['h1 (About name)', 'h1'],
  ['stack group heading', '.stack-group__heading'],
  ['case tile headline', '.case-tile__headline'],
  ['hire me opening', '.hire-me__opening'],
  ['approach paragraph', '.approach__paragraph'],
  ['window title bar', '#title'],
]

async function freshPage(browser, width, height) {
  const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, isMobile: width < 768, hasTouch: width < 768 })
  const page = await context.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1200)
  return { context, page, errors }
}

;(async () => {
  const browser = await chromium.launch()
  for (const [width, height] of sizes) {
    console.log(`\n=== ${width}x${height} ===`)
    const allErrors = []
    let combinedText = ''
    const fonts = {}

    {
      const { context, page, errors } = await freshPage(browser, width, height)
      await page.getByRole('button', { name: 'View case studies' }).click()
      await page.waitForTimeout(500)
      await page.screenshot({ path: path.join(out, `b2-case-studies-${width}.png`) })
      combinedText += await page.evaluate(() => document.body.innerText)

      await page.getByRole('button', { name: 'Open case study: Kamwe Forex' }).click()
      await page.waitForTimeout(500)
      await page.screenshot({ path: path.join(out, `b2-case-study-viewer-${width}.png`) })
      combinedText += await page.evaluate(() => document.body.innerText)
      const activeAfterOpen = await page.evaluate(() => document.activeElement.className)
      console.log(`focusedOnTitleOnOpen=${activeAfterOpen.includes('case-viewer__title')} (activeElement class="${activeAfterOpen}")`)

      await page.keyboard.press('Escape')
      await page.waitForTimeout(300)
      const viewerClosedByEsc = await page.evaluate(() => !document.getElementById('window-caseStudy'))
      console.log(`viewerClosedByEsc=${viewerClosedByEsc}`)

      for (const [label, selector] of [['case tile headline', '.case-tile__headline']]) {
        fonts[label] = await page.evaluate((sel) => {
          const el = document.querySelector(sel)
          return el ? getComputedStyle(el).fontFamily : '(not found)'
        }, selector)
      }

      allErrors.push(...errors)
      await context.close()
    }

    {
      const { context, page, errors } = await freshPage(browser, width, height)
      await page.locator('.about-cta-row').getByRole('button', { name: 'Hire me' }).click()
      await page.waitForTimeout(500)
      await page.screenshot({ path: path.join(out, `b2-hire-me-${width}.png`) })
      combinedText += await page.evaluate(() => document.body.innerText)
      fonts['hire me opening'] = await page.evaluate(() => {
        const el = document.querySelector('.hire-me__opening')
        return el ? getComputedStyle(el).fontFamily : '(not found)'
      })
      allErrors.push(...errors)
      await context.close()
    }

    {
      const { context, page, errors } = await freshPage(browser, width, height)
      if (width < 768) {
        await page.locator('#window-about').getByLabel('Close Window').click()
        await page.waitForTimeout(300)
      }
      await page.locator('.iconWrapper', { hasText: 'My Approach.txt' }).click()
      await page.waitForTimeout(500)
      await page.screenshot({ path: path.join(out, `b2-approach-${width}.png`) })
      combinedText += await page.evaluate(() => document.body.innerText)
      fonts['approach paragraph'] = await page.evaluate(() => {
        const el = document.querySelector('.approach__paragraph')
        return el ? getComputedStyle(el).fontFamily : '(not found)'
      })
      allErrors.push(...errors)
      await context.close()
    }

    {
      const { context, page, errors } = await freshPage(browser, width, height)
      for (const [label, selector] of FONT_TARGETS) {
        if (fonts[label]) continue
        fonts[label] = await page.evaluate((sel) => {
          const el = document.querySelector(sel)
          return el ? getComputedStyle(el).fontFamily : '(not found)'
        }, selector)
      }
      allErrors.push(...errors)
      await context.close()
    }

    const hasAsk = /\bASK\b/.test(combinedText)
    const hasEmDash = combinedText.includes('\u2014')

    console.log(`errors=${allErrors.length ? allErrors.join(' | ') : 0}`)
    console.log(`hasAsk=${hasAsk}`)
    console.log(`hasEmDash=${hasEmDash}`)
    console.log('fonts:', JSON.stringify(fonts, null, 2))
  }
  await browser.close()
})()
