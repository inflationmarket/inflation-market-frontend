import React, { createContext, useContext, useMemo, useState } from 'react';
import useMarketFeed from '../hooks/useMarketFeed';

const MarketHistoryContext = createContext(null);

export function MarketHistoryProvider({ children, markets = ['inflation', 'housing', 'gdp'], maxPoints = 50 }) {
  // Maintain a simple map of marketId -> series (array of numbers)
  const [seriesMap, setSeriesMap] = useState({});

  // Attach a live feed subscriber for each market id in the list
  // They will independently append marks into the shared map
  markets.forEach((id) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const live = useMarketFeed(id);
    const last = live?.markPriceNum;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (last == null) return;
      setSeriesMap((prev) => {
        const prevArr = prev[id] || [];
        const next = [...prevArr, Number(last)];
        if (next.length > maxPoints) next.shift();
        if (prevArr === next) return prev; // not expected, but defensive
        return { ...prev, [id]: next };
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, last]);
  });

  const value = useMemo(() => ({
    getSeries: (id) => seriesMap[id] || [],
    lastMark: (id) => {
      const s = seriesMap[id] || [];
      return s.length ? s[s.length - 1] : null;
    },
  }), [seriesMap]);

  return (
    <MarketHistoryContext.Provider value={value}>
      {children}
    </MarketHistoryContext.Provider>
  );
}

export function useMarketHistory(marketId) {
  const ctx = useContext(MarketHistoryContext);
  if (!ctx) throw new Error('useMarketHistory must be used within MarketHistoryProvider');
  return {
    series: ctx.getSeries(marketId),
    last: ctx.lastMark(marketId),
  };
}

