import React, { useState } from 'react';
import SearchForm from '../components/SearchForm';
import '../styles/Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const [searchedRecipes, setSearchedRecipes] = useState([]);

  const searchRecipes = async (query) => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}&number=5`
      );
      const data = await response.json();
      setSearchedRecipes(data.results);
    } catch (error) {
      console.log('Error searching recipes:', error);
    }
  };

  return (
    <div className="container">
      <h1>Search Delicious Recipes</h1>
      <SearchForm onSearch={searchRecipes} />
      <div className="results">
        {searchedRecipes.map((recipe) => (
          <div className="result-item" key={recipe.id}>
            <h3>{recipe.title}</h3>
            <Link
              to={`/recipe/${recipe.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Recipe
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
