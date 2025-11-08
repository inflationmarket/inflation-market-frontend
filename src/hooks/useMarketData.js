import { useEffect, useState } from 'react';
import { useContracts } from './useContracts';

export default function useMarketData() {
  const { getRead } = useContracts();
  const priceDecimals = Number(process.env.REACT_APP_PRICE_DECIMALS || '0');
  const fundingDecimals = Number(process.env.REACT_APP_FUNDING_DECIMALS || '0');

  useEffect(() => {
    if (!process.env.REACT_APP_PRICE_DECIMALS) {
      console.warn('REACT_APP_PRICE_DECIMALS is not set. Defaulting to 0. This may cause incorrect price display.');
    }
    if (!process.env.REACT_APP_FUNDING_DECIMALS) {
      console.warn('REACT_APP_FUNDING_DECIMALS is not set. Defaulting to 0. This may cause incorrect funding rate display.');
    }
  }, []);
  const [state, setState] = useState({
    markPrice: null,
    indexPrice: null,
    fundingRate: null,
    markPriceNum: null,
    indexPriceNum: null,
    fundingRateNum: null,
    lastUpdated: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    let mounted = true;
    let timer;
    const fetchOnce = async () => {
      try {
        const read = await getRead();
        const mark = read.vamm ? await read.vamm.getMarkPrice() : null;
        const idx = read.indexOracle ? await read.indexOracle.getIndexPrice() : null;
        const fr = read.fundingCalc ? await read.fundingCalc.currentFundingRate() : null;
        const toNum = (v, d) => v == null ? null : (typeof v === 'bigint' ? Number(v) / 10 ** d : Number(v) / 10 ** d);
        if (!mounted) return;
        setState({
          markPrice: mark ?? null,
          indexPrice: idx ?? null,
          fundingRate: fr ?? null,
          markPriceNum: toNum(mark, priceDecimals),
          indexPriceNum: toNum(idx, priceDecimals),
          fundingRateNum: toNum(fr, fundingDecimals),
          lastUpdated: Date.now(),
          error: null,
          loading: false,
        });
      } catch (e) {
        if (!mounted) return;
        setState(s => ({ ...s, error: e?.message || String(e), loading: false }));
      }
    };
    fetchOnce();
    timer = setInterval(fetchOnce, 10_000);
    return () => {
      mounted = false;
      if (timer) clearInterval(timer);
    };
  }, [getRead]);

  return state;
}
