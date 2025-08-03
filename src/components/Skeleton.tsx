import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
  );
};

export const PokemonCardSkeleton: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-gray-300 to-gray-400 rounded-xl p-4">
      <div className="text-center">
        <Skeleton className="h-20 w-20 mx-auto mb-2 rounded-lg" />
        <Skeleton className="h-3 w-12 mx-auto mb-1" />
        <Skeleton className="h-4 w-16 mx-auto mb-2" />
        <div className="flex gap-1 justify-center">
          <Skeleton className="h-4 w-10 rounded-full" />
          <Skeleton className="h-4 w-10 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export const PokemonListSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {Array.from({ length: 12 }, (_, index) => (
        <PokemonCardSkeleton key={index} />
      ))}
    </div>
  );
};
