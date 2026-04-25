import React from 'react';

interface HeaderProps {
  totalCount: number;
  filteredCount: number;
}

const Header: React.FC<HeaderProps> = ({ totalCount, filteredCount }) => {
  return (
    <header style={{
      background: 'rgba(10,10,15,0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '0 2rem',
    }}>
      <div style={{
        maxWidth: '1600px',
        margin: '0 auto',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: 'var(--accent)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
            </svg>
          </div>
          <div>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Ac Filtering Apps Gallery
            </h1>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '-1px' }}>NekosAPI v4</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontSize: '13px',
            color: 'var(--text-secondary)',
          }}>
            {filteredCount.toLocaleString()} <span style={{ color: 'var(--text-muted)' }}>/ {totalCount.toLocaleString()} images</span>
          </span>
          <a
            href="https://nekosapi.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginLeft: '12px',
              fontSize: '12px',
              color: 'var(--accent)',
              textDecoration: 'none',
              border: '1px solid var(--accent-soft)',
              padding: '5px 12px',
              borderRadius: '20px',
              background: 'var(--accent-soft)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            API Docs
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
