import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ProductForm({ onSubmit, loading, apiUrl = 'http://localhost:5000' }) {
  const [url, setUrl] = useState('');
  const [adType, setAdType] = useState('facebook');
  const [scraped, setScraped] = useState(null);

  const handleScrape = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/scrape`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      const result = await response.json();
      if (result.success) {
        setScraped(result.data);
      }
    } catch (error) {
      console.error('Scrape error:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      productName: scraped?.title || 'Product',
      productDescription: scraped?.description || '',
      adType,
      url
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Create Your Ad</h2>

        <div className="mb-6">
          <label className="block text-white font-medium mb-2">Product URL</label>
          <div className="flex gap-2">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/product"
              className="flex-1 bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-blue-500 outline-none"
            />
            <button
              onClick={handleScrape}
              className="px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition"
            >
              Scrape
            </button>
          </div>
        </div>

        {scraped && (
          <div className="mb-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
            <h3 className="text-white font-semibold mb-2">{scraped.title}</h3>
            <p className="text-slate-300 text-sm mb-2">{scraped.description}</p>
            <p className="text-slate-400 text-sm">{scraped.price}</p>
          </div>
        )}

        <div className="mb-6">
          <label className="block text-white font-medium mb-3">Ad Type</label>
          <div className="grid grid-cols-3 gap-3">
            {['facebook', 'instagram', 'tiktok', 'luxury', 'minimalist', 'trendy'].map((type) => (
              <button
                key={type}
                onClick={() => setAdType(type)}
                className={`p-3 rounded-lg border-2 transition capitalize ${
                  adType === type
                    ? 'border-blue-500 bg-blue-500/10 text-blue-300'
                    : 'border-slate-600 bg-slate-700/30 text-slate-300 hover:border-slate-500'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || !scraped}
          className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition disabled:opacity-50 font-semibold"
        >
          {loading ? 'Generating...' : 'Generate Images'}
        </button>
      </div>
    </motion.div>
  );
}
