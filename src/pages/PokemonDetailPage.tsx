import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { QueryErrorFallback } from '../components/ErrorBoundary';
import { Skeleton } from '../components/ui/Skeleton';
import { usePokemonDetail } from '../hooks/usePokemonDetail';
import { pokemonApi } from '../api/pokeapi';
import {
  formatPokemonName,
  formatPokemonNumber,
  getPokemonTypeGradient,
  getStatColor,
  formatStatName,
  formatHeight,
  formatWeight,
} from '../utils/formatters';

type TabType = 'about' | 'stats' | 'evolution' | 'moves';

export const PokemonDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<TabType>('about');
  
  const pokemonId = id ? parseInt(id, 10) : null;
  const { data: pokemon, isLoading, error, refetch } = usePokemonDetail(pokemonId);

  const tabs = [
    { id: 'about' as TabType, label: 'About' },
    { id: 'stats' as TabType, label: 'Base Stats' },
    { id: 'evolution' as TabType, label: 'Evolution' },
    { id: 'moves' as TabType, label: 'Moves' },
  ];

  const renderTabContent = () => {
    if (!pokemon) return null;

    switch (activeTab) {
      case 'about':
        return (
          <div className="space-y-4 animate-fadeIn">
            {/* Pokemon Info in Key Value Format */}
            <div className="space-y-3">
              {/* Species */}
              <div className="grid grid-cols-8 gap-2 items-center">
                <span className="col-span-2 text-gray-500 text-sm">Species</span>
                <span className="col-span-6 font-medium text-gray-900 capitalize">{pokemon.types[0]}</span>
              </div>
              
              {/* Height */}
              <div className="grid grid-cols-8 gap-2 items-center">
                <span className="col-span-2 text-gray-500 text-sm">Height</span>
                <span className="col-span-6 font-medium text-gray-900">{formatHeight(pokemon.height)}</span>
              </div>
              
              {/* Weight */}
              <div className="grid grid-cols-8 gap-2 items-center">
                <span className="col-span-2 text-gray-500 text-sm">Weight</span>
                <span className="col-span-6 font-medium text-gray-900">{formatWeight(pokemon.weight)}</span>
              </div>
              
              {/* Abilities */}
              <div className="grid grid-cols-8 gap-2 items-center">
                <span className="col-span-2 text-gray-500 text-sm">Abilities</span>
                <span className="col-span-6 font-medium text-gray-900 capitalize">
                  {pokemon.abilities.join(', ').replace(/-/g, ' ')}
                </span>
              </div>
            </div>
          </div>
        );

      case 'stats':
        return (
          <div className="space-y-3 animate-fadeIn">
            {pokemon.stats.map((stat) => (
              <div key={stat.name} className="grid grid-cols-8 gap-2 items-center">
                {/* Stat Name - 2 columns */}
                <div className="col-span-2">
                  <span className="font-medium text-gray-900 text-sm">{formatStatName(stat.name)}</span>
                </div>
                
                {/* Stat Value - 1 column */}
                <div className="col-span-1 text-center">
                  <span className="text-gray-900 font-bold text-sm">{stat.value}</span>
                </div>
                
                {/* Progress Bar - 5 columns */}
                <div className="col-span-5">
                  <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-1000 ${getStatColor(stat.name)} rounded-full`}
                      style={{ width: `${Math.min((stat.value / 150) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'evolution':
        return (
          <div className="text-center py-12 animate-fadeIn">
            <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="font-bold text-xl mb-3 text-gray-900">Evolution Chain</h4>
            <p className="text-gray-600">Evolution data coming soon...</p>
          </div>
        );

      case 'moves':
        return (
          <div className="space-y-3 animate-fadeIn">
            <h4 className="font-bold text-lg mb-4 text-gray-900">Available Moves</h4>
            <div className="grid grid-cols-1 gap-2 max-h-80 overflow-y-auto">
              {pokemon.moves.map((move, index) => (
                <div
                  key={`${move}-${index}`}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-900 capitalize font-medium"
                >
                  {move.replace('-', ' ')}
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isLoading) {
    return <PokemonDetailSkeleton />;
  }

  if (error || !pokemon) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center p-4">
        <QueryErrorFallback 
          error={error as Error} 
          retry={() => refetch()} 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header with Gradient */}
      <div className={`relative bg-gradient-to-br ${getPokemonTypeGradient(pokemon.types)} overflow-hidden`} style={{ height: '45vh' }}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-42 -right-8 w-40 h-40 rounded-full border-[40px] border-white opacity-60 overflow-hidden" style={{ clipPath: 'inset(0 10px 0 0)' }}>
            <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 border-2 border-gray-300"></div>
          </div>
        
        </div>

        {/* Curved Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-white rounded-t-3xl">
        </div>

        {/* Pokemon Content */}
        <div className="relative z-10 h-full text-white px-6 py-6">
          {/* Top Section - Name and ID */}
          <div className="flex justify-between items-center mb-4">
            {/* Left - Pokemon Name and Type */}
            <div>
              <h1 className="text-3xl font-bold capitalize drop-shadow-lg mb-2">
                {formatPokemonName(pokemon.name)}
              </h1>
              {/* Pokemon Types */}
              <div className="flex gap-2">
                {pokemon.types.map((type) => (
                  <span
                    key={type}
                    className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium capitalize"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Right - Pokemon ID */}
            <div className="text-white/80 text-md font-medium">
              {formatPokemonNumber(pokemon.id)}
            </div>
          </div>

          {/* Center - Pokemon Image */}
          <div className="flex justify-center items-end flex-1 pb-0">
            <div className="w-48 h-48 relative">
              <img
                src={pokemon.image}
                alt={formatPokemonName(pokemon.name)}
                className="w-full h-full object-contain relative z-30"
                style={{ transform: 'translateY(40px)' }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = pokemonApi.getPokemonFallbackImageUrl(pokemon.id);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white relative -mt-4 pt-16">
        {/* White background for nav area where Pokemon feet will be */}
        <div className="absolute top-12 left-0 right-0 h-20 bg-white rounded-t-3xl"></div>
        
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 px-6 pt-6 relative z-20 bg-white">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-2 text-sm font-medium text-center border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="px-6 py-6 bg-white relative overflow-hidden">
          <div className="relative z-10 min-h-[300px]">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

const PokemonDetailSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-gray-400 to-gray-600" style={{ height: '45vh' }}>
        <div className="flex flex-col items-center justify-center h-full">
          <Skeleton className="w-32 h-32 rounded-full mb-4" />
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <div className="bg-slate-50 relative -mt-4 rounded-t-3xl p-6">
        <div className="flex gap-4 mb-6">
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} className="h-8 flex-1" />
          ))}
        </div>
        <div className="space-y-4">
          {Array.from({ length: 6 }, (_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
};
