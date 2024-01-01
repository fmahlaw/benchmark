import puppeteer from "puppeteer";
// import fs from "fs/promises";
// import cheerio from "cheerio";

async function Finder() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.waitForTimeout(1000);
  const link =
    "https://www.cpubenchmark.net/cpu.php?cpu=Intel+Core+i5-8250U+%40+1.60GHz";

  await page.goto(link, { waitUntil: "networkidle0" });
  await page.waitForTimeout(1000);

  await page.waitForSelector(
    '.right-desc span[style="font-family: Arial, Helvetica, sans-serif;font-size: 44px;	font-weight: bold; color: #F48A18;"]'
  );
  await page.waitForTimeout(1000);
  // Extract the text content of the specific span element
  const numericValue = await page.$eval(
    '.right-desc span[style="font-family: Arial, Helvetica, sans-serif;font-size: 44px;	font-weight: bold; color: #F48A18;"]',
    (span) => span.textContent.trim()
  );

  // Use a regular expression to extract only numeric characters
  // const numericValue = valueText.replace(/\D/g, '');

  console.log("Multi Thread Rating::", numericValue);
  await page.waitForTimeout(1000);
  const value1915 = await page.evaluate(() => {
    const strong = document.querySelector(".right-desc strong");
    return strong.nextSibling.textContent.trim();
  });

  console.log("Single Thread Rating:", value1915);

  await browser.close();
}

Finder();

// async function FinderTest() {
//   console.log('Starting Puppeteer test...');
//   for (let i = 0; i < 10; i++) {
//     console.log(`Test ${i + 1}`);
//     await Finder(); // Assuming Finder is an asynchronous function using Puppeteer
//   }
//   console.log('Puppeteer test completed.');
// }

// FinderTest().catch(console.error);


  // const htmlContent = await page.content();
  // await fs.writeFile("output.html", htmlContent);
  // // Wait for the specific <td> element to be present in the DOM

  // const $ = cheerio.load(htmlContent);

  // // Wait for the specific selector
  // $(
  //   '.right-desc span[style="font-family: Arial, Helvetica, sans-serif;font-size: 44px; font-weight: bold; color: #F48A18;"]'
  // );

  // // Extract the text content of the specific span element
  // const numericValuee = $(
  //   '.right-desc span[style="font-family: Arial, Helvetica, sans-serif;font-size: 44px; font-weight: bold; color: #F48A18;"]'
  // )
  //   .text()
  //   .trim();

  // console.log("Multi Thread Rating:", numericValuee);

  // // Extract the value from the next sibling of the <strong> element
  // const value19156 = $(".right-desc strong").next().text().trim();

  // console.log("Single Thread Rating:", value19156);

  // Wait for the specific <span> element to be present in the DOM