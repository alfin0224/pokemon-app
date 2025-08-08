import { useQuery } from '@tanstack/react-query';
import { pokemonApi } from '../api/pokeapi';
import type { PokemonCardData } from '../types/pokemon';

// Environment variables
const DEFAULT_PAGE_SIZE = parseInt(import.meta.env.VITE_DEFAULT_PAGE_SIZE || '20', 10);
const CACHE_STALE_TIME = parseInt(import.meta.env.VITE_CACHE_STALE_TIME || '5', 10) * 60 * 1000;
const API_RETRY_COUNT = parseInt(import.meta.env.VITE_API_RETRY_COUNT || '3', 10);

export const usePokemonList = (page: number = 1, limit: number = DEFAULT_PAGE_SIZE) => {
  const offset = (page - 1) * limit;

  return useQuery({
    queryKey: ['pokemon-list', page, limit],
    queryFn: async () => {
      const data = await pokemonApi.getPokemonList(limit, offset);
      
      // Fetch detailed info for each Pokemon to get types
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const id = pokemonApi.extractPokemonId(pokemon.url);
          try {
            const detail = await pokemonApi.getPokemonDetail(id);
            return {
              id,
              name: pokemon.name,
              image: pokemonApi.getPokemonImageUrl(id),
              types: detail.types.map(type => type.type.name),
            } as PokemonCardData;
          } catch {
            // Fallback if individual Pokemon fetch fails
            return {
              id,
              name: pokemon.name,
              image: pokemonApi.getPokemonImageUrl(id),
              types: [],
            } as PokemonCardData;
          }
        })
      );

      return {
        ...data,
        results: pokemonDetails,
      };
    },
    staleTime: CACHE_STALE_TIME,
    retry: API_RETRY_COUNT,
  });
};
