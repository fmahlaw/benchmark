import puppeteer from "puppeteer";
import cheerio from "cheerio";

export async function PartFinder(query) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(
      query
    )} passmark`;
    await page.goto(googleUrl);

    // Wait for the search results to load
    await page.waitForSelector("div.g");

    const firstLink = await page.$("div.g a");

    if (!firstLink) {
      throw new Error("No search results found.");
    }

    const href = await page.evaluate(
      (link) => link.getAttribute("href"),
      firstLink
    );

    if (!href || !href.includes("cpubenchmark.net")) {
      throw new Error(
        "The first search result is not from www.cpubenchmark.net."
      );
    }

    await firstLink.click();
    await page.waitForSelector(".right-desc");

    const htmlContent = await page.content();

    const contentLines = htmlContent.split(/\r?\n/);
    const specificLines = contentLines.slice(1200, 1350).join("\n");
    const $ = cheerio.load(specificLines);

    const singleThreadRatingStrong = $(
      'strong:contains("Single Thread Rating:")'
    );
    const averageCPUMark = $(".right-desc span:nth-child(3)").text().trim();

    const singleThreadRatingValue =
      singleThreadRatingStrong[0].next.data.trim();

    await browser.close();

    const data = {
      
      averageCPUMark,
      singleThreadRatingValue,
    };

    return data;
  } catch (error) {
    console.error("Error:", error.message || error);
    await browser.close();
  }
}

// const query = "i5 8250u";
// Finder(query);

// async function FinderTest() {
//   console.log("Starting Puppeteer test...");
//   for (let i = 0; i < 10; i++) {
//     console.log(`Test ${i + 1}`);
//     await Finder(query); // Assuming Finder is an asynchronous function using Puppeteer
//   }
//   console.log("Puppeteer test completed.");
// }

// FinderTest();

export async function PartPPV(req, res) {
  const { price, query } = req.query;

  try {
    if (!price) {
      throw new Error("Price not provided");
    }

    const cpuPrice = parseFloat(price);
    const cpuPerformanceRating = await PartFinder(query);

    if (isNaN(cpuPrice)) {
      throw new Error("Invalid price");
    }

    // Calculate the Price Performance Value (PPV)
    const pricePerformanceValueMT =
      cpuPrice / parseFloat(cpuPerformanceRating.averageCPUMark);
    const pricePerformanceValueST =
      cpuPrice / parseFloat(cpuPerformanceRating.singleThreadRatingValue);

    const ppv = { query,
      pricePerformanceValueST,
      pricePerformanceValueMT,
      MT: cpuPerformanceRating.averageCPUMark,
      ST: cpuPerformanceRating.singleThreadRatingValue,
    };

    res.json({ ppv });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
