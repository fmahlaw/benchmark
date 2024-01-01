import puppeteer from "puppeteer";

async function Finder(retries = 3) {
    let retryCount = 0;
  
    while (retryCount < retries) {
      try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
  
        await page.waitForTimeout(1000);
        const link = "https://www.cpubenchmark.net/cpu.php?cpu=Intel+Core+i5-8250U+%40+1.60GHz";
  
        await page.goto(link, { waitUntil: "networkidle0" });
        await page.waitForTimeout(1000);
  
        await page.waitForSelector('.right-desc span[style="font-family: Arial, Helvetica, sans-serif;font-size: 44px; font-weight: bold; color: #F48A18;"]');
        await page.waitForTimeout(1000);
  
        const numericValue = await page.$eval('.right-desc span[style="font-family: Arial, Helvetica, sans-serif;font-size: 44px; font-weight: bold; color: #F48A18;"]', (span) => span.textContent.trim());
        console.log("Multi Thread Rating:", numericValue);
  
        await page.waitForTimeout(1000);
        const value1915 = await page.evaluate(() => {
          const strong = document.querySelector(".right-desc strong");
          return strong.nextSibling.textContent.trim();
        });
        console.log("Single Thread Rating:", value1915);
  
        await browser.close();
        return; // Exit the function on successful completion
      } catch (error) {
        console.error("Error occurred:", error);
        retryCount++;
        console.log(`Retrying... Attempt ${retryCount} of ${retries}`);
      }
    }
  
    console.error(`Failed after ${retries} attempts. Exiting...`);
  }
  
  Finder(1).catch(console.error); // Run with 1 retry (runs once, retries if it fails)
  