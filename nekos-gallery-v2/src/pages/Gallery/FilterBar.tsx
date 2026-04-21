import React from 'react';
import { RatingFilter, SortOption, ViewMode } from './DataType';

interface FilterBarProps {
  rating: RatingFilter;
  sort: SortOption;
  viewMode: ViewMode;
  searchTag: string;
  onRatingChange: (r: RatingFilter) => void;
  onSortChange: (s: SortOption) => void;
  onViewModeChange: (v: ViewMode) => void;
  onSearchTagChange: (t: string) => void;
}

const ratingConfig: Record<RatingFilter, { label: string; color: string }> = {
  all:        { label: 'All',        color: 'var(--accent)' },
  safe:       { label: 'Safe',       color: '#22c55e' },
  suggestive: { label: 'Suggestive', color: '#f59e0b' },
  borderline: { label: 'Borderline', color: '#f97316' },
  explicit:   { label: 'Explicit',   color: '#ef4444' },
};

const FilterBar: React.FC<FilterBarProps> = ({
  rating, sort, viewMode, searchTag,
  onRatingChange, onSortChange, onViewModeChange, onSearchTagChange,
}) => {
  const ratingBtn = (r: RatingFilter): React.CSSProperties => {
    const active = rating === r;
    const color = ratingConfig[r].color;
    return {
      padding: '5px 14px',
      borderRadius: '20px',
      border: `1px solid ${active ? color : 'var(--border)'}`,
      background: active ? color + '22' : 'transparent',
      color: active ? color : 'var(--text-secondary)',
      fontSize: '13px',
      fontWeight: active ? 500 : 400,
      cursor: 'pointer',
      transition: 'all 0.15s ease',
      whiteSpace: 'nowrap' as const,
    };
  };

  const viewBtn = (v: ViewMode): React.CSSProperties => ({
    background: viewMode === v ? 'var(--accent-soft)' : 'transparent',
    color: viewMode === v ? 'var(--accent)' : 'var(--text-muted)',
    border: 'none',
    padding: '7px 10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  });

  return (
    <div style={{
      background: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border)',
      padding: '0.75rem 2rem',
      position: 'sticky',
      top: '64px',
      zIndex: 90,
    }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>

        {/* Row 1: Search + Sort + View */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '180px', maxWidth: '320px' }}>
            <svg style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }}
              width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Cari tag, artist..."
              value={searchTag}
              onChange={e => onSearchTagChange(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '6px 12px 6px 30px',
                color: 'var(--text-primary)',
                fontSize: '13px',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
            <select
              value={sort}
              onChange={e => onSortChange(e.target.value as SortOption)}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="rating">By rating</option>
            </select>

            <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
              <button onClick={() => onViewModeChange('grid')} style={viewBtn('grid')} title="Grid">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
                </svg>
              </button>
              <button onClick={() => onViewModeChange('masonry')} style={{ ...viewBtn('masonry'), borderLeft: '1px solid var(--border)' }} title="Masonry">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="14"/><rect x="14" y="3" width="7" height="8"/>
                  <rect x="14" y="14" width="7" height="7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Rating filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginRight: '4px' }}>Rating</span>
          {(Object.keys(ratingConfig) as RatingFilter[]).map(r => (
            <button key={r} style={ratingBtn(r)} onClick={() => onRatingChange(r)}>
              {ratingConfig[r].label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
