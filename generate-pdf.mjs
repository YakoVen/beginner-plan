import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const screenshotDir = path.join(process.cwd(), 'screenshots');
const images = fs.readdirSync(screenshotDir).filter(f => f.endsWith('.png'));

let htmlContent = `
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; }
    .page { page-break-after: always; text-align: center; margin-bottom: 40px; }
    img { max-width: 100%; border: 1px solid #ccc; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
    h2 { color: #333; text-transform: capitalize; }
  </style>
</head>
<body>
  <h1>Application Screenshots</h1>
`;

for (const img of images) {
  const imgPath = path.join(screenshotDir, img);
  const base64 = fs.readFileSync(imgPath).toString('base64');
  const name = img.replace('.png', '').replace(/-/g, ' ');
  htmlContent += `
  <div class="page">
    <h2>${name}</h2>
    <img src="data:image/png;base64,${base64}" />
  </div>
  `;
}

htmlContent += `</body></html>`;

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent);
  await page.pdf({ path: 'App_Screenshots.pdf', format: 'A4', printBackground: true });
  await browser.close();
  console.log('PDF generated successfully!');
})();
