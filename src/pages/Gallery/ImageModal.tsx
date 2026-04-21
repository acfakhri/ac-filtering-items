import React, { useEffect } from 'react';
import { Item } from './DataType';

interface ModalProps {
  item: Item | null;
  onClose: () => void;
}

const ratingColor: Record<string, string> = {
  safe: '#22c55e',
  suggestive: '#f59e0b',
  borderline: '#f97316',
  explicit: '#ef4444',
};

const rgbToHex = (r: number, g: number, b: number) =>
  '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');

const ImageModal: React.FC<ModalProps> = ({ item, onClose }) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = item ? 'hidden' : '';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose, item]);

  if (!item) return null;

  const dominantHex = item.color_dominant?.length >= 3
    ? rgbToHex(item.color_dominant[0], item.color_dominant[1], item.color_dominant[2])
    : '#7c6aff';

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.88)',
        backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '860px',
          maxHeight: '90vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <span style={{ fontSize: '12px', fontFamily: 'monospace', color: 'var(--text-muted)' }}>ID #{item.id}</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px', display: 'flex' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Image panel */}
          <div style={{ flex: '0 0 55%', background: dominantHex + '22', position: 'relative', overflow: 'hidden' }}>
            <img
              src={item.url}
              alt="Gallery item"
              style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
            />
          </div>

          {/* Info panel */}
          <div style={{ flex: 1, padding: '1.25rem', overflow: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* Rating */}
            <div>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Rating</p>
              <span style={{
                background: `${ratingColor[item.rating] ?? '#888'}22`,
                color: ratingColor[item.rating] ?? '#888',
                border: `1px solid ${ratingColor[item.rating] ?? '#888'}44`,
                fontSize: '13px', fontWeight: 500,
                padding: '5px 14px', borderRadius: '20px',
                textTransform: 'capitalize',
                display: 'inline-block',
              }}>{item.rating}</span>
            </div>

            {/* Artist */}
            {item.artist_name && (
              <div>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Artist</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: 'var(--accent)', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '14px', color: '#fff', fontWeight: 600, flexShrink: 0,
                  }}>
                    {item.artist_name.charAt(0).toUpperCase()}
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>{item.artist_name}</span>
                </div>
              </div>
            )}

            {/* Color Palette */}
            {item.color_palette?.length > 0 && (
              <div>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Color Palette</p>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div title="Dominant" style={{
                    width: '32px', height: '32px', borderRadius: '8px',
                    background: dominantHex, border: '2px solid rgba(255,255,255,0.15)',
                    flexShrink: 0,
                  }} />
                  {item.color_palette.slice(0, 8).map((c, i) => {
                    if (!c || c.length < 3) return null;
                    const hex = rgbToHex(c[0], c[1], c[2]);
                    return (
                      <div key={i} title={hex} style={{
                        width: '22px', height: '22px', borderRadius: '5px',
                        background: hex, border: '1px solid rgba(255,255,255,0.08)',
                      }} />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tags */}
            {item.tags?.length > 0 && (
              <div>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Tags ({item.tags.length})</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {item.tags.map((tag, i) => (
                    <span key={i} style={{
                      fontSize: '12px',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      background: 'var(--bg-secondary)',
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border)',
                    }}>{tag.replace(/_/g, ' ')}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Source */}
            {item.source_url && (
              <div>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Source</p>
                <a href={item.source_url} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: '12px', color: 'var(--accent)', wordBreak: 'break-all' }}>
                  {item.source_url}
                </a>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1, textAlign: 'center',
                  padding: '9px',
                  background: 'var(--accent)',
                  color: '#fff',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: 500,
                }}
              >
                Buka Gambar Asli ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
