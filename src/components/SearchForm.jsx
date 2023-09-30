import React, { useState, useEffect } from 'react';
import '../styles/SearchForm.css';

const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showInstructions, setShowInstructions] = useState({});

  useEffect(() => {
    if (searchQuery) {
      searchRecipes();
    }
  }, [searchQuery]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const fetchApiData = async (url) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const errorResponse = await response.text();
        throw new Error(`Error: ${errorResponse}`);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const searchRecipes = () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const BASE_URL = 'https://api.spoonacular.com';
    const url = `${BASE_URL}/recipes/complexSearch?query=${searchQuery}&number=5&apiKey=${apiKey}`;

    fetchApiData(url)
      .then((data) => setSearchResults(data.results))
      .catch((error) => console.log(error));
  };

  const fetchRecipeInstructions = async (recipeId) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const BASE_URL = 'https://api.spoonacular.com';
    const url = `${BASE_URL}/recipes/${recipeId}/analyzedInstructions?apiKey=${apiKey}`;

    try {
      const data = await fetchApiData(url);
      return data[0]?.steps.map((step) => step.step) || [];
    } catch (error) {
      return [];
    }
  };

  const getRecipeInstructions = async (recipeId) => {
    const instructions = await fetchRecipeInstructions(recipeId);
    setShowInstructions((prevState) => ({
      ...prevState,
      [recipeId]: instructions,
    }));
  };

  const handleClear = () => {
    setSearchQuery('');
    setSearchResults([]);
    setError(null);
    setShowInstructions({});
  };

  const handleBack = () => {
    setShowInstructions({});
  };

  const renderRecipe = (recipe) => {
    const { id, title, image, instructions } = recipe;
    const recipeInstructions = showInstructions[id];

    return (
      <div key={id}>
        <h3>{title}</h3>
        <img src={image} alt={title} />

        {recipeInstructions ? (
          <div>
            <h4>Instructions</h4>
            <ol>
              {recipeInstructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
        ) : (
          <button className="instructions-button" onClick={() => getRecipeInstructions(id)}>
            Show Instructions {instructions && <span>({instructions.length} steps)</span>}
          </button>
        )}
      </div>
    );
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          searchRecipes();
        }}
      >
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search for delicious recipes"
          autoFocus
        />
        <button className="search-button" type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
        <button className="clear-button" type="button" onClick={handleClear}>
          Clear
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">Error: {error}</p>}
      {searchQuery && searchResults.length === 0 && !loading && !error && <p>No recipes found.</p>}
      {!loading && !error && Object.keys(showInstructions).length === 0 && <div>{searchResults.map(renderRecipe)}</div>}
      {!loading && !error && Object.keys(showInstructions).length > 0 && (
        <div>
          <button className="back-button" type="button" onClick={handleBack}>
            Back to Search Results
          </button>
          {searchResults.map(renderRecipe)}
        </div>
      )}
    </div>
  );
};

export default SearchForm;
