import { useQuery } from '@tanstack/react-query';
import { pokemonApi } from '../api/pokeapi';
import type { PokemonDetailData } from '../types/pokemon';

// Environment variables
const CACHE_STALE_TIME = parseInt(import.meta.env.VITE_CACHE_STALE_TIME || '5', 10) * 60 * 1000;
const API_RETRY_COUNT = parseInt(import.meta.env.VITE_API_RETRY_COUNT || '3', 10);

export const usePokemonDetail = (nameOrId: string | number | null) => {
  return useQuery({
    queryKey: ['pokemon-detail', nameOrId],
    queryFn: async () => {
      if (!nameOrId) throw new Error('Pokemon ID is required');
      
      const pokemon = await pokemonApi.getPokemonDetail(nameOrId);
      
      // Transform data for UI
      const pokemonDetail: PokemonDetailData = {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other['official-artwork'].front_default || 
               pokemon.sprites.front_default ||
               pokemonApi.getPokemonImageUrl(pokemon.id),
        types: pokemon.types.map(type => type.type.name),
        height: pokemon.height,
        weight: pokemon.weight,
        stats: pokemon.stats.map(stat => ({
          name: stat.stat.name,
          value: stat.base_stat,
        })),
        abilities: pokemon.abilities.map(ability => ability.ability.name),
        moves: pokemon.moves.slice(0, 10).map(move => move.move.name), // Show 10 moves instead of 5
      };

      return pokemonDetail;
    },
    enabled: !!nameOrId,
    staleTime: CACHE_STALE_TIME * 2, // Double the stale time for details (10 minutes if cache is 5)
    retry: API_RETRY_COUNT,
  });
};
