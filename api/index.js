import puppeteer from "puppeteer";
import fs from "fs/promises"



(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Replace 'your_url_here' with the actual URL you want to visit
  await page.goto('https://www.cpubenchmark.net/cpu.php?cpu=Intel+Core+i5-8250U+%40+1.60GHz'
  );
//   const htmlContent = await page.content();
//   await fs.writeFile('output.html', htmlContent);
// Wait for the specific <td> element to be present in the DOM
await page.goto('https://www.cpubenchmark.net/cpu.php?cpu=Intel+Core+i5-8250U+%40+1.60GHz');

// Wait for the specific <span> element to be present in the DOM
await page.waitForSelector('.right-desc span[style="font-family: Arial, Helvetica, sans-serif;font-size: 44px;	font-weight: bold; color: #F48A18;"]');

// Extract the text content of the specific span element
const numericValue = await page.$eval('.right-desc span[style="font-family: Arial, Helvetica, sans-serif;font-size: 44px;	font-weight: bold; color: #F48A18;"]', (span) => span.textContent.trim());



// Use a regular expression to extract only numeric characters
// const numericValue = valueText.replace(/\D/g, '');

console.log('Numeric Value:', numericValue)

const value1915 = await page.evaluate(() => {
    const strong = document.querySelector('.right-desc strong:contains("Single Thread Rating:")');
    return strong.nextSibling.textContent.trim();
  });

  console.log('Value 1915:', value1915);


  await browser.close();
})();
