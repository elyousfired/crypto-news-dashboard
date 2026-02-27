import React, { useState } from 'react';
import { 
  TrendingUp, 
  Newspaper, 
  Layers, 
  Zap, 
  Search, 
  Bell, 
  Plus,
  ArrowUpRight,
  Clock,
  ExternalLink
} from 'lucide-react';

const TOKENS = [
  { id: 'btc', name: 'Bitcoin', symbol: 'BTC', color: 'var(--accent-btc)', layer: 'L1' },
  { id: 'eth', name: 'Ethereum', symbol: 'ETH', color: 'var(--accent-eth)', layer: 'L1' },
  { id: 'sol', name: 'Solana', symbol: 'SOL', color: 'var(--accent-sol)', layer: 'L1' },
  { id: 'bnb', name: 'BNB', symbol: 'BNB', color: 'var(--accent-bnb)', layer: 'L1' },
];

const LAYERS = ['L0', 'L1', 'L2'];

const INITIAL_NEWS = [
  {
    id: 1,
    token: 'BTC',
    title: 'Bitcoin Hits New All-Time High Above $100k',
    summary: 'Institutional demand continues to drive Bitcoin prices as ETFs see record inflows.',
    time: '2h ago',
    category: 'L1'
  },
  {
    id: 2,
    token: 'SOL',
    title: 'Solana Network Hits Record Transaction Throughput',
    summary: 'The network handled over 65,000 TPS during the peak trading session today.',
    time: '4h ago',
    category: 'L1'
  },
  {
    id: 3,
    token: 'ETH',
    title: 'Ethereum Layer 2 Usage Surges 300% in Q1',
    summary: 'Arbitrum and Optimism leading the charge in the L2 scaling summer.',
    time: '6h ago',
    category: 'L2'
  }
];

function App() {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedLayer, setSelectedLayer] = useState('All');

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="glass-card" style={{ padding: '1.5rem', height: 'max-content' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          <div style={{ background: 'var(--accent-purple)', padding: '8px', borderRadius: '12px' }}>
            <TrendingUp size={20} />
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>CryptoHub</h2>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.05em' }}>Categories</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <NavItem icon={<Newspaper size={18} />} label="All News" active={activeTab === 'All'} onClick={() => setActiveTab('All')} />
              <NavItem icon={<Zap size={18} />} label="Market Trends" active={activeTab === 'Market'} onClick={() => setActiveTab('Market')} />
            </div>
          </div>

          <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.05em' }}>Layers</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {['All', ...LAYERS].map(layer => (
                <button 
                  key={layer}
                  onClick={() => setSelectedLayer(layer)}
                  className="glass-card"
                  style={{ 
                    padding: '8px 12px', 
                    fontSize: '0.75rem', 
                    cursor: 'pointer',
                    background: selectedLayer === layer ? 'var(--accent-purple)' : 'var(--glass-bg)',
                    borderColor: selectedLayer === layer ? 'var(--accent-purple)' : 'var(--glass-border)'
                  }}
                >
                  {layer}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Header Stats */}
        <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
          {TOKENS.map(token => (
            <div key={token.id} className={`glass-card glow-${token.id}`} style={{ padding: '1rem', minWidth: '160px', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{token.symbol}</span>
                <TrendingUp size={16} color={token.color} />
              </div>
              <div style={{ fontSize: '1.125rem', fontWeight: 700 }}>$---.--</div>
              <div style={{ fontSize: '0.75rem', color: '#14f195', marginTop: '0.25rem' }}>+5.2%</div>
            </div>
          ))}
        </div>

        {/* Search & Actions */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div className="glass-card" style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 1rem' }}>
            <Search size={18} color="var(--text-secondary)" />
            <input 
              type="text" 
              placeholder="Search projects, news, layers..." 
              style={{ 
                background: 'transparent', 
                border: 'none', 
                outline: 'none', 
                color: 'white', 
                padding: '12px',
                width: '100%',
                fontSize: '0.875rem'
              }} 
            />
          </div>
          <button className="glass-card" style={{ padding: '12px', cursor: 'pointer' }}><Bell size={20} /></button>
          <button className="glass-card" style={{ padding: '12px', cursor: 'pointer', background: 'var(--accent-purple)', borderColor: 'var(--accent-purple)' }}><Plus size={20} /></button>
        </div>

        {/* News Feed */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Hot News</h3>
            <button style={{ background: 'transparent', border: 'none', color: 'var(--accent-purple)', cursor: 'pointer', fontSize: '0.875rem' }}>View All</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {INITIAL_NEWS.filter(n => selectedLayer === 'All' || n.category === selectedLayer).map(item => (
              <div key={item.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', gap: '1.5rem' }}>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span className="token-tag" style={{ border: '1px solid var(--accent-purple)', color: 'var(--accent-purple)' }}>{item.token}</span>
                      <span className="token-tag" style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--text-secondary)' }}>{item.category}</span>
                    </div>
                    <h4 style={{ fontSize: '1.125rem', fontWeight: 600, lineHeight: 1.4 }}>{item.title}</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>{item.summary}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={12} /> {item.time}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}><ExternalLink size={12} /> Source</div>
                    </div>
                 </div>
                 <div style={{ width: '120px', height: '100px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Newspaper size={40} opacity={0.2} />
                 </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <div 
      onClick={onClick}
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.75rem', 
        padding: '12px 16px', 
        borderRadius: '12px',
        cursor: 'pointer',
        background: active ? 'rgba(153, 69, 255, 0.1)' : 'transparent',
        color: active ? 'var(--accent-purple)' : 'var(--text-secondary)',
        transition: 'all 0.2s'
      }}
      className="nav-item-hover"
    >
      {icon}
      <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{label}</span>
    </div>
  );
}

export default App;
