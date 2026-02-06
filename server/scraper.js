const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeProduct(url) {
  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const $ = cheerio.load(data);

    // Generic selectors (works on most e-commerce sites)
    const title = $('h1').first().text().trim() || $('title').text().trim();
    const description = $('p').first().text().trim() || $('meta[name="description"]').attr('content');
    const price = $('[class*="price"]').first().text().trim() || $('span[class*="price"]').text().trim();
    const images = [];

    // Extract images
    $('img').each((i, el) => {
      const src = $(el).attr('src') || $(el).attr('data-src');
      if (src && (src.includes('product') || src.includes('image'))) {
        images.push(src);
      }
    });

    return {
      title: title || 'Unnamed Product',
      description: description || 'No description available',
      price: price || 'Price not available',
      images: images.slice(0, 3),
      url
    };
  } catch (error) {
    throw new Error(`Failed to scrape URL: ${error.message}`);
  }
}

module.exports = { scrapeProduct };
