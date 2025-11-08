# Trading Flow Testing Checklist

## Test Environment
- **URL**: http://localhost:3000
- **Network**: Arbitrum Sepolia (Chain ID: 421614)
- **Required**: MetaMask or compatible Web3 wallet

---

## 1. Landing Page → Trading Flow

### Test: "Start Trading" Button
1. Navigate to http://localhost:3000
2. Click "Start Trading" button in hero section
3. **Expected**: Navigate to `/app` (TradingAppPage)
4. **Expected**: See trading interface with market selector and trade ticket

### Test: "Browse Markets" Button
1. Navigate to http://localhost:3000
2. Click "Browse Markets" button in hero section
3. **Expected**: Navigate to `/markets` (MarketsPage)
4. **Expected**: See list of all available markets

---

## 2. Markets Page → Trading Flow

### Test: Market Card Click
1. Navigate to http://localhost:3000/markets
2. Click on any market card (e.g., "US Inflation CPI")
3. **Expected**:
   - Navigate to `/app`
   - Selected market should be the one you clicked
   - Trading ticket should show the correct market name
   - Market should be highlighted in "Available Markets" section

### Test: Top 5 Carousel Click
1. Navigate to http://localhost:3000/markets
2. Scroll to "Top 5" carousel section
3. Click on any carousel card
4. **Expected**:
   - Navigate to `/app`
   - Selected market should be the one you clicked
   - Trading ticket should reflect the selected market

### Test: Visual Feedback
1. Navigate to http://localhost:3000/markets
2. Hover over any market card
3. **Expected**: Border changes to yellow (`border-yellow-500/40`)
4. **Expected**: Cursor shows pointer
5. **Expected**: See "Click to trade" text at bottom of card

---

## 3. Wallet Connection Flow

### Test: Connect Wallet from Header
1. Navigate to any page
2. Click "Connect Wallet" button in header (SiteHeader)
3. **Expected**: MetaMask popup appears
4. Select account and approve connection
5. **Expected**:
   - Button changes to show connected address (truncated)
   - User menu appears with "Disconnect" option

### Test: Connect Wallet from Trading Page
1. Navigate to http://localhost:3000/app
2. If wallet not connected, should see "Connect Wallet" button in trading ticket
3. Click "Connect Wallet"
4. **Expected**: MetaMask popup appears
5. Approve connection
6. **Expected**: Trading ticket shows wallet balance and allows trading

### Test: Disconnect Wallet
1. With wallet connected, click on address in header
2. Click "Disconnect" in dropdown menu
3. **Expected**:
   - Wallet disconnects
   - Button reverts to "Connect Wallet"
   - Trading page requires reconnection

### Test: Network Mismatch Detection
1. Connect wallet on wrong network (e.g., Ethereum Mainnet)
2. Navigate to http://localhost:3000/app
3. **Expected**: See warning banner "Wrong Network"
4. Click "Switch Network" button
5. **Expected**: MetaMask prompts to switch to Arbitrum Sepolia
6. Approve switch
7. **Expected**: Warning disappears, trading enabled

---

## 4. Trading Ticket Functionality

### Test: Market Selection
1. Navigate to http://localhost:3000/app
2. Click on different markets in "Available Markets" grid
3. **Expected**:
   - Trading ticket updates with selected market name
   - Market price and details update
   - Selected market shows yellow highlight border

### Test: Long/Short Toggle
1. With wallet connected, on trading page
2. Click "Long" button
3. **Expected**: Long button highlighted (green)
4. Click "Short" button
5. **Expected**: Short button highlighted (red), Long de-selected

### Test: Collateral Input
1. Enter amount in "Collateral (USDC)" field
2. **Expected**: Position size updates based on leverage
3. **Expected**: "Max" button shows available USDC balance

### Test: Leverage Slider
1. Drag leverage slider from 1x to 20x
2. **Expected**:
   - Leverage value updates
   - Position size recalculates
   - Liquidation price updates

---

## 5. Navigation Integration

### Test: Header Navigation
1. From any page, click logo/home link
2. **Expected**: Navigate to landing page (/)
3. Click "Markets" in header
4. **Expected**: Navigate to /markets
5. Click "Trade" or "App" link
6. **Expected**: Navigate to /app

### Test: Footer Navigation
1. Scroll to bottom of any page
2. Click footer links (About, How It Works, Whitepaper, etc.)
3. **Expected**: Navigate to respective pages
4. **Expected**: Scroll to top of new page

### Test: Mobile Navigation (< 768px width)
1. Resize browser to mobile width
2. **Expected**: See bottom navigation bar (MobileNavBar)
3. Click nav items (Markets, Portfolio, Learn, Settings)
4. **Expected**: Navigate to respective pages

---

## 6. State Persistence

### Test: Selected Market Persistence
1. Navigate to /markets
2. Click on "Healthcare Shield" market
3. **Expected**: Navigate to /app with Healthcare Shield selected
4. Navigate back to /markets
5. Navigate to /app again
6. **Expected**: Healthcare Shield should still be selected (until you select another market)

### Test: Wallet Connection Persistence
1. Connect wallet
2. Refresh page
3. **Expected**: Wallet should reconnect automatically (via localStorage check)

---

## 7. Error Handling

### Test: No MetaMask Installed
1. Test in browser without MetaMask
2. Try to connect wallet
3. **Expected**: Error message "Please install MetaMask to use this dApp"

### Test: User Rejects Connection
1. Click "Connect Wallet"
2. In MetaMask popup, click "Cancel"
3. **Expected**: Connection cancelled gracefully, no error thrown
4. **Expected**: Can try to connect again

### Test: Insufficient Balance
1. Connect wallet with 0 USDC
2. Try to enter collateral amount > 0
3. Click "Open Long Position"
4. **Expected**: Button disabled or shows "Insufficient balance" error

---

## 8. Visual Consistency

### Test: Tickers Display
1. Navigate to /markets
2. **Expected**: See two ticker rows:
   - "U.S. Consumer Price Index (CPI) — Official government data"
   - "Tradable inflation derivatives — Live perpetual prices"
3. **Expected**: Tickers scroll smoothly
4. **Expected**: Data displays correctly with proper formatting

### Test: Responsive Design
1. Test at widths: 375px (mobile), 768px (tablet), 1280px (desktop)
2. **Expected**: Market cards resize appropriately
3. **Expected**: Navigation adapts (header on desktop, bottom bar on mobile)
4. **Expected**: Trading ticket and position list stack properly on mobile

---

## 9. Integration Points to Verify

### Critical Flow: Complete Trade Journey
1. Start at landing page (/)
2. Click "Browse Markets"
3. Click on a market card
4. Connect wallet when prompted
5. Switch to Arbitrum Sepolia if needed
6. Enter collateral amount
7. Select Long or Short
8. Adjust leverage
9. Click "Open Long Position" / "Open Short Position"
10. **Expected**: Transaction submitted to blockchain
11. **Expected**: Position appears in "Your Positions" section

---

## Known Issues / Expected Behaviors

- **Testnet Only**: App is configured for Arbitrum Sepolia testnet
- **Mock Data**: Market prices may use static data from `MARKETS` constant
- **Development Mode**: Console warnings are normal in dev mode
- **Position Management**: Positions stored in React state (will reset on page refresh)

---

## Success Criteria

✅ All navigation buttons work and route correctly
✅ Market selection persists from Markets page to Trading page
✅ Wallet connects successfully via MetaMask
✅ Network mismatch detected and switch works
✅ Trading ticket shows correct market information
✅ No duplicate buttons or confusing UI elements
✅ All clickable cards show proper hover states
✅ Mobile navigation works correctly

---

## Testing Commands

```bash
# Start development server
npm start

# Open in browser
# Navigate to http://localhost:3000

# Test with MetaMask on Arbitrum Sepolia
# Chain ID: 421614
# RPC URL: https://sepolia-rollup.arbitrum.io/rpc
```

---

## Quick Test Scenarios

### Scenario A: New User Journey
1. Visit landing page
2. Click "Start Trading"
3. Connect wallet
4. Switch network if needed
5. Select market from grid
6. Enter trade details
7. Submit transaction

### Scenario B: Browse and Trade
1. Visit landing page
2. Click "Browse Markets"
3. Click specific market card
4. Verify correct market loaded on /app
5. Connect wallet and trade

### Scenario C: Direct Navigation
1. Navigate directly to /app
2. Should see trading interface
3. Default market should be "inflation"
4. Can select different markets from grid
5. Connect wallet to enable trading

---

## Notes for Developer

- All market card clicks use: `{ setSelectedMarket(m.id); navigate('/app'); }`
- Trading page reads market via: `const { selectedMarket } = useAppState();`
- Wallet state managed by Web3Context
- App state managed by AppStateContext
- Toast notifications for user feedback
