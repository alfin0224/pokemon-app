// Format Pokemon name (capitalize first letter)
export const formatPokemonName = (name: string): string => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

// Format Pokemon number with leading zeros
export const formatPokemonNumber = (id: number): string => {
  return `#${id.toString().padStart(3, '0')}`;
};

// Get Pokemon type gradient for card backgrounds
export const getPokemonTypeGradient = (types: string[]): string => {
  const primaryType = types[0] || 'normal';
  
  const typeGradients: Record<string, string> = {
    fire: 'from-orange-300 to-red-400',
    water: 'from-blue-300 to-cyan-400',
    grass: 'from-green-300 to-emerald-400',
    electric: 'from-yellow-300 to-amber-400',
    psychic: 'from-pink-300 to-purple-400',
    ice: 'from-cyan-200 to-blue-300',
    dragon: 'from-purple-400 to-indigo-500',
    dark: 'from-gray-500 to-gray-600',
    fairy: 'from-pink-200 to-rose-300',
    normal: 'from-gray-300 to-gray-400',
    fighting: 'from-red-400 to-orange-500',
    poison: 'from-purple-400 to-pink-500',
    ground: 'from-yellow-400 to-orange-500',
    flying: 'from-indigo-300 to-blue-400',
    bug: 'from-lime-400 to-green-500',
    rock: 'from-yellow-500 to-amber-600',
    ghost: 'from-purple-500 to-indigo-600',
    steel: 'from-gray-400 to-slate-500',
  };
  
  return typeGradients[primaryType] || 'from-gray-400 to-gray-500';
};

// Get Pokemon type color for badges
export const getPokemonTypeColor = (type: string): string => {
  const typeColors: Record<string, string> = {
    fire:   'bg-orange-400',
    water:  'bg-sky-300', 
    grass:  'bg-teal-400',  
    electric: 'bg-yellow-300',
    psychic: 'bg-pink-300',
    ice: 'bg-cyan-200',
    dragon: 'bg-purple-400',
    dark: 'bg-gray-500',
    fairy: 'bg-pink-200',
    normal: 'bg-gray-300',
    fighting: 'bg-red-400',
    poison: 'bg-purple-400',
    ground: 'bg-yellow-400',
    flying: 'bg-indigo-300',
    bug: 'bg-lime-400',
    rock: 'bg-yellow-500',
    ghost: 'bg-purple-500',
    steel: 'bg-gray-400',
  };
  
  return typeColors[type] || 'bg-gray-400';
};

// Get stat color for progress bars
export const getStatColor = (statName: string): string => {
  const statColors: Record<string, string> = {
    hp: 'bg-green-400',
    attack: 'bg-orange-400',
    defense: 'bg-blue-300',
    'special-attack': 'bg-purple-400',
    'special-defense': 'bg-teal-300',
    speed: 'bg-pink-400',
  };
  
  return statColors[statName] || 'bg-gray-400';
};

// Format stat name for display
export const formatStatName = (statName: string): string => {
  const statNames: Record<string, string> = {
    hp: 'HP',
    attack: 'Attack',
    defense: 'Defense',
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    speed: 'Speed',
  };
  
  return statNames[statName] || statName;
};

// Convert height from decimeters to meters and feet
export const formatHeight = (height: number): string => {
  const meters = height / 10;
  const feet = meters * 3.28084;
  const cm = meters * 100;
  return `${feet.toFixed(1)} (${cm.toFixed(2)} cm)`;
};

// Convert weight from hectograms to kilograms and pounds
export const formatWeight = (weight: number): string => {
  const kg = weight / 10;
  const lbs = kg * 2.20462;
  return `${lbs.toFixed(1)} lbs (${kg.toFixed(1)} kg)`;
};
