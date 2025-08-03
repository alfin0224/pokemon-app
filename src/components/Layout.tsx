import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { PokemonList } from '../features/pokemon/PokemonList';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Layout */}
      <div className="md:hidden">
        <Outlet />
      </div>

      {/* Desktop/Tablet Layout */}
      <div className="hidden md:flex h-screen">
        {/* Left Panel - Pokemon List */}
        <div className="w-80 lg:w-96 bg-white border-r border-gray-200 flex flex-col">
          <Header />
          <div className="flex-1 overflow-y-auto p-4">
            <PokemonList />
          </div>
        </div>

        {/* Right Panel - Pokemon Detail */}
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
