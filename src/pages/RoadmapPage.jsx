import React from 'react';
import { Card } from '../components/ui/primitives';
import { SiteHeader, SiteFooter } from '../components/layout/SiteChrome';

export default function RoadmapPage() {
  const phases = [
    { phase: 'Q4 2025', items: ['Public testnet v2', 'Docs + SDK updates', 'Formal audit'] },
    { phase: 'Q1 2026', items: ['Mainnet guarded launch', 'Risk parameters iteration', 'New macro markets'] },
    { phase: 'H1 2026', items: ['Scaling improvements', 'Advanced risk dashboards', 'Partner integrations'] },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold mb-8">Roadmap</h1>
        <div className="space-y-4">
          {phases.map((p, idx) => (
            <Card key={idx}>
              <div className="text-2xl font-bold mb-2">{p.phase}</div>
              <ul className="list-disc pl-5 text-gray-300 space-y-1">
                {p.items.map((it, i) => (
                  <li key={i}>{it}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
