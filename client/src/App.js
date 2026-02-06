import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProductForm from './components/ProductForm';
import ImageGallery from './components/ImageGallery';
import VideoPreview from './components/VideoPreview';
import './App.css';

function App() {
  const [currentStep, setCurrentStep] = useState('input');
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const handleProductSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/generate-images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (result.success) {
        setImages(result.data);
        setCurrentStep('images');
      }
    } catch (error) {
      console.error('Error generating images:', error);
    }
    setLoading(false);
  };

  const handleVideoGeneration = async (videoData) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/generate-video`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: selectedImage,
          ...videoData
        })
      });
      const result = await response.json();
      if (result.success) {
        setVideo(result.data);
        setCurrentStep('video');
      }
    } catch (error) {
      console.error('Error generating video:', error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-white">AdFlow</h1>
          <p className="text-slate-400 mt-2">AI-powered ad creation for e-commerce</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {currentStep === 'input' && (
            <ProductForm onSubmit={handleProductSubmit} loading={loading} apiUrl={API_URL} />
          )}
          {currentStep === 'images' && (
            <ImageGallery
              images={images}
              onSelectImage={(img) => {
                setSelectedImage(img);
                setCurrentStep('video-options');
              }}
              onBack={() => setCurrentStep('input')}
            />
          )}
          {currentStep === 'video-options' && (
            <VideoOptions
              onGenerateVideo={handleVideoGeneration}
              loading={loading}
              onBack={() => setCurrentStep('images')}
            />
          )}
          {currentStep === 'video' && (
            <VideoPreview
              video={video}
              onBack={() => setCurrentStep('input')}
            />
          )}
        </motion.div>
      </main>
    </div>
  );
}

function VideoOptions({ onGenerateVideo, loading, onBack }) {
  const [videoStyle, setVideoStyle] = useState('professional');
  const [customPrompt, setCustomPrompt] = useState('');

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Choose Video Style</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {['professional', 'trendy', 'minimalist', 'luxury'].map((style) => (
          <button
            key={style}
            onClick={() => setVideoStyle(style)}
            className={`p-4 rounded-lg border-2 transition ${
              videoStyle === style
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-slate-600 bg-slate-700/30'
            } text-white capitalize`}
          >
            {style}
          </button>
        ))}
      </div>
      <div className="mb-6">
        <label className="block text-white mb-2">Or add custom prompt:</label>
        <textarea
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          placeholder="Describe the video style you want..."
          className="w-full bg-slate-700 text-white p-3 rounded-lg border border-slate-600 focus:border-blue-500 outline-none"
          rows={4}
        />
      </div>
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition"
        >
          Back
        </button>
        <button
          onClick={() => onGenerateVideo({ videoStyle, customPrompt })}
          disabled={loading}
          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Video'}
        </button>
      </div>
    </div>
  );
}

export default App;
