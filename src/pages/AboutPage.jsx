import React from 'react';
import { Card } from '../components/ui/primitives';
import { SiteHeader, SiteFooter } from '../components/layout/SiteChrome';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold mb-8">About Inflation Market</h1>
        <Card className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">Mission</h2>
          <p className="text-gray-300 text-lg">
            Democratize access to inflation hedging and macro exposure through transparent, on-chain markets.
          </p>
        </Card>
        <Card>
          <h2 className="text-2xl font-bold text-white mb-4">Technology</h2>
          <ul className="text-gray-300 space-y-2 list-disc pl-5">
            <li>Frontend: React 18 + Tailwind</li>
            <li>Wallets & RPC: Ethers v6</li>
            <li>Data: Hybrid MPC aggregation + Chainlink delivery (in progress)</li>
            <li>Hosting: Vercel</li>
          </ul>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
