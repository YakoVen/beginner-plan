import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const baseDir = process.cwd();
const catalogsDir = path.join(baseDir, 'catalogs');

function getBase64Image(fileName) {
    const filePath = path.join(baseDir, 'screenshots', fileName);
    if (fs.existsSync(filePath)) {
        const ext = path.extname(filePath).substring(1);
        const data = fs.readFileSync(filePath, 'base64');
        return `data:image/${ext};base64,${data}`;
    }
    console.warn(`Warning: Screenshot ${fileName} not found.`);
    return '';
}

const images = {
    '{{IMG_HOME}}': 'home.png',
    '{{IMG_ARTICLES}}': 'articles.png',
    '{{IMG_DASHBOARD}}': 'dashboard.png',
    '{{IMG_ORDERS}}': 'dashboard-orders.png',
    '{{IMG_ADD}}': 'dashboard-articles-add.png'
};

async function generatePdf(templateName, outputName) {
    let htmlPath = path.join(catalogsDir, templateName);
    if (!fs.existsSync(htmlPath)) {
        console.error(`Error: Template ${templateName} not found.`);
        return;
    }
    
    let html = fs.readFileSync(htmlPath, 'utf-8');
    
    // Inject images as base64 so puppeteer loads them synchronously without file:// protocol issues
    for (const [placeholder, filename] of Object.entries(images)) {
        const regex = new RegExp(placeholder, 'g');
        html = html.replace(regex, getBase64Image(filename));
    }

    console.log(`Generating ${outputName}...`);
    
    // Launch puppeteer
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    // Load HTML content
    await page.setContent(html, { waitUntil: 'networkidle0' });
    
    // Generate PDF
    await page.pdf({
        path: outputName,
        format: 'A4',
        printBackground: true,
        margin: { top: '0', right: '0', bottom: '0', left: '0' }
    });
    
    await browser.close();
    console.log(`Successfully generated ${outputName}`);
}

(async () => {
    try {
        await generatePdf('client-template.html', 'Client_Catalog.pdf');
        await generatePdf('developer-template.html', 'Developer_Guide.pdf');
        console.log('All catalogs generated successfully!');
    } catch (error) {
        console.error('Error generating catalogs:', error);
    }
})();
