import puppeteer from "puppeteer";
import cheerio from "cheerio";

let htmlContent = "";

async function Finder() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const link =
    "https://www.cpubenchmark.net/cpu.php?cpu=Intel+Core+i5-8250U+%40+1.60GHz";

  await page.goto(link);
  htmlContent = await page.content();

  await browser.close();

  // Split content by lines
  const contentLines = htmlContent.split(/\r?\n/);

  // Get lines from 1300 to 1400
  const specificLines = contentLines.slice(1200, 1350).join("\n");

  const $ = cheerio.load(specificLines);
  //   console.log($.html());

  const singleThreadRatingStrong = $(
    'strong:contains("Single Thread Rating:")'
  );

  const averageCPUMark = $(".right-desc span:nth-child(3)").text().trim();
  console.log("Average CPU Mark:", averageCPUMark);

  const singleThreadRatingValue = singleThreadRatingStrong[0].next.data.trim();
  console.log("Single Thread Rating Value:", singleThreadRatingValue);
}

// Finder();
async function FinderTest() {
  console.log('Starting Puppeteer test...');
  for (let i = 0; i < 10; i++) {
    console.log(`Test ${i + 1}`);
    await Finder(); // Assuming Finder is an asynchronous function using Puppeteer
  }
  console.log('Puppeteer test completed.');
}

FinderTest()