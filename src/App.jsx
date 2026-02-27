import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Newspaper,
  Layers,
  Search,
  Bell,
  ArrowUpRight,
  Clock,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  MoreHorizontal,
  Info
} from 'lucide-react';
import { getAggregatedNews, getMarketData } from './services/newsService';

function App() {
  const [news, setNews] = useState([]);
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ currency: null, sentiment: null });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [newsData, prices] = await Promise.all([
        getAggregatedNews(filter),
        getMarketData()
      ]);
      setNews(newsData);
      setMarketData(prices);
      setLoading(false);
    };
    fetchData();
  }, [filter]);

  return (
    <div className="app-layout">
      {/* Sidebar - Navigation */}
      <aside className="sidebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2.5rem' }}>
          <div style={{ background: 'var(--accent-blue)', color: 'white', padding: '4px', borderRadius: '4px' }}>
            <BarChart3 size={20} />
          </div>
          <span className="text-bold" style={{ fontSize: '1.25rem' }}>MESSARI</span>
          <span style={{ fontSize: '10px', background: 'var(--bg-tertiary)', padding: '2px 4px' }}>PRO</span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <div className="text-xs text-muted text-bold" style={{ textTransform: 'uppercase', marginBottom: '0.75rem' }}>Intelligence</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <MenuItem icon={<Newspaper size={16} />} label="Curated News" active />
              <MenuItem icon={<Layers size={16} />} label="Layer Overviews" />
              <MenuItem icon={<TrendingUp size={16} />} label="Market Indicators" />
            </div>
          </div>

          <div>
            <div className="text-xs text-muted text-bold" style={{ textTransform: 'uppercase', marginBottom: '0.75rem' }}>Watchlists</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {['BTC', 'ETH', 'SOL'].map(coin => (
                <div key={coin} className="text-sm" style={{ padding: '6px 8px', borderRadius: '4px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{coin}</span>
                  <ChevronRight size={14} className="text-muted" />
                </div>
              ))}
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content - News Feed */}
      <main className="main-content">
        <div className="ticker-strip" style={{ margin: '-1.5rem -1.5rem 1.5rem -1.5rem' }}>
          {marketData.map(coin => (
            <div key={coin.symbol} style={{ display: 'flex', gap: '0.5rem' }}>
              <span className="text-muted">{coin.symbol}</span>
              <span>${coin.price.toLocaleString()}</span>
              <span style={{ color: coin.change > 0 ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                {coin.change > 0 ? '+' : ''}{coin.change}%
              </span>
            </div>
          ))}
        </div>

        <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem' }}>Intelligence Feed</h1>
            <p className="text-sm text-muted">A curated stream of institutional-grade crypto insights.</p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="card" style={{ padding: '8px 12px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Search size={14} /> Search
            </button>
            <button className="card" style={{ padding: '8px 12px', fontSize: '0.75rem', background: 'var(--accent-blue)', color: 'white', border: 'none' }}>
              Filter
            </button>
          </div>
        </header>

        <section>
          {loading ? (
            <div className="text-muted text-sm">Loading intelligence...</div>
          ) : (
            news.map(item => (
              <div key={item.id} className="news-item">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <span className={`sentiment-tag sentiment-${item.sentiment}`}>{item.sentiment}</span>
                    <span className="text-xs text-bold" style={{ color: 'var(--accent-blue)' }}>{item.currencies.join(', ')}</span>
                  </div>
                  <span className="text-xs text-muted">{new Date(item.published_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <h3 className="text-sm" style={{ marginBottom: '0.5rem', fontWeight: 700 }}>{item.title}</h3>
                <p className="text-xs text-muted" style={{ marginBottom: '0.75rem' }}>{item.summary}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'var(--bg-tertiary)', fontSize: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.source_name[0]}</div>
                    <span className="text-xs text-muted">{item.source_name}</span>
                  </div>
                  <ExternalLink size={12} className="text-muted" style={{ cursor: 'pointer' }} />
                </div>
              </div>
            ))
          )}
        </section>
      </main>

      {/* Right Panel - Context/Market Data */}
      <aside className="right-panel">
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 className="text-sm text-bold" style={{ marginBottom: '1rem' }}>Asset Performance</h2>
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span className="text-sm">Dominance</span>
              <Info size={14} className="text-muted" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <ProgessBar label="BTC" value={54.2} color="var(--accent-gold)" />
              <ProgessBar label="ETH" value={18.5} color="#627eea" />
              <ProgessBar label="Others" value={27.3} color="var(--text-secondary)" />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-sm text-bold" style={{ marginBottom: '1rem' }}>Trending Topics</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {['Staking', 'L2 Summer', 'Halving', 'AI Agents', 'SEC', 'ETFs'].map(tag => (
              <span key={tag} className="text-xs" style={{ padding: '4px 8px', border: '1px solid var(--border-color)', borderRadius: '2px' }}>#{tag}</span>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}

function MenuItem({ icon, label, active }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '8px 12px',
      borderRadius: '4px',
      cursor: 'pointer',
      background: active ? 'rgba(0, 122, 255, 0.1)' : 'transparent',
      color: active ? 'var(--accent-blue)' : 'var(--text-secondary)',
    }}>
      {icon}
      <span className="text-sm text-bold">{label}</span>
    </div>
  );
}

function ProgessBar({ label, value, color }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '4px' }}>
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div style={{ width: '100%', height: '4px', background: 'var(--bg-tertiary)', borderRadius: '2px' }}>
        <div style={{ width: `${value}%`, height: '100%', background: color, borderRadius: '2px' }}></div>
      </div>
    </div>
  );
}

export default App;
