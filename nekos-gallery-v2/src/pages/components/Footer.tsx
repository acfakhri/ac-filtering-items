import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '2rem',
      textAlign: 'center',
    }}>
      <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
        &copy; 2024 Ac Fakhri &mdash; Powered by{' '}
        <a href="https://nekosapi.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
          NekosAPI
        </a>
      </p>
    </footer>
  );
};

export default Footer;
