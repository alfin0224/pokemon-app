import axios from 'axios';
import type { PokemonListResponse, Pokemon } from '../types/pokemon';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const pokemonApi = {
  // Get list of Pokemon with pagination
  getPokemonList: async (limit: number = 20, offset: number = 0): Promise<PokemonListResponse> => {
    const response = await api.get<PokemonListResponse>(`/pokemon?limit=${limit}&offset=${offset}`);
    return response.data;
  },

  // Get Pokemon detail by name or id
  getPokemonDetail: async (nameOrId: string | number): Promise<Pokemon> => {
    const response = await api.get<Pokemon>(`/pokemon/${nameOrId}`);
    return response.data;
  },

  // Extract Pokemon ID from URL
  extractPokemonId: (url: string): number => {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 2], 10);
  },

  // Get Pokemon sprite URL
  getPokemonImageUrl: (id: number): string => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  },
};
