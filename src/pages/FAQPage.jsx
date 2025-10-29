import React, { useState } from 'react';
import { Info, CheckCircle } from 'lucide-react';
import { SiteHeader, SiteFooter } from '../components/layout/SiteChrome';
import { Card } from '../components/ui/primitives';
import { HOME_FAQS } from '../components/faq/FAQSection';

const Item = ({ faq, isOpen, onToggle }) => (
  <div className={`rounded-xl border overflow-hidden ${isOpen ? 'border-yellow-500/40 bg-yellow-500/5' : 'border-white/10 bg-white/5 hover:border-yellow-500/20'}`}>
    <button type="button" onClick={onToggle} className="w-full flex items-center justify-between px-5 py-4 text-left text-white">
      <span className={`font-semibold ${isOpen ? 'text-yellow-500' : ''}`}>{faq.question}</span>
      <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
    </button>
    {isOpen && (
      <div className="px-5 pb-5 space-y-3 text-gray-300">
        <div className="whitespace-pre-line">{faq.answer}</div>
        {faq.details && (
          <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
            <div className="flex items-center gap-2 mb-2 text-blue-300 text-sm font-bold"><CheckCircle className="w-4 h-4"/> Key Points</div>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {faq.details.map((d,i)=> <li key={i}>{d}</li>)}
            </ul>
          </div>
        )}
        {faq.comparison && (
          <div className="rounded-lg border border-yellow-500/30 bg-black/30 p-4">
            <div className="flex items-center gap-2 mb-2 text-yellow-500 text-sm font-bold"><Info className="w-4 h-4"/> How this compares</div>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {faq.comparison.map((c,i)=> <li key={i}>{c}</li>)}
            </ul>
          </div>
        )}
      </div>
    )}
  </div>
);

export default function FAQPage() {
  const [open, setOpen] = useState(null);
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />
      <main className="max-w-5xl mx-auto px-4 py-12 space-y-10">
        <section className="text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-500 font-bold tracking-wide">FREQUENTLY ASKED QUESTIONS</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">FAQ</h1>
          <p className="text-lg text-gray-300">Short, clear answers to the most common questions.</p>
        </section>

        <section className="space-y-3">
          {HOME_FAQS.map((f, i)=> (
            <Item key={f.question} faq={f} isOpen={open===i} onToggle={()=> setOpen(open===i? null : i)} />
          ))}
        </section>

        <section>
          <Card className="bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 border-2 border-yellow-500/40 text-center p-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Info className="h-6 w-6 text-yellow-500" />
              <p className="text-xl font-bold text-white">Still have questions?</p>
            </div>
            <p className="text-base text-gray-300 mb-6 max-w-2xl mx-auto">Join Discord, follow updates on Twitter, or open an issue on GitHub.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="https://discord.gg/inflationmarket" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg">Join Discord</a>
              <a href="https://twitter.com/inflationmarket" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg border border-white/20">Follow on Twitter</a>
            </div>
          </Card>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

