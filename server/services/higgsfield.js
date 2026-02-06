const axios = require('axios');

const API_KEY = process.env.HIGGSFIELD_API_KEY;
const API_SECRET = process.env.HIGGSFIELD_SECRET_KEY;

async function generateImages(prompt, count = 3) {
  try {
    if (!API_KEY || !API_SECRET) {
      console.warn('Higgsfield credentials missing. Returning mock data.');
      return getMockImages(count);
    }

    // Higgsfield API endpoint (adjust based on actual API docs)
    const response = await axios.post('https://api.higgsfield.ai/v1/generate', {
      prompt,
      n: count,
      size: '1024x1024',
      style: 'product_photo'
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'X-API-Key': API_SECRET
      }
    });

    return response.data.images || getMockImages(count);
  } catch (error) {
    console.error('Higgsfield API error:', error.message);
    return getMockImages(count);
  }
}

function getMockImages(count) {
  // Mock images for testing
  return Array(count).fill(null).map((_, i) => ({
    id: `mock-${i}`,
    url: `https://via.placeholder.com/1024x1024?text=Mock+Image+${i + 1}`,
    prompt: 'Mock generated image'
  }));
}

module.exports = { generateImages };
