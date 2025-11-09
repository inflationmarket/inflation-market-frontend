import React from 'react';
import { X, Shield, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function UserJourneyModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleProtectSavings = () => {
    // Navigate to app with protection mode hint
    navigate('/app?mode=protect');
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTradeSpeculate = () => {
    // Navigate to app in standard trading mode
    navigate('/app');
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-gradient-to-b from-gray-900 to-black shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Choose Your Path</h2>
            <p className="text-sm text-gray-400 mt-1">How would you like to use Inflation Market?</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-8">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Protect Savings Option */}
            <button
              onClick={handleProtectSavings}
              className="group relative overflow-hidden rounded-xl border-2 border-green-500/30 bg-gradient-to-br from-green-500/10 to-green-500/5 p-6 text-left transition-all hover:border-green-500/60 hover:shadow-lg hover:shadow-green-500/20"
            >
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Protect My Savings</h3>
                <p className="text-sm text-gray-300 mb-4">
                  I want to hedge against inflation and preserve my purchasing power with a long position.
                </p>
                <div className="flex items-center text-green-400 font-semibold text-sm">
                  <span>Start protecting</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            {/* Trade/Speculate Option */}
            <button
              onClick={handleTradeSpeculate}
              className="group relative overflow-hidden rounded-xl border-2 border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-blue-500/5 p-6 text-left transition-all hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Trade & Speculate</h3>
                <p className="text-sm text-gray-300 mb-4">
                  I want to take positions on inflation markets—both long and short—to express my macro views.
                </p>
                <div className="flex items-center text-blue-400 font-semibold text-sm">
                  <span>Start trading</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>

          {/* Footer hint */}
          <p className="text-xs text-gray-500 text-center mt-6">
            Don't worry—you can switch between modes anytime in the app
          </p>
        </div>
      </div>
    </div>
  );
}
