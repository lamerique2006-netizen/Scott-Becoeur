import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function AccountSettings({ user }) {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl"
    >
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white">Account Settings</h2>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-slate-700">
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 px-4 font-semibold transition ${
            activeTab === 'profile'
              ? 'border-b-2 border-blue-600 text-blue-400'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`pb-3 px-4 font-semibold transition ${
            activeTab === 'security'
              ? 'border-b-2 border-blue-600 text-blue-400'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Security
        </button>
        <button
          onClick={() => setActiveTab('billing')}
          className={`pb-3 px-4 font-semibold transition ${
            activeTab === 'billing'
              ? 'border-b-2 border-blue-600 text-blue-400'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Billing
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 space-y-6">
          <div>
            <label className="block text-white font-medium mb-2">Email</label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="w-full bg-slate-700 text-slate-300 px-4 py-3 rounded-lg border border-slate-600"
            />
          </div>
          <div>
            <label className="block text-white font-medium mb-2">Account Created</label>
            <p className="text-slate-300">February 7, 2026</p>
          </div>
          <div>
            <label className="block text-white font-medium mb-2">Subscription Status</label>
            <p className="text-green-400 font-semibold">Free Plan</p>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 space-y-6">
          <div>
            <h3 className="text-white font-semibold mb-4">Change Password</h3>
            <input
              type="password"
              placeholder="Current Password"
              className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 mb-3"
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 mb-3"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 mb-4"
            />
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Update Password
            </button>
          </div>
        </div>
      )}

      {/* Billing Tab */}
      {activeTab === 'billing' && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 space-y-6">
          <div>
            <h3 className="text-white font-semibold mb-4">Upgrade Your Plan</h3>
            <p className="text-slate-300 mb-6">Currently on Free Plan • 3 generations/month</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-700 rounded-lg">
                <p className="font-semibold text-white">Growth</p>
                <p className="text-lg font-bold text-white">$29/month</p>
                <p className="text-sm text-slate-400">100 generations</p>
              </div>
              <div className="p-4 bg-slate-700 rounded-lg">
                <p className="font-semibold text-white">Pro</p>
                <p className="text-lg font-bold text-white">$99/month</p>
                <p className="text-sm text-slate-400">1,000 generations</p>
              </div>
            </div>
            <button className="mt-6 w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
              View Plans
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
