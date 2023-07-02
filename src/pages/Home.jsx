import React, { useState } from 'react';
import SearchForm from '../components/SearchForm';
import '../styles/Home.css';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import RecipeList from '../pages/RecipeList';

export default function Home() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [searchedRecipes, setSearchedRecipes] = useState([]);

  const addToFavorites = (recipe) => {
    setFavoriteRecipes([...favoriteRecipes, recipe]);
  };

  const removeFromFavorites = (id) => {
    setFavoriteRecipes(favoriteRecipes.filter((recipe) => recipe.id !== id));
  };

  const searchRecipes = async (query) => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=import.meta.env.VITE_API_KEY`
      );
      const data = await response.json();
      setSearchedRecipes(data.results);
    } catch (error) {
      console.log('Error searching recipes:', error);
    }
  };

  return (
    <div>
      <SearchForm onSearch={searchRecipes} />

      <RecipeList
        recipes={searchedRecipes}
        addToFavorites={addToFavorites}
      />

      <FavoriteRecipes
        favoriteRecipes={favoriteRecipes}
        removeFromFavorites={removeFromFavorites}
      />
    </div>
  );
}
