import React, { useState } from 'react';

const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const BASE_URL = 'https://api.spoonacular.com';
      const response = await fetch(`${BASE_URL}/recipes/complexSearch?query=${searchQuery}&number=5&apiKey=${apiKey}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.results);
        console.log(data); // Log the API data
      } else {
        const errorResponse = await response.text();
        throw new Error(`Error searching recipes: ${errorResponse}`);
      }
    } catch (error) {
      console.log('Error searching recipes:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search recipes"
        />
        <button type="submit">Search</button>
      </form>
      {searchResults.map((recipe) => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <img src={recipe.image} alt={recipe.title}/>
         
         

        </div>
      ))}
    </div>
  );
};

export default SearchForm;
