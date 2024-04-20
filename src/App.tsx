import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Menggunakan Routes sebagai pengganti Route
import ImageData from './pages/Gallery/ImageData';
import NotFoundPage from './NotFound';
import Header from './pages/components/Header';

const App: React.FC = () => {
  return (
    
    <Router>
      <Header />
      <Routes> {/* Menggunakan Routes sebagai pengganti Route */}
        <Route path="/" element={<ImageData />} /> {/* Menggunakan element prop untuk menentukan komponen yang akan ditampilkan */}
        {/* Tambahkan rute lain di sini */}
        <Route path="*" element={<NotFoundPage />} /> {/* Menggunakan path="*" untuk menangkap semua URL yang tidak cocok */}
      </Routes>
    </Router>
  );
};

export default App;
