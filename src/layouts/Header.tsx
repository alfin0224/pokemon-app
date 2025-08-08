import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="px-4 py-4">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-gray-800">Pokedex</h1>
        </div>
      </div>
    </header>
  );
};
