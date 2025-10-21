import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { useContracts } from './useContracts';
import { useToast } from '../components/toast/ToastProvider';

/**
 * Custom hook for managing positions via PositionManager contract
 * Provides functions to open, close, and manage positions
 *
 * @returns {Object} Position management functions and state
 */
export const usePositionManager = () => {
  const { positionManager, vault, usdc, addresses, isReady } = useContracts();
  const { addToast } = useToast();

  const [txState, setTxState] = useState({
    loading: false,
    error: null,
    txHash: null,
    stage: null, // 'approval', 'transaction', 'complete'
  });

  /**
   * Check and approve USDC spending if needed
   * @param {string} amount - Amount of USDC to approve (in raw units)
   * @returns {boolean} - True if approval successful or not needed
   */
  const ensureApproval = useCallback(async (amount) => {
    if (!usdc || !vault || !addresses) {
      throw new Error('Contracts not initialized');
    }

    try {
      // Get current signer address
      const signer = await usdc.runner.getAddress();

      // Check current allowance
      const allowance = await usdc.allowance(signer, addresses.Vault);

      // If allowance is sufficient, no need to approve
      if (allowance >= amount) {
        return true;
      }

      setTxState({ loading: true, error: null, txHash: null, stage: 'approval' });

      // Request approval for a large amount (to avoid multiple approvals)
      const approvalAmount = ethers.MaxUint256;
      const approveTx = await usdc.approve(addresses.Vault, approvalAmount);

      setTxState({ loading: true, error: null, txHash: approveTx.hash, stage: 'approval' });
      addToast('Approving USDC...', 'info');

      await approveTx.wait();
      addToast('USDC approved successfully!', 'success');

      return true;
    } catch (error) {
      console.error('Approval error:', error);
      const errorMsg = error.reason || error.message || 'Approval failed';
      setTxState({ loading: false, error: errorMsg, txHash: null, stage: null });
      addToast(errorMsg, 'error');
      return false;
    }
  }, [usdc, vault, addresses, addToast]);

  /**
   * Open a new position
   * @param {Object} params - Position parameters
   * @param {boolean} params.isLong - True for long, false for short
   * @param {string} params.collateralAmount - Collateral amount in USDC (human readable, e.g., "100")
   * @param {number} params.leverage - Leverage multiplier (e.g., 5 for 5x)
   * @param {number} params.slippageTolerance - Slippage tolerance as decimal (e.g., 0.005 for 0.5%)
   * @returns {Object} - { success, positionId, txHash }
   */
  const openPosition = useCallback(async ({ isLong, collateralAmount, leverage, slippageTolerance = 0.005 }) => {
    if (!isReady || !positionManager) {
      addToast('Please connect your wallet', 'error');
      return { success: false };
    }

    try {
      setTxState({ loading: true, error: null, txHash: null, stage: 'preparation' });

      // Convert collateral to wei (USDC has 6 decimals)
      const collateralWei = ethers.parseUnits(collateralAmount, 6);

      // Ensure USDC approval
      const approved = await ensureApproval(collateralWei);
      if (!approved) {
        return { success: false };
      }

      // Get current mark price from vAMM for slippage calculation
      // This will be implemented when we create useMarketData hook
      // For now, we'll use placeholder values
      const markPrice = ethers.parseUnits('100', 18); // Placeholder

      // Calculate slippage bounds
      const slippageBps = BigInt(Math.floor(slippageTolerance * 10000));
      const minPrice = (markPrice * (10000n - slippageBps)) / 10000n;
      const maxPrice = (markPrice * (10000n + slippageBps)) / 10000n;

      // Convert leverage to contract format (1e18 precision)
      const leverageWei = ethers.parseUnits(leverage.toString(), 18);

      setTxState({ loading: true, error: null, txHash: null, stage: 'transaction' });
      addToast('Opening position...', 'info');

      // Call contract function
      const tx = await positionManager.openPosition(
        isLong,
        collateralWei,
        leverageWei,
        minPrice,
        maxPrice
      );

      setTxState({ loading: true, error: null, txHash: tx.hash, stage: 'transaction' });

      // Wait for transaction confirmation
      const receipt = await tx.wait();

      // Extract position ID from event logs
      const event = receipt.logs.find(log => {
        try {
          const parsed = positionManager.interface.parseLog(log);
          return parsed && parsed.name === 'PositionOpened';
        } catch {
          return false;
        }
      });

      let positionId = null;
      if (event) {
        const parsed = positionManager.interface.parseLog(event);
        positionId = parsed.args.positionId;
      }

      setTxState({ loading: false, error: null, txHash: receipt.hash, stage: 'complete' });
      addToast(`${isLong ? 'Long' : 'Short'} position opened successfully!`, 'success');

      return {
        success: true,
        positionId,
        txHash: receipt.hash,
      };

    } catch (error) {
      console.error('Open position error:', error);
      let errorMsg = 'Failed to open position';

      if (error.reason) {
        errorMsg = error.reason;
      } else if (error.message?.includes('user rejected')) {
        errorMsg = 'Transaction cancelled';
      } else if (error.message) {
        errorMsg = error.message;
      }

      setTxState({ loading: false, error: errorMsg, txHash: null, stage: null });
      addToast(errorMsg, 'error');

      return { success: false, error: errorMsg };
    }
  }, [isReady, positionManager, ensureApproval, addToast]);

  /**
   * Close an existing position
   * @param {string} positionId - Position ID to close
   * @returns {Object} - { success, pnl, txHash }
   */
  const closePosition = useCallback(async (positionId) => {
    if (!isReady || !positionManager) {
      addToast('Please connect your wallet', 'error');
      return { success: false };
    }

    try {
      setTxState({ loading: true, error: null, txHash: null, stage: 'transaction' });
      addToast('Closing position...', 'info');

      const tx = await positionManager.closePosition(positionId);
      setTxState({ loading: true, error: null, txHash: tx.hash, stage: 'transaction' });

      const receipt = await tx.wait();

      // Extract P&L from event
      const event = receipt.logs.find(log => {
        try {
          const parsed = positionManager.interface.parseLog(log);
          return parsed && parsed.name === 'PositionClosed';
        } catch {
          return false;
        }
      });

      let pnl = null;
      if (event) {
        const parsed = positionManager.interface.parseLog(event);
        pnl = parsed.args.pnl;
      }

      setTxState({ loading: false, error: null, txHash: receipt.hash, stage: 'complete' });
      addToast('Position closed successfully!', 'success');

      return {
        success: true,
        pnl,
        txHash: receipt.hash,
      };

    } catch (error) {
      console.error('Close position error:', error);
      const errorMsg = error.reason || error.message || 'Failed to close position';

      setTxState({ loading: false, error: errorMsg, txHash: null, stage: null });
      addToast(errorMsg, 'error');

      return { success: false, error: errorMsg };
    }
  }, [isReady, positionManager, addToast]);

  /**
   * Add margin to an existing position
   * @param {string} positionId - Position ID
   * @param {string} amount - Amount to add (human readable)
   * @returns {Object} - { success, txHash }
   */
  const addMargin = useCallback(async (positionId, amount) => {
    if (!isReady || !positionManager) {
      addToast('Please connect your wallet', 'error');
      return { success: false };
    }

    try {
      const amountWei = ethers.parseUnits(amount, 6);

      // Ensure approval
      const approved = await ensureApproval(amountWei);
      if (!approved) {
        return { success: false };
      }

      setTxState({ loading: true, error: null, txHash: null, stage: 'transaction' });
      addToast('Adding margin...', 'info');

      const tx = await positionManager.addMargin(positionId, amountWei);
      setTxState({ loading: true, error: null, txHash: tx.hash, stage: 'transaction' });

      const receipt = await tx.wait();

      setTxState({ loading: false, error: null, txHash: receipt.hash, stage: 'complete' });
      addToast('Margin added successfully!', 'success');

      return {
        success: true,
        txHash: receipt.hash,
      };

    } catch (error) {
      console.error('Add margin error:', error);
      const errorMsg = error.reason || error.message || 'Failed to add margin';

      setTxState({ loading: false, error: errorMsg, txHash: null, stage: null });
      addToast(errorMsg, 'error');

      return { success: false, error: errorMsg };
    }
  }, [isReady, positionManager, ensureApproval, addToast]);

  /**
   * Remove margin from an existing position
   * @param {string} positionId - Position ID
   * @param {string} amount - Amount to remove (human readable)
   * @returns {Object} - { success, txHash }
   */
  const removeMargin = useCallback(async (positionId, amount) => {
    if (!isReady || !positionManager) {
      addToast('Please connect your wallet', 'error');
      return { success: false };
    }

    try {
      const amountWei = ethers.parseUnits(amount, 6);

      setTxState({ loading: true, error: null, txHash: null, stage: 'transaction' });
      addToast('Removing margin...', 'info');

      const tx = await positionManager.removeMargin(positionId, amountWei);
      setTxState({ loading: true, error: null, txHash: tx.hash, stage: 'transaction' });

      const receipt = await tx.wait();

      setTxState({ loading: false, error: null, txHash: receipt.hash, stage: 'complete' });
      addToast('Margin removed successfully!', 'success');

      return {
        success: true,
        txHash: receipt.hash,
      };

    } catch (error) {
      console.error('Remove margin error:', error);
      const errorMsg = error.reason || error.message || 'Failed to remove margin';

      setTxState({ loading: false, error: errorMsg, txHash: null, stage: null });
      addToast(errorMsg, 'error');

      return { success: false, error: errorMsg };
    }
  }, [isReady, positionManager, addToast]);

  /**
   * Reset transaction state
   */
  const resetTxState = useCallback(() => {
    setTxState({ loading: false, error: null, txHash: null, stage: null });
  }, []);

  return {
    openPosition,
    closePosition,
    addMargin,
    removeMargin,
    txState,
    resetTxState,
    isReady,
  };
};

export default usePositionManager;
