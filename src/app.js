import React, { createContext, useContext, useState, Suspense, lazy } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ToastProvider } from './components/toast/ToastProvider';
import { Web3Context } from './contexts/Web3Context';
import LandingPageComp from './pages/LandingPage';
import TradingAppPageComp from './pages/TradingAppPage';
const AboutPage = lazy(() => import('./pages/AboutPage'));
const HowItWorksPage = lazy(() => import('./pages/HowItWorksPage'));
const WhitepaperPage = lazy(() => import('./pages/WhitepaperPage'));
const RoadmapPage = lazy(() => import('./pages/RoadmapPage'));

const FAQPage = lazy(() => import('./components/pages/FAQPage'));
const CompliancePage = lazy(() => import('./components/pages/CompliancePage'));

const AppStateContext = createContext(null);

export const AppStateProvider = ({ children }) => {
  const web3 = useContext(Web3Context);
  const [selectedMarket, setSelectedMarket] = useState('inflation');
  const [positions, setPositions] = useState([]);

  const account = {
    address: web3?.account || null,
    isConnected: web3?.isConnected || false,
    balance: 0,
  };

  const connect = async () => web3?.connectWallet?.();
  const disconnect = () => web3?.disconnectWallet?.();

  return (
    <AppStateContext.Provider value={{
      account,
      selectedMarket,
      setSelectedMarket,
      positions,
      setPositions,
      connect,
      disconnect,
      isLoading: web3?.isConnecting || false,
      web3,
    }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
};

export default function InflationMarketApp() {
  return (
    <ToastProvider>
      <AppStateProvider>
        <Suspense fallback={<div className="text-white p-6">Loading...</div>}>
          <RoutedApp />
        </Suspense>
      </AppStateProvider>
    </ToastProvider>
  );
}

const WithNavigate = ({ Component }) => {
  const navigate = useNavigate();
  const onNavigate = (page) => {
    const map = {
      landing: '/',
      app: '/app',
      about: '/about',
      'how-it-works': '/how-it-works',
      whitepaper: '/whitepaper',
      roadmap: '/roadmap',
      faq: '/faq',
      compliance: '/compliance',
    };
    navigate(map[page] || '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return <Component onNavigate={onNavigate} />;
};

const RoutedApp = () => (
  <Routes>
    <Route path="/" element={<WithNavigate Component={LandingPageComp} />} />
    <Route path="/app" element={<WithNavigate Component={TradingAppPageComp} />} />
    <Route path="/faq" element={<WithNavigate Component={FAQPage} />} />
    <Route path="/compliance" element={<WithNavigate Component={CompliancePage} />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/how-it-works" element={<HowItWorksPage />} />
    <Route path="/whitepaper" element={<WhitepaperPage />} />
    <Route path="/roadmap" element={<RoadmapPage />} />
    <Route path="*" element={<WithNavigate Component={LandingPageComp} />} />
  </Routes>
);

// Pages moved to src/pages/* and lazy-loaded above
