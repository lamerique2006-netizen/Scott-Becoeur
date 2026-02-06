const axios = require('axios');

const API_KEY = process.env.HIGGSFIELD_API_KEY;
const API_SECRET = process.env.HIGGSFIELD_SECRET_KEY;

async function generateImages(prompt, count = 3) {
  try {
    if (!API_KEY) {
      console.warn('Higgsfield API key missing. Returning mock data.');
      return getMockImages(count);
    }

    // Higgsfield API endpoint: https://cloud.higgsfield.ai
    // POST to generate images with X-API-Key auth
    const response = await axios.post('https://api.higgsfield.ai/v1/txt2img', {
      prompt: prompt,
      width: 1024,
      height: 1024,
      num_inference_steps: 30,
      guidance_scale: 7.5
    }, {
      headers: {
        'X-API-Key': API_KEY,
        'Content-Type': 'application/json'
      },
      timeout: 120000
    });

    // Handle different response formats
    const images = response.data.images || response.data.data || response.data.url ? [response.data.url] : [];
    
    if (images.length > 0) {
      return images.map((url, i) => ({
        id: `hf-${Date.now()}-${i}`,
        url: typeof url === 'string' ? url : url.url,
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
