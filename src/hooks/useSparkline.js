import { useEffect, useMemo, useState } from 'react';
import useMarketFeed from './useMarketFeed';

// Builds a rolling sparkline series from a live price source.
// Usage:
// - useSparkline({ marketId: 'inflation', maxPoints: 30 })
// - For now, only 'inflation' has live mark via useMarketData; others fall back.
export default function useSparkline(options) {
  const opts = useMemo(() => {
    if (typeof options === 'number') return { marketId: 'inflation', maxPoints: options };
    return { marketId: 'inflation', maxPoints: 24, ...(options || {}) };
  }, [options]);

  const live = useMarketFeed(opts.marketId);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    // Only append live points for the market that has a live source available.
    if (opts.marketId !== 'inflation') return; // placeholder until other feeds are wired
    if (live.markPriceNum != null) {
      setSeries((prev) => {
        const next = [...prev, Number(live.markPriceNum)];
        if (next.length > opts.maxPoints) next.shift();
        return next;
      });
    }
  }, [live.markPriceNum, opts.marketId, opts.maxPoints]);

  return { series, loading: live.loading, error: live.error };
}
