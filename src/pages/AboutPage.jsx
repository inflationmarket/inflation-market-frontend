import React from 'react';
import { Card } from '../components/ui/primitives';
import { SiteHeader, SiteFooter } from '../components/layout/SiteChrome';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      <SiteHeader />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold text-white mb-8">About Inflation Market</h1>
        <Card className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-gray-300 text-lg">
            To democratize access to inflation hedging tools. Everyone deserves the ability to protect 
            their wealth and profit from macroeconomic trends.
          </p>
        </Card>
        
        <Card>
          <h2 className="text-2xl font-bold text-white mb-4">Technology Stack</h2>
          <div className="space-y-2 text-gray-300">
            <p>• Smart Contracts: Solidity ^0.8.20</p>
            <p>• Frontend: React with Modern UX</p>
            <p>• Blockchain: Arbitrum (L2)</p>
            <p>• Oracles: Hybrid MPC aggregation + Chainlink delivery (in progress)</p>
            <p>• Security: Audits + bug bounties planned pre-mainnet</p>
          </div>
        </Card>
      </main>

      <SiteFooter />
    </div>
  );
}
