import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ImageData from './pages/Gallery/ImageData';
import NotFoundPage from './NotFound';
import Header from './pages/components/Header';
import Footer from './pages/components/Footer';

const App: React.FC = () => {
  const [counts, setCounts] = useState({ total: 0, filtered: 0 });

  const handleCountUpdate = useCallback((total: number, filtered: number) => {
    setCounts({ total, filtered });
  }, []);

  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
        <Header totalCount={counts.total} filteredCount={counts.filtered} />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<ImageData onCountUpdate={handleCountUpdate} />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
