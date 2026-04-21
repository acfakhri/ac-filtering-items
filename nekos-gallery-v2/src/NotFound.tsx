import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div style={{
      minHeight: 'calc(100vh - 64px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      padding: '2rem',
    }}>
      <div style={{
        fontFamily: 'Syne, sans-serif',
        fontSize: '96px',
        fontWeight: 800,
        color: 'var(--text-muted)',
        lineHeight: 1,
        letterSpacing: '-0.04em',
      }}>
        404
      </div>
      <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)' }}>
        Page not found
      </h2>
      <p style={{ fontSize: '14px', color: 'var(--text-muted)', textAlign: 'center', maxWidth: '300px' }}>
        Halaman yang kamu cari sedang dalam masa pengembangan atau tidak ada.
      </p>
      <Link
        to="/"
        style={{
          marginTop: '8px',
          padding: '9px 24px',
          background: 'var(--accent)',
          color: '#fff',
          borderRadius: '8px',
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: 500,
        }}
      >
        Kembali ke Gallery
      </Link>
    </div>
  );
};

export default NotFoundPage;
