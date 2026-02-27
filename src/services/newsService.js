/**
 * newsService.js
 * Aggregates news from multiple sources (CryptoPanic, NewsAPI, Coingecko)
 */

const MOCK_NEWS = [
    {
        id: '1',
        source: 'CryptoPanic',
        sentiment: 'bullish',
        title: 'NVIDIA Partners with Solana for Decentrailized GPU Rendering',
        summary: 'The partnership aims to leverage Solana\'s high-speed network for distributed computing.',
        url: '#',
        published_at: '2026-02-27T18:00:00Z',
        currencies: ['SOL'],
        source_name: 'Coindesk'
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
        source_name: 'Reuters'
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
        source_name: 'TheBlock'
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
        source_name: 'Messari Intelligence'
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
    // Mock ticker data
    return [
        { symbol: 'BTC', price: 98452.12, change: +1.2 },
        { symbol: 'ETH', price: 3452.45, change: -0.5 },
        { symbol: 'SOL', price: 142.89, change: +5.7 },
        { symbol: 'BNB', price: 612.33, change: +0.1 },
        { symbol: 'DOT', price: 8.45, change: +2.3 },
    ];
}
