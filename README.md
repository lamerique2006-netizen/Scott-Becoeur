# AdFlow - AI-Powered Ad Generator for E-Commerce

Generate stunning product ads in seconds using AI. Paste a product link, choose your style, and get beautiful ad images and videos.

## Features

- 🔗 **Product Link Scraper** — Automatically extract product info from any URL
- 🎨 **AI Image Generation** — Create lifestyle product images with Higgsfield AI
- 🎬 **AI Video Generation** — Animate images into videos with Kling AI
- 🎯 **Multiple Ad Types** — Facebook, Instagram, TikTok, luxury, minimalist, trendy
- ⚡ **Fast & Free** — No credit card required for MVP
- 🎪 **Beautiful UI** — Smooth animations, modern design

## Tech Stack

- **Backend:** Node.js + Express
- **Frontend:** React + Tailwind CSS + Framer Motion
- **Image Gen:** Higgsfield AI
- **Video Gen:** Kling AI
- **Deployment:** Vercel (free)

## Setup

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/lamerique2006-netizen/Scott-Becoeur.git
cd Scott-Becoeur

# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..

# Copy env template
cp .env.example .env
```

### Configure API Keys

Edit `.env` and add your credentials:

```
HIGGSFIELD_API_KEY=your_key_here
HIGGSFIELD_SECRET_KEY=your_secret_here
KLING_ACCESS_KEY=your_key_here
KLING_SECRET_KEY=your_secret_here
```

### Run Locally

```bash
# Terminal 1: Start backend
npm run dev

# Terminal 2: Start frontend
cd client && npm start
```

Open http://localhost:3000

## API Endpoints

### POST `/api/scrape`
Scrape product data from URL

```json
{
  "url": "https://example.com/product"
}
```

### POST `/api/generate-images`
Generate image variations

```json
{
  "productName": "Awesome Product",
  "productDescription": "Description here",
  "adType": "facebook"
}
```

### POST `/api/generate-video`
Generate video from image

```json
{
  "imageUrl": "https://...",
  "videoStyle": "professional",
  "customPrompt": "optional custom prompt"
}
```

## Deployment

### Vercel (Frontend)

```bash
cd client
vercel deploy
```

### Railway/Render (Backend)

Connect GitHub repo, set ENV variables, and deploy.

## Pricing Model

- **Free Tier:** 3 images/month (demo)
- **Starter:** $29/month - 100 generations
- **Pro:** $99/month - 1000 generations
- **Enterprise:** Custom pricing

## Roadmap

- [ ] Auth & user accounts
- [ ] Credit system
- [ ] More AI providers
- [ ] Email integration
- [ ] Analytics dashboard
- [ ] API webhooks

## License

MIT

## Author

Built by Serena (AI) + Scott (Product)
