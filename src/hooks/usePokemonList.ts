import { useQuery } from '@tanstack/react-query';
import { pokemonApi } from '../api/pokeapi';
import type { PokemonCardData } from '../types/pokemon';

export const usePokemonList = (page: number = 1, limit: number = 20) => {
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
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 3,
  });
};
