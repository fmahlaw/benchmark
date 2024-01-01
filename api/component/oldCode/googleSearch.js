import puppeteer from 'puppeteer';

async function performGoogleSearch(query) {
  const browser = await puppeteer.launch({ headless: false }); // Launch a visible browser window
  const page = await browser.newPage();

  try {
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    await page.goto(googleUrl);
    await page.waitForSelector('div.g');

    // Click on the first search result link
    const firstLink = await page.$('div.g a');
    if (firstLink) {
      await firstLink.click();
      console.log('Navigated to the top search result.');
    } else {
      console.log('No search results found.');
    }

    // For demonstration purposes, waiting for 5 seconds before closing the browser
    await page.waitForTimeout(5000);
    await browser.close();
  } catch (error) {
    console.error('Error:', error);
    await browser.close();
  }
}

// Replace 'processor name' with the desired search query
const query = 'Intel Core i5-8500 passmark';

performGoogleSearch(query).catch(console.error);
