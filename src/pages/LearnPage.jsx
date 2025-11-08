import React, { useMemo } from 'react';
import { Card } from '../components/ui/primitives';

export default function LearnPage() {
  const clips = useMemo(() => ([
    { title: 'What is a breakeven rate?', url: 'https://example.com/clip1', duration: 15 },
    { title: 'How CPI is measured', url: 'https://example.com/clip2', duration: 15 },
    { title: 'Funding rates explained', url: 'https://example.com/clip3', duration: 15 },
  ]), []);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: clips.map((c, i) => ({
      '@type': 'VideoObject',
      name: c.title,
      description: 'Short explainer',
      uploadDate: new Date().toISOString(),
      contentUrl: c.url,
      duration: 'PT15S',
      position: i + 1,
      thumbnailUrl: ['https://example.com/thumbnail.jpg'],
    })),
  };
  return (
    <main className="min-h-screen bg-black px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-white">Learn</h1>
        <div className="grid md:grid-cols-3 gap-4">
          {clips.map((c) => (
            <Card key={c.title} className="transition-transform duration-200 hover:-translate-y-0.5 hover:border-yellow-500/40">
              <div className="aspect-video w-full rounded-lg bg-white/5 mb-3 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/10 to-transparent animate-pulse" />
              </div>
              <div className="text-white font-semibold">{c.title}</div>
              <div className="text-xs text-gray-400">{c.duration}s video • Coming soon</div>
            </Card>
          ))}
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </div>
    </main>
  );
}
