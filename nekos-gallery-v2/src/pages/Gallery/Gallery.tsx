import React, { useState, useMemo, useEffect } from 'react';
import { Item, RatingFilter, SortOption, ViewMode } from './DataType';
import GalleryCard from './GalleryCard';
import FilterBar from './FilterBar';
import ImageModal from './ImageModal';

interface Props {
  items: Item[];
  totalFromApi: number;
  onLoadMore: () => void;
  isLoadingMore: boolean;
  hasMore: boolean;
  onFilteredCountChange: (n: number) => void;
}

const Gallery: React.FC<Props> = ({
  items, totalFromApi, onLoadMore, isLoadingMore, hasMore, onFilteredCountChange,
}) => {
  const [rating, setRating] = useState<RatingFilter>('all');
  const [sort, setSort] = useState<SortOption>('newest');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchTag, setSearchTag] = useState('');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const filtered = useMemo(() => {
    let result = [...items];

    if (rating !== 'all') result = result.filter(i => i.rating === rating);

    if (searchTag.trim()) {
      const q = searchTag.toLowerCase().trim();
      result = result.filter(i =>
        i.tags?.some(t => t.toLowerCase().includes(q)) ||
        (i.artist_name?.toLowerCase().includes(q) ?? false)
      );
    }

    if (sort === 'newest') result.sort((a, b) => b.id - a.id);
    else if (sort === 'oldest') result.sort((a, b) => a.id - b.id);
    else if (sort === 'rating') {
      const order: Record<string, number> = { safe: 0, suggestive: 1, borderline: 2, explicit: 3 };
      result.sort((a, b) => (order[a.rating] ?? 0) - (order[b.rating] ?? 0));
    }

    return result;
  }, [items, rating, sort, searchTag]);

  useEffect(() => {
    onFilteredCountChange(filtered.length);
  }, [filtered.length, onFilteredCountChange]);

  const gridStyle: React.CSSProperties = viewMode === 'grid'
    ? { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '16px' }
    : { columnCount: 4, columnGap: '16px' };

  return (
    <>
      <FilterBar
        rating={rating}
        sort={sort}
        viewMode={viewMode}
        searchTag={searchTag}
        onRatingChange={setRating}
        onSortChange={setSort}
        onViewModeChange={setViewMode}
        onSearchTagChange={setSearchTag}
      />

      <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '1.5rem 2rem' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-muted)' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: '0 auto 12px', display: 'block' }}>
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <p style={{ fontSize: '16px', marginBottom: '6px', color: 'var(--text-secondary)' }}>Tidak ada hasil</p>
            <p style={{ fontSize: '13px' }}>Coba ubah filter atau kata kunci pencarian</p>
          </div>
        ) : (
          <div style={gridStyle}>
            {filtered.map((item, idx) => (
              <div
                key={item.id}
                className="fade-up"
                style={{
                  ...(viewMode === 'masonry' ? { marginBottom: '16px', breakInside: 'avoid' } : {}),
                  animationDelay: `${(idx % 20) * 25}ms`,
                }}
              >
                <GalleryCard item={item} onClick={() => setSelectedItem(item)} />
              </div>
            ))}
          </div>
        )}

        {/* Stats + Load More */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginTop: '2rem', padding: '1rem 1.25rem',
          background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '10px',
          flexWrap: 'wrap', gap: '12px',
        }}>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Tampil{' '}
            <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{filtered.length.toLocaleString()}</span>
            {' '}— loaded{' '}
            <span style={{ color: 'var(--text-secondary)' }}>{items.length.toLocaleString()}</span>
            {' '}dari{' '}
            <span style={{ color: 'var(--text-secondary)' }}>{totalFromApi.toLocaleString()}</span> total
          </p>

          {hasMore && (
            <button
              onClick={onLoadMore}
              disabled={isLoadingMore}
              style={{
                padding: '7px 22px',
                background: isLoadingMore ? 'transparent' : 'var(--accent)',
                color: isLoadingMore ? 'var(--text-muted)' : '#fff',
                border: isLoadingMore ? '1px solid var(--border)' : 'none',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 500,
                cursor: isLoadingMore ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              {isLoadingMore && (
                <span style={{
                  width: '12px', height: '12px',
                  border: '2px solid var(--text-muted)',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  display: 'inline-block',
                  animation: 'spin 0.8s linear infinite',
                }} />
              )}
              {isLoadingMore ? 'Loading...' : 'Load More'}
            </button>
          )}
        </div>
      </div>

      <ImageModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </>
  );
};

export default Gallery;
