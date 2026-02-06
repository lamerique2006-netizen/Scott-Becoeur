const axios = require('axios');

const ACCESS_KEY = process.env.KLING_ACCESS_KEY;
const SECRET_KEY = process.env.KLING_SECRET_KEY;

async function generateVideo(imageUrl, prompt) {
  try {
    if (!ACCESS_KEY || !SECRET_KEY) {
      console.warn('Kling credentials missing. Returning mock data.');
      return getMockVideo();
    }

    // Kling API endpoint (adjust based on actual API docs)
    const response = await axios.post('https://api.klingai.com/v1/videos/generate', {
      image_url: imageUrl,
      prompt,
      duration: 5,
      aspect_ratio: '16:9'
    }, {
      headers: {
        'Authorization': `Bearer ${ACCESS_KEY}`,
        'X-API-Key': SECRET_KEY
      }
    });

    return response.data.video || getMockVideo();
  } catch (error) {
    console.error('Kling API error:', error.message);
    return getMockVideo();
  }
}

function getMockVideo() {
  return {
    id: 'mock-video',
    url: 'https://example.com/sample-video.mp4',
    status: 'processing',
    message: 'Mock video generation (use real Kling credentials to generate actual videos)'
  };
}

module.exports = { generateVideo };
