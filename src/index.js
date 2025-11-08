import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import InflationMarketApp from './app';
import { MarketHistoryProvider } from './contexts/MarketHistoryContext';
import { Web3Provider } from './contexts/Web3Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Web3Provider>
      <MarketHistoryProvider>
        <BrowserRouter>
          <InflationMarketApp />
        </BrowserRouter>
      </MarketHistoryProvider>
    </Web3Provider>
  </React.StrictMode>
);
