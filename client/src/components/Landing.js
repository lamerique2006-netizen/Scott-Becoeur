import React from 'react';
import { motion } from 'framer-motion';

export default function Landing({ onTryDemo }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 nav-blur bg-black/40 border-b border-slate-800/50 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <motion.div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AdFlow
          </motion.div>
          <div className="hidden md:flex gap-8">
            <a href="#features" className="hover:text-blue-400 transition">Features</a>
            <a href="#pricing" className="hover:text-blue-400 transition">Pricing</a>
          </div>
          <motion.button
            onClick={onTryDemo}
            whileHover={{ scale: 1.05 }}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:shadow-lg transition"
          >
            Try Free
          </motion.button>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center pt-24 px-4 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-6 leading-tight"
          >
            Create <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Stunning Ads</span><br/>
            in Seconds
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Paste your product link. Choose your style. Get 5 Instagram, Facebook, and TikTok ads powered by AI. No design skills needed.
          </motion.p>

          <motion.button
            onClick={onTryDemo}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold text-lg hover:shadow-2xl transition"
          >
            Try Free Demo
          </motion.button>

          <p className="text-slate-400 mt-4">No credit card required</p>

          {/* Demo images */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {[
              { img: '📱', title: 'Paste URL', desc: 'Add your product link' },
              { img: '🎨', title: 'Choose Style', desc: 'Pick your platform' },
              { img: '✨', title: 'Get Variations', desc: 'Get 5 AI ads' }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-xl"
              >
                <div className="text-5xl mb-3">{item.img}</div>
                <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 md:py-32 px-4 bg-black border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Why Sellers Choose AdFlow
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '⚡', title: '5 Ads in 30 Seconds', desc: 'Paste a URL. Get 5 variations instantly.' },
              { icon: '🎯', title: 'Multi-Platform Ready', desc: 'Facebook, Instagram, TikTok, Google.' },
              { icon: '🤖', title: 'AI-Powered Copy', desc: 'Professional headlines & CTAs.' },
              { icon: '📱', title: 'Mobile Optimized', desc: 'Ads perfect on every device.' },
              { icon: '📊', title: 'A/B Testing Built In', desc: 'Multiple variations to test.' },
              { icon: '🔄', title: 'Always Learning', desc: 'AI improves for your niche.' }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8 hover:border-blue-500/50 transition"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 md:py-32 px-4 bg-gradient-to-b from-black to-slate-900 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Simple, Transparent Pricing
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Starter', price: '$0', credits: '3', features: ['All platforms', 'Email support'] },
              { name: 'Growth', price: '$29', credits: '100', features: ['Priority support', 'Analytics', 'Video preview'], popular: true },
              { name: 'Pro', price: '$99', credits: '1K', features: ['Team collab', 'API access', 'Dedicated support'] }
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className={`border rounded-xl p-8 ${
                  plan.popular
                    ? 'bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-blue-500/50 scale-105'
                    : 'bg-slate-800/50 border-slate-700/50'
                }`}
              >
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold mb-2">
                  {plan.price}
                  <span className="text-lg text-slate-400">/mo</span>
                </div>
                <p className="text-blue-400 font-semibold mb-6">{plan.credits} generations/month</p>
                <ul className="space-y-2 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="text-slate-300 text-sm flex items-center gap-2">
                      <span className="text-green-400">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={onTryDemo}
                  className={`w-full px-6 py-2 rounded-lg font-semibold transition ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'border border-blue-600 text-blue-400 hover:bg-blue-600/10'
                  }`}
                >
                  Get Started
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-r from-blue-900 via-purple-900 to-black border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Stop Wasting Time on Ads
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-200 mb-8"
          >
            Join sellers already using AdFlow to scale their businesses
          </motion.p>
          <motion.button
            onClick={onTryDemo}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold text-lg hover:bg-slate-100 transition"
          >
            Try Free Now
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-slate-800 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-slate-500 text-sm">
          <p>&copy; 2026 AdFlow. Built for e-commerce sellers by e-commerce sellers.</p>
        </div>
      </footer>
    </div>
  );
}
