# 🐛 Debug Guide - Manual Testing Failures

## Test 1: Market Card Navigation - FAILED

### Symptoms
User reports: Market card click navigation not working

### Debugging Steps

#### Step 1: Check Browser Console
1. Open http://localhost:3000/markets
2. Press F12 to open Developer Tools
3. Go to Console tab
4. Click on a market card
5. Look for any error messages (red text)

**Common errors to look for:**
- `TypeError: Cannot read property 'navigate' of undefined`
- `TypeError: setSelectedMarket is not a function`
- `ReferenceError: navigate is not defined`
- React Router errors

#### Step 2: Check Network Tab
1. In DevTools, go to Network tab
2. Click on a market card
3. Look for a navigation request (should see `/app` endpoint)

#### Step 3: Verify React Components Loaded
Open Console and run:
```javascript
// Check if hooks are available
console.log('useNavigate:', typeof useNavigate);
console.log('useAppState:', typeof useAppState);
```

#### Step 4: Check if Click Handler is Attached
1. Right-click on a market card
2. Select "Inspect Element"
3. Look for `onClick` attribute on the card element
4. Should see something like: `onClick={() => { setSelectedMarket(...); navigate('/app'); }}`

### Possible Causes

1. **React Router not properly initialized**
   - Check if `<BrowserRouter>` wraps the app in [src/index.js](src/index.js#L14)

2. **AppStateContext not provided**
   - Check if `<AppStateProvider>` wraps routes in [src/app.js](src/app.js#L63)

3. **useNavigate called outside Router context**
   - Verify MarketsPage is inside `<Routes>` component

4. **JavaScript error preventing handlers from attaching**
   - Check console for any errors on page load

### Manual Test Commands

Open browser console on `/markets` page and run:

```javascript
// Test 1: Check if React DevTools detects the app
window.React !== undefined

// Test 2: Try to manually navigate
window.location.href = '/app'

// Test 3: Check if market cards exist
document.querySelectorAll('[class*="cursor-pointer"]').length

// Test 4: Check if onClick handlers exist
const cards = document.querySelectorAll('[class*="cursor-pointer"]');
cards[0].onclick !== null
```

---

## Test 2: Wallet Connection - FAILED

### Symptoms
User reports: Wallet connection not working

### Debugging Steps

#### Step 1: Check if MetaMask is Installed
Open Console and run:
```javascript
console.log('MetaMask installed:', typeof window.ethereum !== 'undefined');
console.log('Ethereum object:', window.ethereum);
```

#### Step 2: Check if Connect Button Exists
1. Navigate to http://localhost:3000/app
2. Look for "Connect Wallet" button
3. If button doesn't exist, wallet might already be connected

#### Step 3: Check Web3Context
Open Console and run:
```javascript
// Check if Web3Context is provided
console.log('Web3 available:', window.ethereum);
```

#### Step 4: Try Manual Connection
Open Console and run:
```javascript
// Manually request accounts
window.ethereum.request({ method: 'eth_requestAccounts' })
  .then(accounts => console.log('Connected:', accounts))
  .catch(err => console.error('Connection failed:', err));
```

### Possible Causes

1. **MetaMask not installed**
   - Install MetaMask browser extension
   - Restart browser after installation

2. **Connect button not rendering**
   - Wallet might already be connected
   - Check if address shows in header instead of button

3. **Web3Context not initialized**
   - Check if `<Web3Provider>` wraps app in [src/index.js](src/index.js#L12)

4. **Wrong page**
   - Connect button is on `/app` page, not `/markets`

5. **User rejected connection**
   - MetaMask popup might have been denied
   - Try clicking "Connect Wallet" again

### Expected Behavior

**Before Connection:**
- Should see "Connect Wallet" button on `/app` page
- No wallet address visible

**During Connection:**
- MetaMask popup should appear
- Should show list of accounts to connect

**After Connection:**
- Button should change to show wallet address (truncated)
- Balance should display in trading ticket
- Can disconnect via dropdown menu

### Manual Test Commands

```javascript
// Test 1: Check MetaMask
console.log('MetaMask:', !!window.ethereum);

// Test 2: Check current accounts
window.ethereum.request({ method: 'eth_accounts' })
  .then(accounts => console.log('Current accounts:', accounts));

// Test 3: Check network
window.ethereum.request({ method: 'eth_chainId' })
  .then(chainId => console.log('Chain ID:', parseInt(chainId, 16)));

// Test 4: Force disconnect (if stuck)
// (Note: This logs out of MetaMask)
// window.ethereum.request({ method: 'wallet_requestPermissions', params: [{ eth_accounts: {} }] });
```

---

## Common Issues & Solutions

### Issue: "Nothing happens when I click"

**Solution:**
1. Check browser console for errors
2. Verify JavaScript is enabled
3. Try hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
4. Clear browser cache and reload

### Issue: "MetaMask doesn't pop up"

**Solution:**
1. Check if MetaMask extension is installed and unlocked
2. Check if popup is blocked by browser
3. Click MetaMask extension icon manually
4. Try different browser (Chrome/Brave recommended)

### Issue: "Wrong network" warning

**Solution:**
1. This is expected if not on Arbitrum Sepolia
2. Click "Switch Network" button
3. Approve network switch in MetaMask
4. If Arbitrum Sepolia not in MetaMask, add it:
   - Network Name: Arbitrum Sepolia
   - RPC URL: https://sepolia-rollup.arbitrum.io/rpc
   - Chain ID: 421614
   - Currency: ETH

### Issue: "Page won't load"

**Solution:**
1. Check dev server is running: `npm start`
2. Verify port 3000 is not blocked
3. Try http://127.0.0.1:3000 instead of localhost
4. Check for port conflicts: `netstat -ano | findstr :3000`

---

## Quick Diagnostic Script

Copy and paste this into browser console on any page:

```javascript
// 🔍 DIAGNOSTIC SCRIPT
console.log('=== Inflation Market Debug ===');
console.log('1. MetaMask:', !!window.ethereum);
console.log('2. React:', !!window.React);
console.log('3. Current URL:', window.location.href);
console.log('4. Market cards:', document.querySelectorAll('[class*="cursor-pointer"]').length);
console.log('5. Connect buttons:', document.querySelectorAll('button').length);

// Check Web3
if (window.ethereum) {
  window.ethereum.request({ method: 'eth_accounts' })
    .then(accounts => console.log('6. Connected accounts:', accounts.length))
    .catch(() => console.log('6. Not connected'));

  window.ethereum.request({ method: 'eth_chainId' })
    .then(chainId => console.log('7. Chain ID:', parseInt(chainId, 16)));
} else {
  console.log('6-7. MetaMask not installed');
}

// Check for errors
console.log('8. Console errors:', performance.getEntriesByType('navigation'));
console.log('=== End Diagnostic ===');
```

---

## Contact & Support

If issues persist after trying these steps:

1. **Capture Console Output:**
   - Open DevTools (F12)
   - Go to Console tab
   - Right-click → "Save as..."
   - Save console log

2. **Capture Network Tab:**
   - Open DevTools (F12)
   - Go to Network tab
   - Right-click → "Save all as HAR"

3. **Take Screenshot:**
   - Show what you see when test fails
   - Include browser console if errors present

4. **Report:**
   - Which test failed (Test 1 or Test 2)
   - What you clicked
   - What happened (or didn't happen)
   - Any error messages
   - Browser and version

---

## Expected vs Actual

### Test 1: Market Card Navigation

**Expected:**
1. Click market card on `/markets`
2. URL changes to `/app`
3. Trading page loads
4. Selected market shows in trading ticket

**If failing, you might see:**
- Click does nothing
- Console error appears
- Page reloads instead of navigating
- URL changes but page doesn't update

### Test 2: Wallet Connection

**Expected:**
1. Click "Connect Wallet" on `/app`
2. MetaMask popup appears
3. Select account and approve
4. Popup closes
5. Address shows in header
6. Balance displays

**If failing, you might see:**
- Button doesn't exist
- Click does nothing
- MetaMask doesn't popup
- Error: "MetaMask not installed"
- Connection rejected error

---

## Still Stuck?

Run the comprehensive diagnostic:

```bash
# In project directory
npm run build
# Check for errors in build output

# Start dev server fresh
npm start
# Check startup messages

# Check for port conflicts
netstat -ano | findstr :3000
```

Then provide:
- Build output
- Startup logs
- Browser console screenshot
- Description of what you tried
