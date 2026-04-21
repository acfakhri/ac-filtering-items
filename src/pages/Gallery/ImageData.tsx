import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Gallery from './Gallery';
import { Item } from './DataType';

const PAGE_LIMIT = 40;

interface ImageDataProps {
  onCountUpdate?: (total: number, filtered: number) => void;
}

const ImageData: React.FC<ImageDataProps> = ({ onCountUpdate }) => {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [totalFromApi, setTotalFromApi] = useState(0);

  const fetchData = useCallback(async (offset: number, append: boolean) => {
    try {
      const response = await axios.get('/api/images', {
        params: { limit: PAGE_LIMIT, offset },
        headers: { Accept: 'application/json' },
      });

      const items: Item[] = response.data.items ?? [];
      const total: number = response.data.count ?? 0;

      setTotalFromApi(total);
      setData(prev => {
        const next = append ? [...prev, ...items] : items;
        onCountUpdate?.(total, next.length);
        return next;
      });
      setHasMore(offset + PAGE_LIMIT < total);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(`HTTP ${err.response?.status ?? '?'}: ${err.message}`);
      } else {
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  }, [onCountUpdate]);

  useEffect(() => { fetchData(0, false); }, [fetchData]);

  const handleLoadMore = useCallback(() => {
    const nextPage = page + 1;
    setPage(nextPage);
    setIsLoadingMore(true);
    fetchData(nextPage * PAGE_LIMIT, true);
  }, [page, fetchData]);

  if (loading) {
    return (
      <div style={{ height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
        <div style={{
          width: '36px', height: '36px',
          border: '3px solid var(--border)',
          borderTopColor: 'var(--accent)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Loading gallery...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', padding: '2rem' }}>
        <p style={{ color: '#ef4444', fontSize: '16px', fontWeight: 500 }}>Gagal memuat data</p>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', textAlign: 'center' }}>{error}</p>
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          <button
            onClick={() => { setError(null); setLoading(true); fetchData(0, false); }}
            style={{ padding: '8px 20px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}
          >
            Retry
          </button>
          <a href="https://api.nekosapi.com/v4/images" target="_blank" rel="noopener noreferrer"
            style={{ padding: '8px 16px', background: 'var(--bg-card)', color: 'var(--text-secondary)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '13px', textDecoration: 'none' }}>
            Cek API →
          </a>
        </div>
      </div>
    );
  }

  return (
    <Gallery
      items={data}
      totalFromApi={totalFromApi}
      onLoadMore={handleLoadMore}
      isLoadingMore={isLoadingMore}
      hasMore={hasMore}
      onFilteredCountChange={(n) => onCountUpdate?.(totalFromApi, n)}
    />
  );
};

export default ImageData;
