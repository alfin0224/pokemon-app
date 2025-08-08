import React from 'react';
import { useParams } from 'react-router-dom';
import { ResponsiveLayout } from '../layouts/ResponsiveLayout';
import { PokemonList } from '../features/pokemon/PokemonList';
import { PokemonDetailPage } from './PokemonDetailPage';

export const HomePage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const selectedPokemonId = id ? parseInt(id, 10) : null;

  return (
    <ResponsiveLayout
      selectedPokemonId={selectedPokemonId}
      listComponent={<PokemonList selectedPokemonId={selectedPokemonId} />}
      detailComponent={selectedPokemonId ? <PokemonDetailPage /> : null}
    />
  );
};
