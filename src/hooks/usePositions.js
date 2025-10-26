import { useState, useEffect, useCallback, useContext } from 'react';
import { ethers } from 'ethers';
import { Web3Context } from '../contexts/Web3Context';
import { useContracts } from './useContracts';

/**
 * Custom hook to fetch and manage user positions
 * Provides real-time position data with event subscriptions
 *
 * @returns {Object} Position data and management functions
 */
export const usePositions = () => {
  const { account, isConnected } = useContext(Web3Context);
  const { getRead } = useContracts();
  const [isReady, setIsReady] = useState(false);

  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch all positions for the connected user
   */
  const fetchPositions = useCallback(async () => {
    const read = await getRead();
    const pm = read?.positionManager;
    const ready = !!pm;
    setIsReady(ready);
    if (!isConnected || !account || !ready) {
      setPositions([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Get user's position IDs
      if (typeof pm.getUserPositions !== 'function') {
        setPositions([]);
        setLoading(false);
        return;
      }
      const positionIds = await pm.getUserPositions(account);

      if (positionIds.length === 0) {
        setPositions([]);
        setLoading(false);
        return;
      }

      // Fetch details for each position
      const positionPromises = positionIds.map(async (id) => {
        try {
          if (typeof pm.getPosition !== 'function') return null;
          const positionData = await pm.getPosition(id);

          // Convert contract data to usable format
          return {
            id: id,
            trader: positionData.trader,
            timestamp: Number(positionData.timestamp),
            size: positionData.size,
            collateral: positionData.collateral,
            leverage: positionData.leverage,
            entryPrice: positionData.entryPrice,
            entryFundingIndex: positionData.entryFundingIndex,
            liquidationPrice: positionData.liquidationPrice,
            isLong: positionData.isLong,
          };
        } catch (err) {
          console.error(`Error fetching position ${id}:`, err);
          return null;
        }
      });

      const fetchedPositions = await Promise.all(positionPromises);

      // Filter out any failed fetches
      const validPositions = fetchedPositions.filter(p => p !== null);

      setPositions(validPositions);
      setLoading(false);

    } catch (err) {
      console.error('Error fetching positions:', err);
      setError(err.message);
      setLoading(false);
    }
  }, [isConnected, account, getRead]);

  /**
   * Fetch a single position by ID
   * @param {string} positionId - Position ID to fetch
   * @returns {Object|null} Position data or null
   */
  const getPosition = useCallback(async (positionId) => {
    const read = await getRead();
    const pm = read?.positionManager;
    if (!pm) return null;

    try {
      if (typeof pm.getPosition !== 'function') return null;
      const positionData = await pm.getPosition(positionId);

      return {
        id: positionId,
        trader: positionData.trader,
        timestamp: Number(positionData.timestamp),
        size: positionData.size,
        collateral: positionData.collateral,
        leverage: positionData.leverage,
        entryPrice: positionData.entryPrice,
        entryFundingIndex: positionData.entryFundingIndex,
        liquidationPrice: positionData.liquidationPrice,
        isLong: positionData.isLong,
      };
    } catch (err) {
      console.error(`Error fetching position ${positionId}:`, err);
      return null;
    }
  }, [getRead]);

  /**
   * Check if a position is liquidatable
   * @param {string} positionId - Position ID to check
   * @returns {boolean} True if position can be liquidated
   */
  const isPositionLiquidatable = useCallback(async (positionId) => {
    const read = await getRead();
    const pm = read?.positionManager;
    if (!pm) return false;

    try {
      if (typeof pm.isPositionLiquidatable !== 'function') return false;
      return await pm.isPositionLiquidatable(positionId);
    } catch (err) {
      console.error(`Error checking liquidation status for ${positionId}:`, err);
      return false;
    }
  }, [getRead]);

  /**
   * Add a new position to the local state (optimistic update)
   * @param {Object} position - Position data
   */
  const addPosition = useCallback((position) => {
    setPositions(prev => [position, ...prev]);
  }, []);

  /**
   * Remove a position from local state (optimistic update)
   * @param {string} positionId - Position ID to remove
   */
  const removePosition = useCallback((positionId) => {
    setPositions(prev => prev.filter(p => p.id !== positionId));
  }, []);

  /**
   * Update a position in local state (optimistic update)
   * @param {string} positionId - Position ID to update
   * @param {Object} updates - Partial position data to update
   */
  const updatePosition = useCallback((positionId, updates) => {
    setPositions(prev => prev.map(p =>
      p.id === positionId ? { ...p, ...updates } : p
    ));
  }, []);

  // Fetch positions when account or network changes
  useEffect(() => {
    fetchPositions();
  }, [fetchPositions]);

  // Subscribe to position events
  useEffect(() => {
    let unsubscribe = () => {};
    (async () => {
      const read = await getRead();
      const pm = read?.positionManager;
      if (!pm || !account) return;

      let isMounted = true;

    // Event filters for the current user
    const canFilter = pm.filters && pm.filters.PositionOpened && pm.filters.PositionClosed && pm.filters.MarginAdded && pm.filters.MarginRemoved;
    if (!canFilter) {
      unsubscribe = () => {};
      return;
    }
    const positionOpenedFilter = pm.filters.PositionOpened(null, account);
    const positionClosedFilter = pm.filters.PositionClosed(null, account);
    const marginAddedFilter = pm.filters.MarginAdded(null, account);
    const marginRemovedFilter = pm.filters.MarginRemoved(null, account);

    // Event handlers
    const handlePositionOpened = (positionId, trader, ...args) => {
      console.log('Position opened event:', positionId);
      if (isMounted) {
        // Refetch positions to get the latest data
        fetchPositions();
      }
    };

    const handlePositionClosed = (positionId, trader, ...args) => {
      console.log('Position closed event:', positionId);
      if (isMounted) {
        // Remove position from local state
        removePosition(positionId);
      }
    };

    const handleMarginAdded = (positionId, trader, amount) => {
      console.log('Margin added event:', positionId, amount);
      if (isMounted) {
        // Refetch the specific position
        getPosition(positionId).then(position => {
          if (position) {
            updatePosition(positionId, position);
          }
        });
      }
    };

    const handleMarginRemoved = (positionId, trader, amount) => {
      console.log('Margin removed event:', positionId, amount);
      if (isMounted) {
        // Refetch the specific position
        getPosition(positionId).then(position => {
          if (position) {
            updatePosition(positionId, position);
          }
        });
      }
    };

    // Subscribe to events
    pm.on(positionOpenedFilter, handlePositionOpened);
    pm.on(positionClosedFilter, handlePositionClosed);
    pm.on(marginAddedFilter, handleMarginAdded);
    pm.on(marginRemovedFilter, handleMarginRemoved);

    // Cleanup
      unsubscribe = () => {
        isMounted = false;
        if (pm.off) {
          pm.off(positionOpenedFilter, handlePositionOpened);
          pm.off(positionClosedFilter, handlePositionClosed);
          pm.off(marginAddedFilter, handleMarginAdded);
          pm.off(marginRemovedFilter, handleMarginRemoved);
        }
      };
    })();

    return () => unsubscribe();
  }, [account, getRead, fetchPositions, removePosition, getPosition, updatePosition]);

  return {
    positions,
    loading,
    error,
    fetchPositions,
    getPosition,
    isPositionLiquidatable,
    addPosition,
    removePosition,
    updatePosition,
  };
};

export default usePositions;
