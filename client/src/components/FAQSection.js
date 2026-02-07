import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function FAQSection() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      question: 'How does AdFlow work?',
      answer: 'Paste your product URL, choose an ad style, and AI generates 5 unique ad variations instantly. Each variation includes headlines, copy, and visuals optimized for different platforms.',
      category: 'Getting Started'
    },
    {
      question: 'What formats does AdFlow support?',
      answer: 'We support Facebook, Instagram, TikTok, Google Ads, and custom formats. Each platform gets optimized sizing and copy for maximum engagement.',
      category: 'Features'
    },
    {
      question: 'Can I customize the generated ads?',
      answer: 'Yes! After generation, you can edit all copy, choose different images, and adjust styles. We also support custom prompts for unique variations.',
      category: 'Features'
    },
    {
      question: 'What does a credit cost?',
      answer: 'Each ad generation uses 1 credit. Free plan gets 3/month. Growth plan includes 100/month. Pro plan includes 1,000/month.',
      category: 'Pricing'
    },
    {
      question: 'Can I download my ads?',
      answer: 'Yes! You can download generated ads as images or videos (depending on your plan) to use directly on your store or ad platforms.',
      category: 'Features'
    },
    {
      question: 'Do you support WooCommerce and Shopify?',
      answer: 'We support any e-commerce site. Just paste the product URL and we extract the details automatically.',
      category: 'Getting Started'
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes. We use bank-level encryption for all data. Your product information is never stored or shared. Only used to generate ads.',
      category: 'Security'
    },
    {
      question: 'What if I don\'t like the generated ads?',
      answer: 'You can generate as many variations as your credits allow. Try different styles, add custom prompts, or modify the generated results.',
      category: 'Features'
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl"
    >
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
          Help & Support
        </h2>
        <p className="text-slate-400">Find answers to common questions</p>
      </div>

      {/* Search */}
      <motion.div
        className="mb-8 relative"
        whileHover={{ scale: 1.02 }}
      >
        <input
          type="text"
          placeholder="Search FAQs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-800/50 text-white px-4 py-4 pl-12 rounded-lg border border-slate-700/50 focus:border-blue-500 outline-none transition backdrop-blur-xl"
        />
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">🔍</span>
      </motion.div>

      {/* FAQs */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl overflow-hidden hover:border-blue-500/50 transition"
          >
            <motion.button
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-700/20 transition"
              whileHover={{ paddingLeft: 24 }}
            >
              <div className="text-left">
                <h3 className="font-semibold text-white text-lg">{faq.question}</h3>
                <span className="text-xs text-blue-400 font-medium">{faq.category}</span>
              </div>
              <motion.span
                className="text-2xl text-blue-400"
                animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                ▼
              </motion.span>
            </motion.button>

            <motion.div
              initial={false}
              animate={{
                height: expandedIndex === index ? 'auto' : 0,
                opacity: expandedIndex === index ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-slate-700/50"
            >
              <p className="px-6 py-4 text-slate-300 leading-relaxed">{faq.answer}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {filteredFaqs.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-slate-400">No matching FAQs found</p>
        </motion.div>
      )}

      {/* Contact Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 20 }}
        transition={{ delay: 0.3 }}
        className="mt-12 bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-8 text-center backdrop-blur-xl"
      >
        <h3 className="text-white font-semibold mb-2 text-lg">Still have questions?</h3>
        <p className="text-slate-300 mb-6">Our support team is ready to help</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition font-medium"
        >
          Contact Support
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
