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
  const [selectedSector, setSelectedSector] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [newsData, prices] = await Promise.all([
        getAggregatedNews({ sector: selectedSector === 'All' ? null : selectedSector }),
        getMarketData()
      ]);
      setNews(newsData);
      setMarketData(prices);
      setLoading(false);
    };
    fetchData();
  }, [selectedSector]);

  return (
    <div className="app-layout" style={{ gridTemplateColumns: 'var(--sidebar-width) 1fr 340px' }}>
      {/* Sidebar - Navigation */}
      <aside className="sidebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2.5rem' }}>
          <div style={{ background: 'var(--accent-blue)', color: 'white', padding: '4px', borderRadius: '4px' }}>
            <TrendingUp size={20} />
          </div>
          <span className="text-bold" style={{ fontSize: '1rem', letterSpacing: '0.05em' }}>MARKET STRUCTURE</span>
          <span style={{ fontSize: '9px', background: 'var(--bg-tertiary)', padding: '2px 4px', borderRadius: '2px' }}>V2</span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <div className="text-xs text-muted text-bold" style={{ textTransform: 'uppercase', marginBottom: '0.75rem' }}>Research</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <MenuItem icon={<BarChart3 size={16} />} label="Market Overview" active={selectedSector === 'All'} onClick={() => setSelectedSector('All')} />
              <MenuItem icon={<Newspaper size={16} />} label="Intelligence Feed" />
              <MenuItem icon={<Layers size={16} />} label="Ecosystems" />
            </div>
          </div>

          <div>
            <div className="text-xs text-muted text-bold" style={{ textTransform: 'uppercase', marginBottom: '0.75rem' }}>Sectors</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {['Infrastructure', 'Gaming', 'DeFi', 'AI', 'Regulatory'].map(sector => (
                <div
                  key={sector}
                  className={`text-sm ${selectedSector === sector ? 'active-sector' : ''}`}
                  onClick={() => setSelectedSector(sector)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    color: selectedSector === sector ? 'var(--accent-blue)' : 'var(--text-secondary)',
                    background: selectedSector === sector ? 'rgba(0,122,255,0.05)' : 'transparent'
                  }}
                >
                  {sector}
                </div>
              ))}
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="ticker-strip" style={{ margin: '-1.5rem -1.5rem 1.5rem -1.5rem' }}>
          {marketData.slice(0, 5).map(coin => (
            <div key={coin.symbol} style={{ display: 'flex', gap: '0.5rem' }}>
              <span className="text-muted">{coin.symbol}</span>
              <span>${coin.price.toLocaleString()}</span>
              <span style={{ color: coin.change > 0 ? 'var(--accent-green)' : 'var(--accent-red)' }}>{coin.change}%</span>
            </div>
          ))}
        </div>

        <header style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Professional Intelligence Feed</h1>
          <p className="text-xs text-muted">Aggregating 10+ sources for institutional alpha.</p>
        </header>

        {/* Market Matrix Grid */}
        <section style={{ marginBottom: '2.5rem' }}>
          <div className="text-xs text-bold text-muted" style={{ marginBottom: '1rem', textTransform: 'uppercase' }}>Market Performance Matrix</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '0.75rem' }}>
            {marketData.map(coin => (
              <div key={coin.symbol} className="card" style={{ padding: '0.75rem', marginBottom: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span className="text-bold text-sm">{coin.symbol}</span>
                  <span className="text-xs" style={{ color: coin.change > 0 ? 'var(--accent-green)' : 'var(--accent-red)' }}>{coin.change}%</span>
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 600 }}>${coin.price > 1000 ? coin.price.toLocaleString() : coin.price}</div>
                <div className="text-xs text-muted" style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                  <span>MCap: {coin.cap}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="text-xs text-bold text-muted" style={{ marginBottom: '1rem', textTransform: 'uppercase' }}>Latest Intelligence Events</div>
          {loading ? (
            <div className="text-muted text-sm">Synchronizing data sources...</div>
          ) : (
            news.map(item => (
              <div key={item.id} className="news-item">
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span className={`sentiment-tag sentiment-${item.sentiment}`}>{item.sentiment}</span>
                  <span className="text-xs text-bold" style={{ color: 'var(--accent-blue)' }}>{item.currencies.join(', ')}</span>
                  <span className="text-xs text-muted" style={{ marginLeft: 'auto' }}>{item.published_at.split('T')[1].slice(0, 5)}</span>
                </div>
                <h3 className="text-sm" style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{item.title}</h3>
                <p className="text-xs text-muted">{item.summary}</p>
              </div>
            ))
          )}
        </section>
      </main>

      {/* Right Panel - Advanced Intelligence */}
      <aside className="right-panel">
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
