import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = path.join(process.cwd(), 'screenshots');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR);
}

const routes = [
  { name: 'home', url: 'http://localhost:3000/' },
  { name: 'articles', url: 'http://localhost:3000/articles' },
  { name: 'dashboard', url: 'http://localhost:3000/dashboard' },
  { name: 'dashboard-articles', url: 'http://localhost:3000/dashboard/articles' },
  { name: 'dashboard-articles-add', url: 'http://localhost:3000/dashboard/articles/add' },
  { name: 'dashboard-orders', url: 'http://localhost:3000/dashboard/orders' }
];

(async () => {
  console.log('Starting Puppeteer...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  console.log('Logging in...');
  try {
    await page.goto('http://localhost:3000/dashboard', { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForSelector('#email', { timeout: 10000 });
    await page.type('#email', 'admin@store.com');
    await page.type('#password', 'password123');
    await page.click('button[type=\"submit\"]');
    
    // wait until the email field disappears, meaning we are logged in
    await page.waitForFunction(() => !document.querySelector('#email'), { timeout: 10000 });
    await new Promise(r => setTimeout(r, 2000));
    console.log('Logged in successfully!');
  } catch (e) {
    console.log('Login error or already logged in: ' + e.message);
  }

  for (const route of routes) {
    console.log('Navigating to ' + route.name + '...');
    try {
      await page.goto(route.url, { waitUntil: 'networkidle2', timeout: 60000 });
      await new Promise(r => setTimeout(r, 2000)); // allow client-side hydration/rendering
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, route.name + '.png'), fullPage: true });
      console.log('Saved screenshot for ' + route.name);
    } catch (e) {
      console.log('Failed to load ' + route.name + ': ' + e.message);
    }
  }

  await browser.close();
  console.log('Done!');
})();
