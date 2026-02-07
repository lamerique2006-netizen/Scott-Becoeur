import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function AccountSettings({ user }) {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'billing', label: 'Billing', icon: '💳' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl"
    >
      {/* Tabs */}
      <div className="flex gap-2 mb-8 bg-slate-800/30 p-1 rounded-lg border border-slate-700/50 w-fit">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-600/50 to-purple-600/50 text-white border border-blue-500/50'
                : 'text-slate-400 hover:text-white'
            }`}
            whileHover={{ scale: 1.05 }}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </motion.button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <SettingCard 
            label="Email Address"
            value={user?.email || ''}
            icon="📧"
            disabled
          />
          <SettingCard 
            label="Account Created"
            value="February 7, 2026"
            icon="📅"
            disabled
          />
          <SettingCard 
            label="Current Plan"
            value="Free • 3 generations/month"
            icon="⭐"
            disabled
          />
        </motion.div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span>🔐</span> Change Password
            </h3>
            <div className="space-y-3">
              <input
                type="password"
                placeholder="Current Password"
                className="w-full bg-slate-700/50 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-blue-500 outline-none transition"
              />
              <input
                type="password"
                placeholder="New Password"
                className="w-full bg-slate-700/50 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-blue-500 outline-none transition"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full bg-slate-700/50 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-blue-500 outline-none transition"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition font-medium"
              >
                Update Password
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Billing Tab */}
      {activeTab === 'billing' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span>💳</span> Billing Information
            </h3>
            <div className="space-y-4">
              <p className="text-slate-300">
                You're on the <span className="font-semibold text-blue-400">Free Plan</span>
              </p>
              <p className="text-slate-400 text-sm">
                Next billing cycle: Never (free tier)
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition font-medium"
              >
                Upgrade to Paid Plan
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

function SettingCard({ label, value, icon, disabled }) {
  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{icon}</span>
        <label className="text-slate-400 text-sm font-medium">{label}</label>
      </div>
      <input
        type="text"
        value={value}
        disabled={disabled}
        className="w-full bg-slate-700/50 text-white px-4 py-3 rounded-lg border border-slate-600 outline-none disabled:opacity-60"
      />
    </div>
  );
}
