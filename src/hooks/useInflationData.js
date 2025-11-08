import { useEffect, useState } from 'react';

export default function useInflationData() {
  const [state, setState] = useState({
    markets: [],
    error: null,
    loading: true,
  });

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const response = await fetch('/api/inflation');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (mounted) {
          setState({
            markets: data,
            error: null,
            loading: false,
          });
        }
      } catch (e) {
        if (mounted) {
          setState(s => ({ ...s, error: e?.message || String(e), loading: false }));
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  return state;
}
