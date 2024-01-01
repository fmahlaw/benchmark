import cheerio from 'cheerio'

// HTML content
const htmlContent = `
<div class="right-desc" style="text-align: center">
    <div class="right-header" style="text-align: center;">
        <span style="margin-left: auto; margin-right: auto; font-family: Arial, Helvetica, sans-serif;font-size: 18px; font-weight: bold;">Average CPU Mark</span>
    </div>
    <div class="speedicon"><img src="/images/speedicon.svg" alt="rating"></div>
    <span style="font-family: Arial, Helvetica, sans-serif;font-size: 44px; font-weight: bold; color: #F48A18;">5899</span>
    <br><br><strong>Single Thread Rating:</strong> 1916
    <strong>Samples:</strong> 7993*
    <br>
</div>
`;

// Load the content into Cheerio
const $ = cheerio.load(htmlContent);

// Find the text after 'Single Thread Rating:'
const singleThreadRatingStrong = $('strong:contains("Single Thread Rating:")');

// Get the text node after the 'strong' element
const singleThreadRatingValue = singleThreadRatingStrong[0].next.data.trim();
console.log('Single Thread Rating Value:', singleThreadRatingValue);
