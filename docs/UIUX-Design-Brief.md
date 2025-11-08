# UI/UX Design Brief  
**InflationMarket.com**  
**World’s first retail trading platform for inflation-linked derivatives**  
**Date:** November 03, 2025  
**Prepared for:** Product & Engineering teams  
**Version:** 1.0  

---

### 1. Executive Summary  
InflationMarket.com is a **non-custodial, decentralized, mobile-first web app** that lets everyday investors **trade inflation expectations** the same way they trade stocks or crypto.  
Users bet on CPI, PCE, breakeven rates, TIPS spreads, or regional inflation via simple **Up/Down binary contracts** and **inflation swaps**.  

The brief covers **two products**:  
1. Public-facing marketing website (conversion engine)  
2. Secure trading interface (dashboard + mobile PWA)  

Goal: **0-to-trade in <90 seconds**, **95 % task success on first visit**, **NPS > 70**.

---

### 2. Business & User Goals  
| Stakeholder | Goal |
|-------------|------|
| Company | 100 k MAU in Year-1, <2 % churn, <0.5 % fraud |
| Retail trader (25-45) | “I want to hedge my rent or bet on Fed moves without reading 50-page whitepapers” |
| Crypto-native user | Familiar limit-order UI + wallet connect |
| Institutional observer | Read-only analytics dashboard |

---

### 3. Core User Personas  
1. **Alex “Hedger”** – 32, rents in NYC, fears 2026 CPI spike → wants to lock 3 % hedge on $5 k.  
2. **Sam “DeFi Bro”** – 28, trades SOL perpetuals → wants 10x leverage on US breakeven rate.  
3. **Morgan “Macro Mom”** – 41, part-time options trader → needs charts + Fed calendar alerts.

---

### 4. User Journeys (High-Level)  
**Onboarding** → KYC (Plaid + Persona) → Deposit → Choose market → Place trade → Portfolio → Withdraw.  
**Funnel drop-off targets:** <20 % at KYC, <10 % at deposit.

---

### 5. Branding & Visual Language  
**Tone:** Confident, transparent, slightly irreverent (“Inflation won’t wait—so why should you?”)  
**Palette**  
- Primary: **Inflation Orange** #FF4D00  
- Success: **TIPS Green** #00B26E  
- Charts: **Breakeven Blue** #0066FF  
- Dark mode default (80 % users)  

**Typography**  
- Display: **Inter Display** (bold for headlines)  
- Body: **Inter** (400/500/600)  

**Icons**  
- Custom line icons: rising arrow = long inflation, shield = hedged position.

---

### 6. Marketing Website (inflationmarket.com)  
**Purpose:** Educate → Convert → Retain  

**Page structure**  
1. **Hero** (full-bleed video of CPI print → price exploding)  
   - Headline: “Trade Tomorrow’s Inflation Today”  
   - Sub: “Long or short CPI in 3 taps. Non-custodial. No jargon.”  
   - CTA: “Start Trading →” (opens lightbox KYC)  
2. **Live Markets Ticker** (real-time breakeven rates, TIPS yields)  
3. **How It Works** (3-step animated cards)  
4. **Proof Bar** (TVL, # users, “Backed by transparent, decentralized infrastructure”)  
5. **FAQ + Glossary** (accordion with micro-animations)  
6. **Footer** (SEC disclaimer, socials, blog)

**Mobile**  
- Sticky bottom bar: [Markets] [Trade] [Wallet]  
- Hero video → static gradient + Lottie arrow on <4G

**SEO/Performance**  
- Core Web Vitals: LCP <1.8 s, CLS 0  
- Schema: FAQPage, FinancialProduct

---

### 7. Trading Interface (app.inflationmarket.com)  
**Progressive Web App** – installable, offline portfolio view.

#### 7.1 Global Layout (Desktop & Mobile)  
```
┌─ Header ─┐  ┌─ Nav Rail (mobile hamburger) ┐
│ Logo  Balance  Notifications │
└──────────┘  └────────────────────────────┘
┌─ Main Pane ───────────────────────┐
│  Market Selector  │  Chart + Order │
│  Card Carousel    │  Ticket       │
└───────────────────────────────────┘
┌─ Bottom Sheet (mobile) ───────────┐
│  Order Ticket + Confirm Button    │
└───────────────────────────────────┘
```

#### 7.2 Key Screens  
1. **Markets Hub**  
   - Horizontal scroll cards:  
     - US CPI YoY  
     - 5-yr Breakeven  
     - Euro HICP  
     - Gold vs CPI  
   - Each card: sparkline + current payout (e.g., “Long @ 1.85x”)  
   - Filter chips: Trending | Hedging | Leveraged  

2. **Chart View**  
   - TradingView Lightweight Charts (custom orange theme)  
   - Overlays: Fed dots, CPI release calendar pins  
   - Pinch-zoom, long-press for crosshair  

3. **Order Ticket (Bottom Sheet)**  
   ```
   [↑ LONG]  [↓ SHORT]  @ 1.92x
   Stake $100 → $192 if CPI > 3.1 %
   Leverage slider 1–20x (with risk warning)
   [SET STOP]  [SET ALERT]
   Big Green [CONFIRM] button
   ```
   - One-tap “Copy Top Trader” (social proof)

4. **Portfolio**  
   - List + pie chart (net inflation exposure)  
   - “Hedged %” badge: “You’re 68 % protected vs 4 % CPI”  
   - Swipe to close position  

5. **Learn Tab**  
   - 15-second videos: “What is a breakeven rate?”  
   - Daily “Inflation Minute” push  

#### 7.3 Micro-interactions  
- Confetti on first winning trade  
- Haptic feedback on order confirm  
- Skeleton loaders shaped like rising bars

---

### 8. Information Architecture  
```
/
├─ markets/
│   └─ us-cpi
├─ trade/
├─ portfolio/
├─ learn/
└─ settings/
    └─ kyc-status
```

---

### 9. Accessibility & Compliance  
- WCAG 2.2 AA  
- Dynamic text scaling, screen-reader labels (“Long CPI at 1.92x payout”)  
- Real-time risk disclosures (pop-over on >5x leverage)  
- Session recording (optional) for dispute resolution

---

### 10. Tech & Design System  
- Framework: Next.js 15 + Tailwind + Radix primitives  
- State: TanStack Query + Zustand  
- Charts: TradingView LW + custom WebGL sparklines  
- Design tokens in Figma → Tailwind plugin (zero drift)

---

### 11. KPI Dashboard for Design Team  
| Metric | Target |
|--------|--------|
| Onboarding completion | 80 % |
| Time-to-first-trade | <120 s |
| Chart interaction rate | 70 % |
| Error rate (failed orders) | <1 % |
| CSAT after trade | 4.6/5 |

---

### 12. Next Steps  
1. **Week 1:** Mood-board & user interviews (10 hedgers)  
2. **Week 2:** Lo-fi wireframes (Figma)  
3. **Week 3:** High-fidelity prototype + usability test (5 users)  
4. **Week 4:** Handoff to dev + Zeplin sync  

Let’s make inflation **fun** to trade.  
Questions → design@inflationmarket.com  

---  

**End of Brief**  
(16 pages when printed with mockups)
