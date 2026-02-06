const axios = require('axios');

const API_KEY = process.env.HIGGSFIELD_API_KEY;
const API_SECRET = process.env.HIGGSFIELD_SECRET_KEY;

async function generateImages(prompt, count = 3) {
  try {
    if (!API_KEY) {
      console.warn('Higgsfield API key missing. Returning mock data.');
      return getMockImages(count);
    }

    // Try Higgsfield API (adjust endpoint as needed)
    // Standard format: POST with prompt, API key in header or body
    const response = await axios.post('https://api.higgsfield.ai/api/images/generate', {
      prompt: prompt,
      width: 1024,
      height: 1024,
      num_images: count
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      timeout: 60000
    });

    if (response.data && response.data.images) {
      return response.data.images.map((url, i) => ({
        id: `hf-${Date.now()}-${i}`,
        url: url,
        prompt: prompt
      }));
    }

    return getMockImages(count);
  } catch (error) {
    console.error('Higgsfield API error:', error.message);
    console.log('Falling back to mocks. API key:', API_KEY ? 'set' : 'missing');
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
