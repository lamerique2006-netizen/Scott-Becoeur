import React from 'react';
import { motion } from 'framer-motion';

export default function ImageGallery({ images, onSelectImage, onBack }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Select an Image</h2>
        <p className="text-slate-400">Choose which image to turn into a video</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {images.map((image, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer"
            onClick={() => onSelectImage(image.url)}
          >
            <div className="bg-slate-700 rounded-lg overflow-hidden border-2 border-slate-600 hover:border-blue-500 transition">
              <img
                src={image.url}
                alt={`Generated ad ${index + 1}`}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 bg-slate-800">
                <p className="text-white text-sm font-medium">Variation {index + 1}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <button
        onClick={onBack}
        className="px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition"
      >
        Back
      </button>
    </motion.div>
  );
}
