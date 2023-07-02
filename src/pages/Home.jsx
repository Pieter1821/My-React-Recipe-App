import React from 'react';
import SearchForm from '../components/SearchForm';
import '../styles/Home.css';
import FavoriteRecipes from '../pages/FavoriteRecipes';

export default function Home() {
  // Sample favoriteRecipes state and removeFromFavorites function
  const favoriteRecipes = []; // Replace with your actual favoriteRecipes state
  const removeFromFavorites = () => {}; // Replace with your actual removeFromFavorites function

  return (
    <div>
      <SearchForm />
      <FavoriteRecipes
        favoriteRecipes={favoriteRecipes}
        removeFromFavorites={removeFromFavorites}
      />
    </div>
  );
}
