import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
      <p className="text-lg mb-4">Maaf, halaman yang anda cari sedang dalam masa pengembangan</p>
      <Link to="/" className="text-blue-500 hover:underline">Go back to Home</Link>
    </div>
  );
};

export default NotFoundPage;
