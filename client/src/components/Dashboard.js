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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black flex">
      {/* Sidebar */}
      <motion.aside 
        className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-slate-900/80 to-slate-950 border-r border-slate-800/50 transition-all duration-300 sticky top-0 h-screen overflow-y-auto backdrop-blur-xl`}
        initial={{ x: -300 }}
        animate={{ x: 0 }}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-800/50 flex items-center justify-between">
          {sidebarOpen && <h2 className="font-bold text-white">AdFlow</h2>}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-800/50 rounded-lg transition text-slate-400 hover:text-white"
          >
            {sidebarOpen ? '‹' : '›'}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          <NavItem 
            icon="✨" 
            label="Generator" 
            active={currentPage === 'dashboard'}
            onClick={() => { setCurrentPage('dashboard'); resetGenerator(); }}
            collapsed={!sidebarOpen}
          />
          <NavItem 
            icon="👤" 
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
            icon="⚡" 
            label="Credits" 
            active={currentPage === 'credits'}
            onClick={() => setCurrentPage('credits')}
            collapsed={!sidebarOpen}
          />
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800/50 bg-gradient-to-t from-slate-950 to-transparent">
          <button 
            onClick={logout}
            className={`w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:bg-red-900/20 rounded-lg transition text-sm font-medium`}
          >
            <span className="text-lg">→</span>
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-gradient-to-b from-slate-900/50 to-transparent border-b border-slate-800/50 sticky top-0 z-30 backdrop-blur-xl">
          <div className="px-8 py-6 flex justify-between items-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {currentPage === 'dashboard' && 'Create Ads'}
                {currentPage === 'account' && 'Account Settings'}
                {currentPage === 'faq' && 'Help & FAQ'}
                {currentPage === 'credits' && 'Billing'}
              </h1>
              <p className="text-slate-400 text-sm mt-1">{user?.email}</p>
            </motion.div>

            {/* Credits Widget */}
            <motion.div 
              className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg px-6 py-4 backdrop-blur-xl"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-slate-400 text-sm">Credits Remaining</p>
              <motion.p 
                className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
              >
                {user?.credits || 0}
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-8">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {currentPage === 'dashboard' && (
              <DashboardPage
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                images={images}
                setImages={setImages}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                video={video}
                setVideo={setVideo}
                loading={loading}
                onProductSubmit={handleProductSubmit}
                onVideoGenerate={handleVideoGeneration}
                resetGenerator={resetGenerator}
                apiUrl={apiUrl}
              />
            )}
            {currentPage === 'account' && <AccountSettings user={user} />}
            {currentPage === 'faq' && <FAQSection />}
            {currentPage === 'credits' && <CreditsPage user={user} />}
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function DashboardPage({
  currentStep,
  setCurrentStep,
  images,
  setImages,
  selectedImage,
  setSelectedImage,
  video,
  setVideo,
  loading,
  onProductSubmit,
  onVideoGenerate,
  resetGenerator,
  apiUrl
}) {
  if (currentStep === 'input') {
    return (
      <div className="space-y-8">
        {/* Quick Start Cards */}
        <div className="grid grid-cols-3 gap-6">
          <QuickCard 
            icon="🔗" 
            title="Paste URL" 
            desc="Add your product link"
          />
          <QuickCard 
            icon="🎨" 
            title="Choose Style" 
            desc="Pick your ad platform"
          />
          <QuickCard 
            icon="✨" 
            title="Get Variations" 
            desc="Get 5 AI variations"
          />
        </div>

        {/* Main Form */}
        <ProductForm 
          onSubmit={onProductSubmit} 
          loading={loading} 
          apiUrl={apiUrl}
        />
      </div>
    );
  }

  if (currentStep === 'images') {
    return (
      <ImageGallery
        images={images}
        onSelectImage={(img) => {
          setSelectedImage(img);
          setCurrentStep('video-options');
        }}
        onBack={() => setCurrentStep('input')}
      />
    );
  }

  if (currentStep === 'video-options') {
    return (
      <VideoOptions
        onGenerateVideo={onVideoGenerate}
        loading={loading}
        onBack={() => setCurrentStep('images')}
      />
    );
  }

  if (currentStep === 'video') {
    return (
      <VideoPreview
        video={video}
        onBack={resetGenerator}
      />
    );
  }
}

function QuickCard({ icon, title, desc }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/50 transition cursor-pointer group"
    >
      <div className="text-4xl mb-3 group-hover:scale-110 transition">{icon}</div>
      <h3 className="text-white font-semibold mb-1">{title}</h3>
      <p className="text-slate-400 text-sm">{desc}</p>
    </motion.div>
  );
}

function NavItem({ icon, label, active, onClick, collapsed }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ x: 4 }}
      className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition text-sm font-medium group relative ${
        active
          ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-blue-300 border border-blue-500/50'
          : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
      }`}
    >
      {active && (
        <motion.div
          layoutId="activeNav"
          className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-lg -z-10"
          transition={{ type: 'spring', stiffness: 380, damping: 40 }}
        />
      )}
      <span className="text-lg">{icon}</span>
      {!collapsed && <span>{label}</span>}
    </motion.button>
  );
}

function VideoOptions({ onGenerateVideo, loading, onBack }) {
  const [videoStyle, setVideoStyle] = React.useState('professional');
  const [customPrompt, setCustomPrompt] = React.useState('');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Choose Video Style</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {['professional', 'trendy', 'minimalist', 'luxury'].map((style) => (
          <motion.button
            key={style}
            onClick={() => setVideoStyle(style)}
            whileHover={{ scale: 1.05 }}
            className={`p-4 rounded-lg border-2 transition capitalize font-medium ${
              videoStyle === style
                ? 'border-blue-500 bg-gradient-to-br from-blue-600/20 to-purple-600/20 text-blue-300'
                : 'border-slate-600 bg-slate-800/30 text-slate-300 hover:border-slate-500'
            }`}
          >
            {style}
          </motion.button>
        ))}
      </div>
      <div className="mb-6">
        <label className="block text-white font-medium mb-2">Custom prompt (optional):</label>
        <textarea
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          placeholder="Describe your desired video style..."
          className="w-full bg-slate-700/50 text-white p-4 rounded-lg border border-slate-600 focus:border-blue-500 outline-none transition backdrop-blur-xl"
          rows={4}
        />
      </div>
      <div className="flex gap-4">
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.02 }}
          className="flex-1 px-6 py-3 bg-slate-800/50 text-white rounded-lg hover:bg-slate-700/50 transition border border-slate-700 font-medium"
        >
          Back
        </motion.button>
        <motion.button
          onClick={() => onGenerateVideo({ videoStyle, customPrompt })}
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-50 font-medium"
        >
          {loading ? 'Generating...' : 'Generate Video'}
        </motion.button>
      </div>
    </motion.div>
  );
}

function CreditsPage({ user }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl"
    >
      {/* Current Usage */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Current Plan</h2>
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-slate-400 text-sm">Credits Available</p>
              <p className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {user?.credits || 0}
              </p>
            </div>
            <div className="text-right">
              <p className="text-slate-400 text-sm">Plan Type</p>
              <p className="text-3xl font-bold text-white">Free</p>
            </div>
          </div>
          <p className="text-slate-400">3 ad generations per month • Upgrade to unlock more</p>
        </div>
      </div>

      {/* Upgrade Plans */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Upgrade Your Plan</h2>
        <div className="grid grid-cols-2 gap-6">
          {[
            { name: 'Growth', price: '$29', credit: '100', features: ['Priority support', 'Analytics'] },
            { name: 'Pro', price: '$99', credit: '1,000', features: ['Team collaboration', 'API access', 'Dedicated support'] }
          ].map((plan) => (
            <motion.div
              key={plan.name}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/50 transition"
            >
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-white">{plan.price}</span>
                <span className="text-slate-400">/month</span>
              </div>
              <p className="text-blue-400 font-semibold mb-4">{plan.credit} generations/month</p>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="text-slate-300 text-sm flex items-center gap-2">
                    <span className="text-green-400">✓</span> {feature}
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition font-medium"
              >
                Upgrade Now
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
