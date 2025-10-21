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
  const { positionManager, isReady } = useContracts();

  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch all positions for the connected user
   */
  const fetchPositions = useCallback(async () => {
    if (!isConnected || !account || !positionManager || !isReady) {
      setPositions([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Get user's position IDs
      const positionIds = await positionManager.getUserPositions(account);

      if (positionIds.length === 0) {
        setPositions([]);
        setLoading(false);
        return;
      }

      // Fetch details for each position
      const positionPromises = positionIds.map(async (id) => {
        try {
          const positionData = await positionManager.getPosition(id);

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
  }, [isConnected, account, positionManager, isReady]);

  /**
   * Fetch a single position by ID
   * @param {string} positionId - Position ID to fetch
   * @returns {Object|null} Position data or null
   */
  const getPosition = useCallback(async (positionId) => {
    if (!positionManager || !isReady) {
      return null;
    }

    try {
      const positionData = await positionManager.getPosition(positionId);

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
  }, [positionManager, isReady]);

  /**
   * Check if a position is liquidatable
   * @param {string} positionId - Position ID to check
   * @returns {boolean} True if position can be liquidated
   */
  const isPositionLiquidatable = useCallback(async (positionId) => {
    if (!positionManager || !isReady) {
      return false;
    }

    try {
      return await positionManager.isPositionLiquidatable(positionId);
    } catch (err) {
      console.error(`Error checking liquidation status for ${positionId}:`, err);
      return false;
    }
  }, [positionManager, isReady]);

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
    if (!positionManager || !isReady || !account) {
      return;
    }

    let isMounted = true;

    // Event filters for the current user
    const positionOpenedFilter = positionManager.filters.PositionOpened(null, account);
    const positionClosedFilter = positionManager.filters.PositionClosed(null, account);
    const marginAddedFilter = positionManager.filters.MarginAdded(null, account);
    const marginRemovedFilter = positionManager.filters.MarginRemoved(null, account);

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
    positionManager.on(positionOpenedFilter, handlePositionOpened);
    positionManager.on(positionClosedFilter, handlePositionClosed);
    positionManager.on(marginAddedFilter, handleMarginAdded);
    positionManager.on(marginRemovedFilter, handleMarginRemoved);

    // Cleanup
    return () => {
      isMounted = false;
      if (positionManager.removeAllListeners) {
        positionManager.off(positionOpenedFilter, handlePositionOpened);
        positionManager.off(positionClosedFilter, handlePositionClosed);
        positionManager.off(marginAddedFilter, handleMarginAdded);
        positionManager.off(marginRemovedFilter, handleMarginRemoved);
      }
    };
  }, [positionManager, isReady, account, fetchPositions, removePosition, getPosition, updatePosition]);

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
