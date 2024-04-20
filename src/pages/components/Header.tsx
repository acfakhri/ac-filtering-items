import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center">
          <h1 className="text-2xl font-bold">Filtering Item - Nekos API</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
