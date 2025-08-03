import { useQuery } from '@tanstack/react-query';
import { pokemonApi } from '../api/pokeapi';
import type { PokemonDetailData } from '../types/pokemon';

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
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 3,
  });
};
