/**
 * newsService.js
 * Aggregates news from multiple sources (CryptoPanic, NewsAPI, Coingecko)
 */

const MOCK_NEWS = [
    {
        id: '1',
        source: 'CryptoPanic',
        sentiment: 'bullish',
        title: 'NVIDIA Partners with Solana for Decentralized GPU Rendering',
        summary: 'The partnership aims to leverage Solana\'s high-speed network for distributed computing.',
        url: '#',
        published_at: '2026-02-27T18:00:00Z',
        currencies: ['SOL'],
        source_name: 'Coindesk',
        sector: 'Infrastructure'
    },
    {
        id: '2',
        source: 'NewsAPI',
        sentiment: 'neutral',
        title: 'SEC Reviewing New Ethereum ETF Applications',
        summary: 'Blackrock and Fidelity submit updated filings for ETH spot ETFs with staking components.',
        url: '#',
        published_at: '2026-02-27T17:30:00Z',
        currencies: ['ETH'],
        source_name: 'Reuters',
        sector: 'Regulatory'
    },
    {
        id: '3',
        source: 'CryptoPanic',
        sentiment: 'bearish',
        title: 'Bitcoin Mining Difficulty Hits New Record High',
        summary: 'Smaller miners struggle as hashrate surges ahead of the next halving cycle.',
        url: '#',
        published_at: '2026-02-27T16:45:00Z',
        currencies: ['BTC'],
        source_name: 'TheBlock',
        sector: 'Infrastructure'
    },
    {
        id: '4',
        source: 'Coingecko',
        sentiment: 'bullish',
        title: 'Layer 0 Ecosystem Sees 40% Increase in Interoperability Volume',
        summary: 'Polkadot and Cosmos leading the cross-chain transaction growth this quarter.',
        url: '#',
        published_at: '2026-02-27T16:00:00Z',
        currencies: ['DOT', 'ATOM'],
        source_name: 'Messari Intelligence',
        sector: 'Interoperability'
    },
    {
        id: '5',
        source: 'Blockworks',
        sentiment: 'bullish',
        title: 'Arbitrum DAO Approves $50M Incentive Program for Gaming Protocols',
        summary: 'The program aims to bootstrap the gaming ecosystem on the leading Ethereum Layer 2.',
        url: '#',
        published_at: '2026-02-27T15:30:00Z',
        currencies: ['ARB'],
        source_name: 'Blockworks',
        sector: 'Gaming'
    },
    {
        id: '6',
        source: 'CoinTelegraph',
        sentiment: 'neutral',
        title: 'Chainlink Functions GA Release Now Live on Mainnet',
        summary: 'Developers can now connect any API to smart contracts using decentralized compute.',
        url: '#',
        published_at: '2026-02-27T15:00:00Z',
        currencies: ['LINK'],
        source_name: 'CoinTelegraph',
        sector: 'Infrastructure'
    }
];

export const getAggregatedNews = async (filter = {}) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    let news = [...MOCK_NEWS];

    if (filter.currency) {
        news = news.filter(n => n.currencies.includes(filter.currency));
    }

    if (filter.sentiment) {
        news = news.filter(n => n.sentiment === filter.sentiment);
    }

    return news;
};

export const getMarketData = async () => {
    // Mock ticker data for a wider range of assets
    return [
        { symbol: 'BTC', price: 98452.12, change: +1.2, cap: '1.9T', vol: '45B' },
        { symbol: 'ETH', price: 3452.45, change: -0.5, cap: '410B', vol: '12B' },
        { symbol: 'SOL', price: 142.89, change: +5.7, cap: '63B', vol: '6B' },
        { symbol: 'BNB', price: 612.33, change: +0.1, cap: '94B', vol: '1B' },
        { symbol: 'ARB', price: 1.85, change: -2.3, cap: '2.3B', vol: '400M' },
        { symbol: 'LINK', price: 18.25, change: +3.4, cap: '10.5B', vol: '800M' },
        { symbol: 'DOT', price: 8.45, change: +2.3, cap: '12B', vol: '300M' },
        { symbol: 'RENDER', price: 10.12, change: +12.5, cap: '3.9B', vol: '500M' },
        { symbol: 'TAO', price: 580.45, change: +4.2, cap: '3.8B', vol: '100M' },
        { symbol: 'FET', price: 2.15, change: +8.1, cap: '1.8B', vol: '200M' },
    ];
}
