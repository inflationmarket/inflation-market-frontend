import { useEffect, useState } from 'react';
import { useContracts } from './useContracts';

export default function useTokenBalance(tokenAddress, owner) {
  const { getRead } = useContracts();
  const [state, setState] = useState({ raw: null, value: 0, decimals: 0, loading: true, refreshing: false, error: null });

  useEffect(() => {
    let mounted = true;
    if (!tokenAddress || !owner) {
      setState(s => ({ ...s, loading: false, refreshing: false }));
      return;
    }
    const run = async () => {
      try {
        setState(s => ({ ...s, refreshing: s.raw !== null ? true : s.refreshing }));
        const read = await getRead();
        const erc20 = read.erc20(tokenAddress);
        const [decimals, bal] = await Promise.all([
          erc20.decimals(),
          erc20.balanceOf(owner),
        ]);
        if (!mounted) return;
        const val = typeof bal === 'bigint' ? Number(bal) / 10 ** Number(decimals) : Number(bal);
        setState({ raw: bal, value: val, decimals: Number(decimals), loading: false, refreshing: false, error: null });
      } catch (e) {
        if (!mounted) return;
        setState(s => ({ ...s, loading: false, refreshing: false, error: e?.message || String(e) }));
      }
    };
    run();
    const t = setInterval(run, 15000);
    return () => { mounted = false; clearInterval(t); };
  }, [tokenAddress, owner, getRead]);

  return state;
}
