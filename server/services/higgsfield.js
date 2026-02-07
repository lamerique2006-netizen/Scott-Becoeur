const axios = require('axios');

// Using Replicate API for image generation
const REPLICATE_API_KEY = process.env.REPLICATE_API_KEY;

async function generateImages(prompt, count = 3) {
  try {
    if (!REPLICATE_API_KEY) {
      console.warn('Replicate API key missing. Returning mock data.');
      return getMockImages(count);
    }

    // Use Replicate API with Stable Diffusion
    // https://replicate.com/stability-ai/stable-diffusion
    const promises = Array(count).fill(null).map(() => 
      axios.post('https://api.replicate.com/v1/predictions', {
        version: 'a9d47cee2f51b56e9280ce2ff0af282ef61d0b6379a53e5bba3ee62628a139b3', // Stable Diffusion
        input: {
          prompt: prompt,
          width: 768,
          height: 768,
          num_outputs: 1,
          num_inference_steps: 50,
          guidance_scale: 7.5
        }
      }, {
        headers: {
          'Authorization': `Token ${REPLICATE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 180000 // 3 minutes for image generation
      })
    );

    const results = await Promise.allSettled(promises);
    const images = [];

    results.forEach((result, i) => {
      if (result.status === 'fulfilled' && result.value.data.output) {
        const urls = Array.isArray(result.value.data.output) 
          ? result.value.data.output 
          : [result.value.data.output];
        
        urls.forEach((url, idx) => {
          images.push({
            id: `rep-${Date.now()}-${i}-${idx}`,
            url: url,
            prompt: prompt
          });
        });
      }
    });

    // If successful predictions, return them
    if (images.length > 0) {
      return images.slice(0, count);
    }

    console.warn('Replicate returned no valid images, using mocks');
    return getMockImages(count);
  } catch (error) {
    console.error('Replicate API error:', error.message);
    console.log('Falling back to mocks. API key:', REPLICATE_API_KEY ? 'set' : 'missing');
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
