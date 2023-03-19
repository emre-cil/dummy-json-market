import { useState, useEffect } from 'react';

interface FavoritesHook {
  favorites: string[];
  handleFavorite: (id: string) => void;
}

export const useFavorite = (): FavoritesHook => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  const handleFavorite = (id: string) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.includes(id);

      if (isFavorite) {
        const updatedFavorites = prevFavorites.filter((favId) => favId !== id);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        return updatedFavorites;
      } else {
        const updatedFavorites = [...prevFavorites, id];
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        return updatedFavorites;
      }
    });
  };

  return { favorites, handleFavorite };
};
