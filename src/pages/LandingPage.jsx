import React, { useState } from 'react';
import { ArrowRight, BarChart3, Menu, MessageCircle, Twitter, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import FAQSection from '../components/faq/FAQSection';
import { Button, Card, PyramidLogo } from '../components/ui/primitives';
import { CONFIG, MARKETS } from '../config/constants';

export default function LandingPage({ onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black">
      <header className="border-b border-yellow-500/20 sticky top-0 z-50 bg-black/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center">
              <PyramidLogo className="w-5 h-5 text-black" />
            </div>
            <span className="font-bold text-white">Inflation Market</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/how-it-works" className="text-sm text-gray-400 hover:text-yellow-500">How It Works</Link>
            <Link to="/whitepaper" className="text-sm text-gray-400 hover:text-yellow-500">Whitepaper</Link>
            <Link to="/roadmap" className="text-sm text-gray-400 hover:text-yellow-500">Roadmap</Link>
            <Link to="/about" className="text-sm text-gray-400 hover:text-yellow-500">About</Link>
            <Link to="/faq" className="text-sm text-gray-400 hover:text-yellow-500">FAQ</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/app">
              <Button>
                Open Prototype <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <button className="md:hidden text-gray-400 hover:text-yellow-500" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-500 mb-6">
              <Zap className="w-4 h-4" />
              Live testnet demo
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              Trade Inflation. Protect Your Wealth.
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              The first decentralized perpetual futures market for real-world economic data.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/app"><Button className="text-lg">Open Prototype <ArrowRight className="w-5 h-5" /></Button></Link>
              <Link to="/whitepaper"><Button variant="ghost" className="text-lg">Read Whitepaper</Button></Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {MARKETS.map((m) => (
              <Card key={m.id}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-bold text-lg">{m.name}</div>
                    <div className="text-gray-400 text-sm">{m.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold text-xl">${m.price.toFixed(2)}</div>
                    <div className={`text-sm font-bold ${m.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {`${m.change24h >= 0 ? '+' : ''}${m.change24h.toFixed(2)}%`}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 border-2 border-yellow-500/40 text-center p-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Ready to Open Prototype?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join hundreds of traders already hedging their inflation risk and earning yields on Inflation Market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/app"><Button className="text-lg">Open Prototype <ArrowRight className="w-5 h-5" /></Button></Link>
              <Link to="/whitepaper"><Button variant="ghost" className="text-lg">Read Whitepaper</Button></Link>
            </div>
          </Card>
        </div>
      </section>

      <FAQSection />

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
                <Link to="/whitepaper" className="block text-sm text-gray-400 hover:text-yellow-500">Whitepaper</Link>
                <Link to="/roadmap" className="block text-sm text-gray-400 hover:text-yellow-500">Roadmap</Link>
                <Link to="/about" className="block text-sm text-gray-400 hover:text-yellow-500">About</Link>
                <Link to="/app" className="block text-sm text-gray-400 hover:text-yellow-500">Open Prototype</Link>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Community</h4>
              <div className="space-y-2">
                <a href={CONFIG.social.twitter} target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-400 hover:text-yellow-500 flex items-center gap-2">
                  <Twitter className="w-4 h-4" /> Twitter
                </a>
                <a href={CONFIG.social.discord} target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-400 hover:text-yellow-500 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" /> Discord
                </a>
                <a href={CONFIG.social.github} target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-400 hover:text-yellow-500 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" /> GitHub
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Community</h4>
              <div className="space-y-2">
                <a href={CONFIG.social.discord} target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-400 hover:text-yellow-500">Discord</a>
                <a href={CONFIG.social.twitter} target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-400 hover:text-yellow-500">Twitter</a>
                <a href={CONFIG.social.github} target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-400 hover:text-yellow-500">GitHub</a>
              </div>
            </div>
          </div>

          <div className="border-t border-yellow-500/20 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 Inflation Market. All rights reserved.</p>
            <p className="mt-2 text-xs text-yellow-500">⚠️ Testnet Demo - {CONFIG.domain}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
