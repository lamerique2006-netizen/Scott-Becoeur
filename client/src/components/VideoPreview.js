import React from 'react';
import { motion } from 'framer-motion';

export default function VideoPreview({ video, onBack }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Your Video</h2>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 mb-6">
        {video.status === 'processing' ? (
          <div className="text-center">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
            <p className="text-white mt-4">{video.message}</p>
          </div>
        ) : (
          <video
            controls
            className="w-full rounded-lg"
            src={video.url}
          />
        )}
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition"
        >
          Create Another
        </button>
        <button
          className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Download
        </button>
      </div>
    </motion.div>
  );
}
