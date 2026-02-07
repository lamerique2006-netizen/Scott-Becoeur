import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function FAQSection() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    {
      question: 'How does AdFlow work?',
      answer: 'Paste your product URL, choose an ad style, and AI generates 5 unique ad variations instantly. Each variation includes headlines, copy, and visuals optimized for different platforms.'
    },
    {
      question: 'What formats does AdFlow support?',
      answer: 'We support Facebook, Instagram, TikTok, Google Ads, and custom formats. Each platform gets optimized sizing and copy for maximum engagement.'
    },
    {
      question: 'Can I customize the generated ads?',
      answer: 'Yes! After generation, you can edit all copy, choose different images, and adjust styles. We also support custom prompts for unique variations.'
    },
    {
      question: 'What does a credit cost?',
      answer: 'Each ad generation uses 1 credit. Free plan gets 3/month. Growth plan includes 100/month. Pro plan includes 1,000/month.'
    },
    {
      question: 'Can I download my ads?',
      answer: 'Yes! You can download generated ads as images or videos (depending on your plan) to use directly on your store or ad platforms.'
    },
    {
      question: 'Do you support WooCommerce and Shopify?',
      answer: 'We support any e-commerce site. Just paste the product URL and we extract the details automatically.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes. We use bank-level encryption for all data. Your product information is never stored or shared. Only used to generate ads.'
    },
    {
      question: 'What if I don\'t like the generated ads?',
      answer: 'You can generate as many variations as your credits allow. Try different styles, add custom prompts, or modify the generated results.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Frequently Asked Questions</h2>
        <p className="text-slate-400">Find answers to common questions about AdFlow</p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-700/30 transition"
            >
              <h3 className="font-semibold text-white text-left">{faq.question}</h3>
              <span className={`text-2xl transition-transform ${expandedIndex === index ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>

            <motion.div
              initial={false}
              animate={{
                height: expandedIndex === index ? 'auto' : 0,
                opacity: expandedIndex === index ? 1 : 0
              }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-slate-700"
            >
              <p className="px-6 py-4 text-slate-300">{faq.answer}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Contact */}
      <div className="mt-12 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-700 rounded-xl p-8">
        <h3 className="text-white font-semibold mb-2">Still have questions?</h3>
        <p className="text-slate-300 mb-4">Reach out to our support team</p>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Contact Support
        </button>
      </div>
    </motion.div>
  );
}
