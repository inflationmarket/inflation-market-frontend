export const CONFIG = {
  domain: 'Inflationmarket.com',
  contracts: {
    market: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    usdc: '0x8FB1E3fC51F3b789dED7557E680551d93Ea9d892',
  },
  social: {
    twitter: 'https://twitter.com/inflationmarket',
    discord: 'https://discord.gg/inflationmarket',
    github: 'https://github.com/inflationmarket',
  },
};

export const MARKETS = [
  {
    id: 'inflation',
    name: 'Inflation',
    description: 'U.S. Consumer Price Index',
    price: 101.25,
    change24h: 0.75,
    fundingRate: 0.023,
    fundingRateAPR: 8.5,
    volume24h: 2400000,
    openInterest: 8700000,
  },
  {
    id: 'housing',
    name: 'Housing',
    description: 'S&P Case-Shiller National Index',
    price: 98.42,
    change24h: -0.34,
    fundingRate: -0.015,
    fundingRateAPR: -4.2,
    volume24h: 1200000,
    openInterest: 3200000,
  },
  {
    id: 'gdp',
    name: 'GDP Growth',
    description: 'Real GDP Growth Rate',
    price: 102.15,
    change24h: 1.20,
    fundingRate: 0.041,
    fundingRateAPR: 12.3,
    volume24h: 800000,
    openInterest: 2100000,
  },
];

