/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { chromium } from 'playwright';
import * as cheerio from 'cheerio';

// Получение HTML через Playwright
export async function fetchHtmlWithPlaywright(url: string): Promise<string> {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    const response = await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    });

    if (!response || !response.ok()) {
      throw new Error(
        `Не удалось загрузить страницу, статус: ${response?.status()}`,
      );
    }

    const isCaptcha = await page.$('form[action*="validateCaptcha"]');
    if (isCaptcha) {
      throw new Error('Amazon требует CAPTCHA. Парсинг невозможен.');
    }

    const html = await page.content();
    return html;
  } finally {
    await browser.close();
  }
}

// Оставляем только текст из <div id="centerCol">
export function extractCelwidgetOnly(html: string): string {
  const $ = cheerio.load(html);

  const centerCol = $('div#centerCol');

  if (centerCol.length === 0) return '';

  // Удаляем ненужные элементы внутри centerCol
  centerCol
    .find('script, style, meta, noscript, iframe, svg, link, head')
    .remove();
  centerCol
    .find(
      '[style*="display:none"], [style*="visibility:hidden"], [hidden], [aria-hidden="true"]',
    )
    .remove();

  // Получаем чистый текст
  const text = centerCol.text();

  // Очищаем от лишних пробелов
  return text.replace(/\s+/g, ' ').trim();
}
