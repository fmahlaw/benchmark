import fs from "fs";
import readline from "readline";
import cheerio from "cheerio";

// Define the range of lines you want to read (lines 1000 to 1400)
const startLine = 1000;
const endLine = 1400;

// Create a ReadStream to read the file line by line
const fileStream = fs.createReadStream("output.html", "utf8");
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

let currentLine = 0;
let htmlContent = "";

// Read lines within the specified range
rl.on("line", (line) => {
  currentLine++;
  if (currentLine >= startLine && currentLine <= endLine) {
    htmlContent += line + "\n"; // Append the line to the content
  } else if (currentLine > endLine) {
    rl.close(); // Close the readline interface after reaching the end line
  }
});

// When readline finishes reading lines
rl.on("close", () => {
  // Load the extracted content into Cheerio

  const $ = cheerio.load(htmlContent);

  // Log the parsed HTML content
//   console.log($.html());

  // Perform Cheerio operations as needed within the specified range
  // For example:
  // Wait for the specific selector
  $(
    '.right-desc span[style="font-family: Arial, Helvetica, sans-serif; font-size: 44px; font-weight: bold; color: #F48A18;"]'
  );

//     const averageCPUMark = $('.right-desc span:nth-child(3)').text().trim();
//   console.log('Average CPU Mark:', averageCPUMark);
  
  // Extract the value for "Single Thread Rating"
//   const strongElements = $('strong');

// Iterate through the <strong> elements to find 'Single Thread Rating:'
const singleThreadRatingStrong = $('strong:contains("Single Thread Rating:")');

// Get the text node after the 'strong' element
const singleThreadRatingValue = singleThreadRatingStrong[0].next.data.trim();
console.log('Single Thread Rating Value:', singleThreadRatingValue);

  
//   // Extract the value for "Samples"
//   const samples = $('strong:contains("Samples:")').next().text().trim();
//   console.log('Samples:', samples);
});
