const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({
    executablePath: '/root/.cache/ms-playwright/chromium-1194/chrome-linux/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1680, height: 1050 });

  const filePath = path.resolve(__dirname, 'index.html');
  await page.goto('file://' + filePath, { waitUntil: 'load', timeout: 30000 });

  // wait for charts to render
  await page.waitForTimeout(3000);

  await page.screenshot({
    path: path.resolve(__dirname, 'screenshot.png'),
    fullPage: true,
  });

  console.log('Screenshot saved.');
  await browser.close();
})();
