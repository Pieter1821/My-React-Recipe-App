import React, { useState } from 'react';
import SearchForm from '../components/SearchForm';
import '../styles/Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchRecipes = async (query) => {
    try {
      setLoading(true);
      setError(null);

      const apiKey = import.meta.env.VITE_API_KEY;
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}&number=5`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setSearchedRecipes(data.results);
    } catch (error) {
      setError('Error searching recipes. Please try again later.');
      console.error('Error searching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <h1>Search Delicious Recipes</h1>
      <SearchForm onSearch={searchRecipes} />

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error-message">{error}</div>}

      <div className="results">
        {searchedRecipes.map((recipe) => (
          <div className="result-item" key={recipe.id}>
            <h3>{recipe.title}</h3>
            <Link to={`/recipe/${recipe.id}`} className="view-recipe-link">
              View Recipe
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;