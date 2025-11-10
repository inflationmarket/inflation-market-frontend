import React from 'react';
import { Link } from 'react-router-dom';
import { PyramidLogo } from '../ui/primitives';
import { CONFIG } from '../../config/constants';

export const SiteHeader = () => (
  <header className="border-b border-yellow-500/20 sticky top-0 z-50 bg-black/80 backdrop-blur">
    <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center">
          <PyramidLogo className="w-5 h-5 text-black" />
        </div>
        <Link to="/" className="font-bold text-white">Inflation Market</Link>
      </div>

      <nav className="hidden md:flex items-center gap-6">
        <Link to="/how-it-works" className="text-sm text-gray-400 hover:text-yellow-500">How It Works</Link>
        <Link to="/comparisons" className="text-sm text-gray-400 hover:text-yellow-500">Comparisons</Link>
        <Link to="/whitepaper" className="text-sm text-gray-400 hover:text-yellow-500">Whitepaper</Link>
        <Link to="/roadmap" className="text-sm text-gray-400 hover:text-yellow-500">Roadmap</Link>
        <Link to="/about" className="text-sm text-gray-400 hover:text-yellow-500">About</Link>
      </nav>

      <div className="flex items-center gap-3">
        <Link to="/app" className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black hover:text-black rounded-lg font-bold">Trade</Link>
      </div>
    </div>
  </header>
);

export const SiteFooter = () => (
  <footer className="border-t border-yellow-500/20 bg-black py-12 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center">
              <PyramidLogo className="w-5 h-5 text-black" />
            </div>
            <span className="font-bold text-white">Inflation Market</span>
          </div>
          <p className="text-sm text-gray-400">{CONFIG.domain}</p>
        </div>

        <div>
          <h4 className="font-bold text-white mb-4">Product</h4>
          <div className="space-y-2">
            <Link to="/how-it-works" className="block text-sm text-gray-400 hover:text-yellow-500">How It Works</Link>
            <Link to="/comparisons" className="block text-sm text-gray-400 hover:text-yellow-500">Comparisons</Link>
            <Link to="/whitepaper" className="block text-sm text-gray-400 hover:text-yellow-500">Whitepaper</Link>
            <Link to="/roadmap" className="block text-sm text-gray-400 hover:text-yellow-500">Roadmap</Link>
            <Link to="/about" className="block text-sm text-gray-400 hover:text-yellow-500">About</Link>
            <Link to="/faq" className="block text-sm text-gray-400 hover:text-yellow-500">FAQ</Link>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-white mb-4">Community</h4>
          <div className="space-y-2">
            <a href={CONFIG.social.twitter} target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-400 hover:text-yellow-500">Twitter</a>
            <a href={CONFIG.social.discord} target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-400 hover:text-yellow-500">Discord</a>
            <a href={CONFIG.social.github} target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-400 hover:text-yellow-500">GitHub</a>
          </div>
        </div>
      </div>

      <div className="border-top border-yellow-500/20 pt-8 text-center text-sm text-gray-400">
        <p>© 2025 Inflation Market. All rights reserved.</p>
        <p className="mt-2 text-xs text-yellow-500">Testnet Demo � {CONFIG.domain}</p>
      </div>
    </div>
  </footer>
);

