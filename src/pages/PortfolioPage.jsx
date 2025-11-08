import React, { useMemo } from 'react';
import { useAppState } from '../app';
import { Card } from '../components/ui/primitives';

export default function PortfolioPage() {
  const { positions } = useAppState();
  const totalCollateral = (positions || []).reduce((s, p) => s + (p.collateral || 0), 0);
  const totalSize = (positions || []).reduce((s, p) => s + (p.size || 0), 0);
  const avgBuffer = useMemo(() => {
    if (!positions || positions.length === 0) return null;
    let sum = 0; let count = 0;
    for (const p of positions) {
      if (p.liquidationPrice && p.entryPrice) {
        const mark = p.entryPrice; // fallback until live per-position mark
        const pct = p.isLong ? Math.max(0, (mark - p.liquidationPrice) / mark) : Math.max(0, (p.liquidationPrice - mark) / mark);
        sum += pct; count += 1;
      }
    }
    return count ? (sum / count) * 100 : null;
  }, [positions]);
  return (
    <main className="min-h-screen bg-black px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-white">Portfolio</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card><div className="text-sm text-gray-400">Positions</div><div className="text-2xl text-white font-bold">{positions?.length || 0}</div></Card>
          <Card><div className="text-sm text-gray-400">Collateral</div><div className="text-2xl text-white font-bold">${totalCollateral.toLocaleString()}</div></Card>
          <Card><div className="text-sm text-gray-400">Size</div><div className="text-2xl text-yellow-500 font-bold">${totalSize.toLocaleString()}</div></Card>
          <Card><div className="text-sm text-gray-400">Avg Buffer to Liq</div><div className="text-2xl text-white font-bold">{avgBuffer != null ? `${avgBuffer.toFixed(1)}%` : '—'}</div></Card>
        </div>
        <NetExposureDonut positions={positions || []} />
      </div>
    </main>
  );
}

function NetExposureDonut({ positions }) {
  const totals = useMemo(() => {
    let long = 0, short = 0;
    for (const p of positions) {
      if (!p || !p.size) continue;
      if (p.isLong) long += p.size; else short += p.size;
    }
    return { long, short };
  }, [positions]);
  const sum = totals.long + totals.short;
  const longPct = sum ? (totals.long / sum) * 100 : 0;
  const shortPct = sum ? (totals.short / sum) * 100 : 0;
  const circumference = 2 * Math.PI * 36;
  const longLen = (longPct / 100) * circumference;
  const shortLen = (shortPct / 100) * circumference;
  return (
    <Card>
      <div className="flex items-center gap-6">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="36" stroke="rgba(255,255,255,0.1)" strokeWidth="12" fill="none" />
          <circle cx="50" cy="50" r="36" stroke="#00B26E" strokeWidth="12" fill="none" strokeDasharray={`${longLen} ${circumference - longLen}`} transform="rotate(-90 50 50)" />
          <circle cx="50" cy="50" r="36" stroke="#FF4D00" strokeWidth="12" fill="none" strokeDasharray={`${shortLen} ${circumference - shortLen}`} transform={`rotate(${(longPct*3.6)-90} 50 50)`} />
        </svg>
        <div>
          <div className="text-sm text-gray-400">Net inflation exposure</div>
          <div className="text-white text-xl font-bold">Long {longPct.toFixed(0)}% / Short {shortPct.toFixed(0)}%</div>
          <div className="text-xs text-gray-400">Based on position sizes</div>
        </div>
      </div>
    </Card>
  );
}
