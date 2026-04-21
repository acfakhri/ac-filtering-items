import React, { useState } from 'react';
import { Item } from './DataType';

interface CardProps {
  item: Item;
  onClick: () => void;
}

const ratingColor: Record<string, string> = {
  safe: '#22c55e',
  suggestive: '#f59e0b',
  borderline: '#f97316',
  explicit: '#ef4444',
};

const rgbToHex = (r: number, g: number, b: number) =>
  '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');

const GalleryCard: React.FC<CardProps> = ({ item, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const dominantHex = item.color_dominant?.length >= 3
    ? rgbToHex(item.color_dominant[0], item.color_dominant[1], item.color_dominant[2])
    : '#1c1c28';

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${hovered ? 'var(--border-hover)' : 'var(--border)'}`,
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        transform: hovered ? 'translateY(-3px)' : 'none',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', background: dominantHex + '55', aspectRatio: '4/3', overflow: 'hidden' }}>
        {!imgError ? (
          <img
            src={item.url}
            alt="Gallery"
            onError={() => setImgError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
              transform: hovered ? 'scale(1.04)' : 'scale(1)',
              display: 'block',
            }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '12px', flexDirection: 'column', gap: '6px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <span>No preview</span>
          </div>
        )}

        {/* Rating badge */}
        <span style={{
          position: 'absolute', top: '8px', left: '8px',
          background: `${ratingColor[item.rating] || '#888'}cc`,
          backdropFilter: 'blur(4px)',
          color: '#fff',
          fontSize: '10px',
          fontWeight: 600,
          padding: '2px 8px',
          borderRadius: '20px',
          textTransform: 'capitalize',
        }}>{item.rating}</span>

        {/* Hover overlay */}
        {hovered && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)',
          }} />
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '10px 12px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {/* Artist */}
        {item.artist_name && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{
              width: '18px', height: '18px', borderRadius: '50%',
              background: 'var(--accent)', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '9px', color: '#fff', fontWeight: 600, flexShrink: 0,
            }}>
              {item.artist_name.charAt(0).toUpperCase()}
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {item.artist_name}
            </span>
          </div>
        )}

        {/* Color Palette */}
        {item.color_palette?.length > 0 && (
          <div style={{ display: 'flex', gap: '3px' }}>
            {item.color_palette.slice(0, 7).map((c, i) => {
              if (!c || c.length < 3) return null;
              return (
                <div key={i} style={{
                  width: '14px', height: '14px', borderRadius: '3px',
                  background: rgbToHex(c[0], c[1], c[2]),
                  border: '1px solid rgba(255,255,255,0.06)',
                  flexShrink: 0,
                }} />
              );
            })}
          </div>
        )}

        {/* Tags */}
        {item.tags?.length > 0 && (
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {item.tags.slice(0, 3).map((tag, i) => (
              <span key={i} style={{
                fontSize: '10px',
                padding: '2px 7px',
                borderRadius: '20px',
                background: 'var(--bg-secondary)',
                color: 'var(--text-muted)',
                border: '1px solid var(--border)',
                whiteSpace: 'nowrap',
              }}>{tag.replace(/_/g, ' ')}</span>
            ))}
            {item.tags.length > 3 && (
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', padding: '2px 0' }}>+{item.tags.length - 3}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryCard;
