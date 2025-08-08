import React from 'react';
import { Header } from './Header';

interface ResponsiveLayoutProps {
  selectedPokemonId: number | null;
  listComponent: React.ReactNode;
  detailComponent: React.ReactNode | null;
}

const EmptyState: React.FC = () => (
  <div className="flex items-center justify-center h-full">
    <div className="text-center">
      <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">Select a Pokémon</h3>
      <p className="text-gray-500">Choose a Pokémon from the list to view its details</p>
    </div>
  </div>
);

export const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({
  selectedPokemonId,
  listComponent,
  detailComponent,
}) => {
  const isDetailView = !!selectedPokemonId;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        {isDetailView ? (
          detailComponent
        ) : (
          <>
            {/* Header */}
            <Header />

            {/* Pokemon List */}
            <main className="p-4">
              {listComponent}
            </main>
          </>
        )}
      </div>

      {/* Desktop/Tablet Layout */}
      <div className="hidden lg:flex h-screen">
        {/* Left Panel - Pokemon List */}
        <div className="w-3/4 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
          {/* Header */}
          <Header />

          {/* Pokemon List */}
          <div className="flex-1 overflow-y-auto p-4">
            {listComponent}
          </div>
        </div>

        {/* Right Panel - Pokemon Detail */}
        <div className="flex-1 bg-slate-50">
          {isDetailView ? detailComponent : <EmptyState />}
        </div>
      </div>
    </div>
  );
};
