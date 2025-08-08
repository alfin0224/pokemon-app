import React from 'react';
import type { PokemonCardData } from '../../types/pokemon';
import { formatPokemonName, getPokemonTypeGradient } from '../../utils/formatters';
import { pokemonApi } from '../../api/pokeapi';

interface PokemonCardProps {
  pokemon: PokemonCardData;
  onClick: (pokemon: PokemonCardData) => void;
  isSelected?: boolean;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onClick, isSelected = false }) => {
  const handleClick = () => {
    onClick(pokemon);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(pokemon);
    }
  };

  return (
    <div
      className={`bg-gradient-to-br ${getPokemonTypeGradient(pokemon.types)} rounded-xl p-4 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 relative overflow-hidden aspect-[3/2] ${
        isSelected ? 'ring-2 ring-blue-400 shadow-lg scale-105' : ''
      }`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${formatPokemonName(pokemon.name)}`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-2 right-2 w-6 h-6 rounded-full border-2 border-white"></div>
        <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-white"></div>
        <div className="absolute bottom-2 left-2 w-1 h-1 rounded-full bg-white opacity-60"></div>
        <div className="absolute bottom-3 left-3 w-1 h-1 rounded-full bg-white opacity-60"></div>
      </div>

      <div className="relative z-0 h-full flex items-center gap-3">
        {/* Pokemon Info - Left Side */}
        <div className="flex-1 text-left">
          {/* Pokemon Name */}
          <h3 className="font-bold text-sm text-white mb-2 capitalize leading-tight">
            {formatPokemonName(pokemon.name)}
          </h3>

          {/* Pokemon Types */}
          <div className="flex gap-1 flex-wrap">
            {pokemon.types.slice(0, 2).map((type) => (
              <span
                key={type}
                className="px-2 py-0.5 rounded-full text-xs text-white capitalize font-medium bg-white/20 shadow-sm"
              >
                {type}
              </span>
            ))}
          </div>
        </div>

        {/* Pokemon Image - Right Side */}
        <div className="h-16 w-16 flex-shrink-0">
          <img
            src={pokemon.image}
            alt={formatPokemonName(pokemon.name)}
            className="w-full h-full object-contain drop-shadow-lg"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = pokemonApi.getPokemonFallbackImageUrl(pokemon.id);
            }}
          />
        </div>
      </div>
    </div>
  );
};
