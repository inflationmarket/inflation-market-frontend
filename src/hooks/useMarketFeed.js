import { useEffect, useMemo, useState } from 'react';
import { ethers } from 'ethers';
import { getMarketAddresses } from '../contracts/addresses';
import { VAMM_ABI, INDEX_ORACLE_ABI, FUNDING_CALCULATOR_ABI } from '../contracts/abis';

export default function useMarketFeed(marketId) {
  const addrs = useMemo(() => getMarketAddresses(marketId), [marketId]);
  const priceDecimals = Number(process.env.REACT_APP_PRICE_DECIMALS || '0');
  const fundingDecimals = Number(process.env.REACT_APP_FUNDING_DECIMALS || '0');
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
        if (!addrs?.rpcUrl) throw new Error('RPC URL missing');
        const provider = new ethers.JsonRpcProvider(addrs.rpcUrl, addrs.chainId);
        if (!addrs?.vamm || !addrs?.indexOracle) throw new Error('No feed configured for market');
        const vamm = new ethers.Contract(addrs.vamm, VAMM_ABI, provider);
        const oracle = new ethers.Contract(addrs.indexOracle, INDEX_ORACLE_ABI, provider);
        const funding = addrs.fundingCalculator ? new ethers.Contract(addrs.fundingCalculator, FUNDING_CALCULATOR_ABI, provider) : null;
        const [mark, idx, fr] = await Promise.all([
          vamm.getMarkPrice(),
          oracle.getIndexPrice(),
          funding ? funding.currentFundingRate() : Promise.resolve(null),
        ]);
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
    return () => { mounted = false; if (timer) clearInterval(timer); };
  }, [addrs, priceDecimals, fundingDecimals]);

  return state;
}

