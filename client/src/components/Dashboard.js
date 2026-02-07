import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProductForm from './ProductForm';
import ImageGallery from './ImageGallery';
import VideoPreview from './VideoPreview';
import AccountSettings from './AccountSettings';
import FAQSection from './FAQSection';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard({ apiUrl, token }) {
  const { user, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [currentStep, setCurrentStep] = useState('input');
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleProductSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/generate-images`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
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
      const response = await fetch(`${apiUrl}/api/generate-video`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
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

  const resetGenerator = () => {
    setCurrentStep('input');
    setImages([]);
    setSelectedImage(null);
    setVideo(null);
    setCurrentPage('dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
      {/* Sidebar */}
      <motion.aside 
        className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-slate-800/50 border-r border-slate-700 transition-all duration-300 sticky top-0 h-screen overflow-y-auto`}
        initial={{ x: -300 }}
        animate={{ x: 0 }}
      >
        <div className="p-4 border-b border-slate-700">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-700 rounded-lg transition w-full"
          >
            {sidebarOpen ? '‹' : '›'}
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <NavItem 
            icon="🚀" 
            label="Generator" 
            active={currentPage === 'dashboard'}
            onClick={() => { setCurrentPage('dashboard'); resetGenerator(); }}
            collapsed={!sidebarOpen}
          />
          <NavItem 
            icon="⚙️" 
            label="Account" 
            active={currentPage === 'account'}
            onClick={() => setCurrentPage('account')}
            collapsed={!sidebarOpen}
          />
          <NavItem 
            icon="❓" 
            label="FAQ" 
            active={currentPage === 'faq'}
            onClick={() => setCurrentPage('faq')}
            collapsed={!sidebarOpen}
          />
          <NavItem 
            icon="📊" 
            label="Credits" 
            active={currentPage === 'credits'}
            onClick={() => setCurrentPage('credits')}
            collapsed={!sidebarOpen}
          />
          <div className="pt-4 border-t border-slate-700">
            <button 
              onClick={logout}
              className={`w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:bg-red-900/20 rounded-lg transition text-sm`}
            >
              <span className="text-lg">🚪</span>
              {sidebarOpen && <span>Sign Out</span>}
            </button>
          </div>
        </nav>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-slate-800/50 border-b border-slate-700 sticky top-0 z-30 backdrop-blur">
          <div className="px-6 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">AdFlow</h1>
              <p className="text-slate-400 text-sm">{user?.email}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-400">Credits Remaining</p>
              <p className="text-2xl font-bold text-blue-400">{user?.credits || 0}</p>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">
          {currentPage === 'dashboard' && (
            <div className="max-w-6xl mx-auto">
              {currentStep === 'input' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Create Ad Variations</h2>
                    <p className="text-slate-400">Paste your product URL and let AI generate 5 stunning ad variations</p>
                  </div>
                  <ProductForm 
                    onSubmit={handleProductSubmit} 
                    loading={loading} 
                    apiUrl={apiUrl}
                    onProductScraped={(product) => {
                      // This will be used to show product preview
                    }}
                  />
                </motion.div>
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
                  onBack={resetGenerator}
                />
              )}
            </div>
          )}

          {currentPage === 'account' && <AccountSettings user={user} />}
          {currentPage === 'faq' && <FAQSection />}

          {currentPage === 'credits' && (
            <CreditsPage user={user} />
          )}
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, onClick, collapsed }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition text-sm ${
        active
          ? 'bg-blue-600 text-white'
          : 'text-slate-300 hover:bg-slate-700'
      }`}
    >
      <span className="text-lg">{icon}</span>
      {!collapsed && <span>{label}</span>}
    </button>
  );
}

function VideoOptions({ onGenerateVideo, loading, onBack }) {
  const [videoStyle, setVideoStyle] = useState('professional');
  const [customPrompt, setCustomPrompt] = useState('');

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Generate Video</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {['professional', 'trendy', 'minimalist', 'luxury'].map((style) => (
          <button
            key={style}
            onClick={() => setVideoStyle(style)}
            className={`p-4 rounded-lg border-2 transition capitalize ${
              videoStyle === style
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-slate-600 bg-slate-700/30'
            } text-white`}
          >
            {style}
          </button>
        ))}
      </div>
      <div className="mb-6">
        <label className="block text-white mb-2">Custom prompt (optional):</label>
        <textarea
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          placeholder="Describe the video style..."
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

function CreditsPage({ user }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl"
    >
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Credits & Pricing</h2>
        
        <div className="mb-8">
          <p className="text-slate-400 mb-4">Current Balance: <span className="text-3xl font-bold text-blue-400">{user?.credits || 0}</span></p>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-700">
            <h3 className="font-semibold text-white mb-2">Free Plan</h3>
            <p className="text-slate-300">3 ad generations/month</p>
          </div>
          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <h3 className="font-semibold text-white mb-2">Growth Plan - $29/month</h3>
            <p className="text-slate-300">100 ad generations + priority support</p>
          </div>
          <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-700">
            <h3 className="font-semibold text-white mb-2">Pro Plan - $99/month</h3>
            <p className="text-slate-300">1,000 ad generations + team collaboration</p>
          </div>
        </div>

        <button className="mt-8 w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
          Upgrade Plan
        </button>
      </div>
    </motion.div>
  );
}
