import React from 'react';
import ComplianceSection from '../compliance/ComplianceSection';

function SimpleHeader({ onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="border-b border-yellow-500/20 bg-black/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('landing')}>
            <div className="w-10 h-10 rounded-lg bg-yellow-500 flex items-center justify-center">
              <svg className="w-6 h-6 text-black" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="text-xl font-bold text-white">Inflation Market</h1>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => onNavigate('how-it-works')} className="text-gray-300 hover:text-yellow-500">How It Works</button>
            <button onClick={() => onNavigate('whitepaper')} className="text-gray-300 hover:text-yellow-500">Whitepaper</button>
            <button onClick={() => onNavigate('roadmap')} className="text-gray-300 hover:text-yellow-500">Roadmap</button>
            <button onClick={() => onNavigate('about')} className="text-gray-300 hover:text-yellow-500">About</button>
            <button onClick={() => onNavigate('app')} className="px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg font-bold">Open Prototype</button>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-yellow-500/20">
            <button onClick={() => { onNavigate('how-it-works'); setMobileMenuOpen(false); }} className="block w-full text-left text-gray-300 hover:text-yellow-500">How It Works</button>
            <button onClick={() => { onNavigate('whitepaper'); setMobileMenuOpen(false); }} className="block w-full text-left text-gray-300 hover:text-yellow-500">Whitepaper</button>
            <button onClick={() => { onNavigate('roadmap'); setMobileMenuOpen(false); }} className="block w-full text-left text-gray-300 hover:text-yellow-500">Roadmap</button>
            <button onClick={() => { onNavigate('about'); setMobileMenuOpen(false); }} className="block w-full text-left text-gray-300 hover:text-yellow-500">About</button>
            <button onClick={() => { onNavigate('app'); setMobileMenuOpen(false); }} className="w-full px-6 py-2 bg-yellow-500 text-black rounded-lg font-bold">Open Prototype</button>
          </div>
        )}
      </div>
    </header>
  );
}

function SharedFooter({ onNavigate }) {
  return (
    <footer className="border-t border-yellow-500/20 bg-black py-12 px-4 mt-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-bold text-white">Inflation Market</span>
            </div>
            <p className="text-sm text-gray-400">Inflationmarket.com</p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Product</h4>
            <div className="space-y-2">
              <button onClick={() => onNavigate('how-it-works')} className="block w-full text-left text-sm text-gray-400 hover:text-yellow-500">How It Works</button>
              <button onClick={() => onNavigate('whitepaper')} className="block w-full text-left text-sm text-gray-400 hover:text-yellow-500">Whitepaper</button>
              <button onClick={() => onNavigate('roadmap')} className="block w-full text-left text-sm text-gray-400 hover:text-yellow-500">Roadmap</button>
              <button onClick={() => onNavigate('about')} className="block w-full text-left text-sm text-gray-400 hover:text-yellow-500">About</button>
              <button onClick={() => onNavigate('app')} className="block w-full text-left text-sm text-gray-400 hover:text-yellow-500">Open Prototype</button>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Resources</h4>
            <div className="space-y-2">
              <button onClick={() => onNavigate('faq')} className="block w-full text-left text-sm text-gray-400 hover:text-yellow-500">FAQ</button>
              <button onClick={() => onNavigate('compliance')} className="block w-full text-left text-sm text-gray-400 hover:text-yellow-500">Legal & Compliance</button>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Community</h4>
            <div className="space-y-2">
              <a href="https://discord.gg/inflationmarket" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-400 hover:text-yellow-500">Discord</a>
              <a href="https://twitter.com/inflationmarket" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-400 hover:text-yellow-500">Twitter</a>
              <a href="https://github.com/inflationmarket" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-400 hover:text-yellow-500">GitHub</a>
            </div>
          </div>
        </div>

        <div className="border-t border-yellow-500/20 pt-8 text-center text-sm text-gray-400">
          <p>© 2025 Inflation Market. All rights reserved.</p>
          <p className="mt-2 text-xs text-yellow-500">⚠️ Testnet Demo - Inflationmarket.com</p>
        </div>
      </div>
    </footer>
  );
}

const CompliancePage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-black">
      <SimpleHeader onNavigate={onNavigate} />
      <ComplianceSection />
      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
};

export default CompliancePage;
