import { parseUnits } from 'ethers';
/* global BigInt */
import { useContracts } from './useContracts';
import { getAddresses } from '../contracts/addresses';

export default function usePositionManager() {
  const { getRead, getWrite } = useContracts();
  const { usdc } = getAddresses();

  const ensureApproval = async (owner, tokenAddr, spender, amount) => {
    const read = await getRead();
    const write = await getWrite();
    const erc20Read = read.erc20(tokenAddr);
    const erc20Write = write.erc20(tokenAddr);
    const allowance = await erc20Read.allowance(owner, spender);
    if (allowance < amount) {
      await (await erc20Write.approve(spender, amount)).wait();
    }
  };

  const openPosition = async ({ isLong, collateralAmount, leverageX, slippageBps = 50 }) => {
    const read = await getRead();
    const write = await getWrite();

    if (!write.positionManager || !write.vault) throw new Error('Contracts not configured');

    const account = (await write.positionManager.signer.getAddress());
    const decimals = await read.erc20(usdc).decimals();
    const collateral = parseUnits(String(collateralAmount), decimals);

    // Get current mark price and compute slippage bounds
    const mark = await read.vamm.getMarkPrice();
    const slippage = BigInt(slippageBps);
    const minPrice = isLong ? 0n : (mark * (10000n - slippage)) / 10000n;
    const maxPrice = isLong ? (mark * (10000n + slippage)) / 10000n : (2n ** 256n - 1n);

    // Ensure USDC approval to Vault for deposit, then deposit to Vault for available balance
    await ensureApproval(account, usdc, write.vault.target, collateral);
    await (await write.vault.deposit(usdc, collateral)).wait();

    // Call openPosition on PositionManager
    const leverageWei = parseUnits(String(leverageX), 18);
    const tx = await write.positionManager.openPosition(isLong, collateral, leverageWei, minPrice, maxPrice);
    const receipt = await tx.wait();
    return receipt;
  };

  const closePosition = async (positionId) => {
    const write = await getWrite();
    const tx = await write.positionManager.closePosition(positionId);
    return await tx.wait();
  };

  const addMargin = async (positionId, amount) => {
    const read = await getRead();
    const write = await getWrite();
    const account = (await write.positionManager.signer.getAddress());
    const decimals = await read.erc20(usdc).decimals();
    const amt = parseUnits(String(amount), decimals);

    await ensureApproval(account, usdc, write.vault.target, amt);
    await (await write.vault.deposit(usdc, amt)).wait();
    const tx = await write.positionManager.addMargin(positionId, amt);
    return await tx.wait();
  };

  const removeMargin = async (positionId, amount) => {
    const read = await getRead();
    const write = await getWrite();
    const decimals = await read.erc20(usdc).decimals();
    const amt = parseUnits(String(amount), decimals);
    const tx = await write.positionManager.removeMargin(positionId, amt);
    return await tx.wait();
  };

  return {
    openPosition,
    closePosition,
    addMargin,
    removeMargin,
  };
}
