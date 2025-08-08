import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PokemonCard } from './PokemonCard';
import { PokemonListSkeleton } from '../../components/ui/Skeleton';
import { QueryErrorFallback } from '../../components/ErrorBoundary';
import { usePokemonList } from '../../hooks/usePokemonList';
import type { PokemonCardData } from '../../types/pokemon';

interface PokemonListProps {
  selectedPokemonId?: number | null;
}

export const PokemonList: React.FC<PokemonListProps> = ({ 
  selectedPokemonId = null 
}) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error, refetch } = usePokemonList(currentPage, 20);

  const handlePokemonClick = (pokemon: PokemonCardData) => {
    navigate(`/pokemon/${pokemon.id}`);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    if (data?.next) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (isLoading) {
    return <PokemonListSkeleton />;
  }

  if (error) {
    return (
      <QueryErrorFallback 
        error={error as Error} 
        retry={() => refetch()} 
      />
    );
  }

  if (!data || !data.results.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No Pokémon found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Pokemon Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {data.results.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onClick={handlePokemonClick}
            isSelected={selectedPokemonId === pokemon.id}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 pt-4">
        <button
          onClick={handlePreviousPage}
          disabled={!data.previous}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors text-sm"
        >
          Previous
        </button>
        
        <span className="text-gray-600 text-sm">
          Page {currentPage}
        </span>
        
        <button
          onClick={handleNextPage}
          disabled={!data.next}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors text-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
};
