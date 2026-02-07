require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');
const scraper = require('./scraper');
const adGenerator = require('./services/adGenerator');
const higgsfield = require('./services/higgsfield');
const kling = require('./services/kling');
const { router: authRouter, authenticate } = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Auth routes
app.use('/api/auth', authRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.post('/api/scrape', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL required' });
    
    const product = await scraper.scrapeProduct(url);
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/generate-images', authenticate, async (req, res) => {
  try {
    const { productName, productDescription, adType } = req.body;
    if (!productName || !adType) {
      return res.status(400).json({ error: 'productName and adType required' });
    }

    const prompt = adGenerator.generatePrompt(productName, productDescription, adType);
    const images = await higgsfield.generateImages(prompt);
    res.json({ success: true, data: images });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/generate-video', authenticate, async (req, res) => {
  try {
    const { imageUrl, videoStyle, customPrompt } = req.body;
    if (!imageUrl) return res.status(400).json({ error: 'imageUrl required' });

    const prompt = videoStyle || customPrompt || 'product showcase, smooth transitions, professional';
    const video = await kling.generateVideo(imageUrl, prompt);
    res.json({ success: true, data: video });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve React frontend
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
