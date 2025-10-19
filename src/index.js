import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import InflationMarketApp from './app';
import { Web3Provider } from './contexts/Web3Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Web3Provider>
      <InflationMarketApp />
    </Web3Provider>
  </React.StrictMode>
);
