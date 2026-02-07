import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function DemoMode({ onSignupClick }) {
  const [currentStep, setCurrentStep] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-b from-slate-900/50 to-transparent border-b border-slate-800/50 sticky top-0 z-30 backdrop-blur-xl">
        <div className="px-8 py-6 flex justify-between items-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AdFlow Demo
            </h1>
            <p className="text-slate-400 text-sm mt-1">Try before you sign up</p>
          </motion.div>
          <motion.button
            onClick={onSignupClick}
            whileHover={{ scale: 1.05 }}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition font-medium"
          >
            Create Account
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 p-8 overflow-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {currentStep === 'dashboard' && (
            <DemoDashboard onSelectFeature={setCurrentStep} />
          )}
          {currentStep === 'scraper' && (
            <DemoScraper onBack={() => setCurrentStep('dashboard')} />
          )}
          {currentStep === 'generator' && (
            <DemoGenerator onBack={() => setCurrentStep('dashboard')} />
          )}
          {currentStep === 'results' && (
            <DemoResults onBack={() => setCurrentStep('dashboard')} />
          )}
        </motion.div>
      </main>
    </div>
  );
}

function DemoDashboard({ onSelectFeature }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">How AdFlow Works</h2>
        <p className="text-slate-400">See what you can do with a free account</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <DemoCard
          number="1"
          title="Paste URL"
          description="Add your Shopify or WooCommerce product link"
          icon="🔗"
          onClick={() => onSelectFeature('scraper')}
        />
        <DemoCard
          number="2"
          title="Choose Style"
          description="Select ad platform (Facebook, Instagram, TikTok)"
          icon="🎨"
          onClick={() => onSelectFeature('generator')}
        />
        <DemoCard
          number="3"
          title="Get Variations"
          description="Get 5 AI-generated ad variations instantly"
          icon="✨"
          onClick={() => onSelectFeature('results')}
        />
      </div>

      {/* Features */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-8">
        <h3 className="text-white font-bold text-lg mb-6">Features You Get</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            '📱 Mobile optimized ads',
            '🎯 Multi-platform support',
            '✏️ Editable copy',
            '📥 Download as images',
            '🔄 A/B testing variations',
            '⚡ Instant generation'
          ].map((feature) => (
            <div key={feature} className="text-slate-300 flex items-center gap-2">
              <span className="text-blue-400">✓</span> {feature}
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-8">
        <h3 className="text-white font-bold text-lg mb-6">Simple Pricing</h3>
        <div className="grid grid-cols-3 gap-6">
          {[
            { name: 'Free', price: '$0', credits: '3', color: 'slate' },
            { name: 'Growth', price: '$29', credits: '100', color: 'blue' },
            { name: 'Pro', price: '$99', credits: '1K', color: 'purple' }
          ].map((plan) => (
            <div
              key={plan.name}
              className={`p-4 rounded-lg border border-${plan.color}-500/30 bg-${plan.color}-900/10`}
            >
              <p className="font-semibold text-white mb-2">{plan.name}</p>
              <p className="text-2xl font-bold text-white mb-1">{plan.price}</p>
              <p className="text-sm text-slate-400">{plan.credits} generations/month</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <p className="text-slate-400 mb-6">Ready to get started?</p>
        <motion.button
          onClick={() => onSelectFeature('scraper')}
          whileHover={{ scale: 1.05 }}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition font-semibold text-lg"
        >
          Try Demo Now
        </motion.button>
      </div>
    </div>
  );
}

function DemoCard({ number, title, description, icon, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -8, scale: 1.05 }}
      className="text-left bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/50 transition"
    >
      <div className="text-5xl mb-4">{icon}</div>
      <div className="inline-block px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm font-semibold mb-3">
        Step {number}
      </div>
      <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
      <p className="text-slate-400 text-sm">{description}</p>
    </motion.button>
  );
}

function DemoScraper({ onBack }) {
  const [url, setUrl] = React.useState('https://example.com/product');
  const [scraped, setScraped] = React.useState(null);

  const handleScrape = () => {
    setScraped({
      title: 'Premium Wireless Earbuds',
      description: 'Active noise cancellation, 30-hour battery, seamless connectivity',
      price: '$129.99'
    });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <button onClick={onBack} className="text-blue-400 hover:text-blue-300 flex items-center gap-2">
        ← Back to Overview
      </button>

      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Step 1: Paste Your Product URL</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-white font-medium mb-2">Product URL</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-blue-500 outline-none"
            />
          </div>
          <motion.button
            onClick={handleScrape}
            whileHover={{ scale: 1.02 }}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition font-medium"
          >
            Scrape Product
          </motion.button>
        </div>

        {scraped && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg"
          >
            <h3 className="text-white font-semibold mb-3">{scraped.title}</h3>
            <p className="text-slate-300 text-sm mb-2">{scraped.description}</p>
            <p className="text-blue-400 font-semibold">{scraped.price}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function DemoGenerator({ onBack }) {
  const [adType, setAdType] = React.useState('facebook');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <button onClick={onBack} className="text-blue-400 hover:text-blue-300 flex items-center gap-2">
        ← Back to Overview
      </button>

      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Step 2: Choose Ad Platform</h2>
        <div className="grid grid-cols-2 gap-4">
          {['Facebook', 'Instagram', 'TikTok', 'Google'].map((platform) => (
            <motion.button
              key={platform}
              onClick={() => setAdType(platform.toLowerCase())}
              whileHover={{ scale: 1.05 }}
              className={`p-4 rounded-lg border-2 transition font-medium ${
                adType === platform.toLowerCase()
                  ? 'border-blue-500 bg-blue-600/20 text-blue-300'
                  : 'border-slate-600 bg-slate-700/30 text-slate-300'
              }`}
            >
              {platform}
            </motion.button>
          ))}
        </div>
        <motion.button
          onClick={() => {}}
          whileHover={{ scale: 1.02 }}
          className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition font-medium"
        >
          Generate Ads
        </motion.button>
      </div>
    </motion.div>
  );
}

function DemoResults({ onBack }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <button onClick={onBack} className="text-blue-400 hover:text-blue-300 flex items-center gap-2">
        ← Back to Overview
      </button>

      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Step 3: Your Ad Variations</h2>
        <p className="text-slate-400">5 AI-generated variations ready to use</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {['Variation 1', 'Variation 2', 'Variation 3', 'Variation 4', 'Variation 5'].map((variant, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/50 transition"
          >
            <div className="bg-slate-700 h-32 rounded-lg mb-4 flex items-center justify-center text-slate-400">
              📸 Product Image
            </div>
            <h3 className="text-white font-semibold mb-2">Headline: Premium Sound Quality</h3>
            <p className="text-slate-300 text-sm mb-4">Experience crystal clear audio with industry-leading noise cancellation</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
            >
              ✓ Use This
            </motion.button>
          </motion.div>
        ))}
      </div>

      <div className="bg-blue-600/20 border border-blue-500/30 rounded-xl p-8 text-center">
        <p className="text-white font-semibold mb-4">Love what you see?</p>
        <p className="text-slate-300 mb-6">Sign up to generate unlimited variations for your products</p>
        <motion.button
          onClick={() => window.location.reload()}
          whileHover={{ scale: 1.05 }}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition font-medium"
        >
          Create Free Account
        </motion.button>
      </div>
    </motion.div>
  );
}
