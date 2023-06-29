import React, { useState } from "react";

const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const BASE_URL = "https://api.spoonacular.com";
      const response = await fetch(
        `${BASE_URL}/recipes/complexSearch?query=${searchQuery}&number=5&apiKey=${apiKey}`
      );
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.results);
        console.log(data); // Log the API data
      } else {
        const errorResponse = await response.text();
        throw new Error(`Error searching recipes: ${errorResponse}`);
      }
    } catch (error) {
      setError(error.message);
      console.log("Error searching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecipeInstructions = async (recipeId) => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const BASE_URL = "https://api.spoonacular.com";
      const response = await fetch(
        `${BASE_URL}/recipes/${recipeId}/analyzedInstructions?apiKey=${apiKey}`
      );
      if (response.ok) {
        const data = await response.json();
        return data[0].steps.map((step) => step.step);
      } else {
        const errorResponse = await response.text();
        throw new Error(`Error fetching recipe instructions: ${errorResponse}`);
      }
    } catch (error) {
      console.log("Error fetching recipe instructions:", error);
      return [];
    }
  };

  const getRecipeInstructions = async (recipeId) => {
    try {
      const instructions = await fetchRecipeInstructions(recipeId);
      setSearchResults((prevState) => {
        const newState = [...prevState];
        const recipeIndex = newState.findIndex((recipe) => recipe.id === recipeId);
        if (recipeIndex !== -1) {
          newState[recipeIndex].instructions = instructions;
        }
        return newState;
      });
      console.log('Instructions for recipe', recipeId, ':', instructions);
    } catch (error) {
      console.log('Error fetching recipe instructions:', error);
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    setSearchResults([]);
    setError(null);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search for delicious recipes"
          autoFocus
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {searchQuery !== "" && searchResults.length === 0 && !loading && !error && (
        <p>No recipes found.</p>
      )}
      {!loading && !error && (
        <div>
          {searchResults.map((recipe) => (
            <div key={recipe.id}>
              <h3>{recipe.title}</h3>
              <img src={recipe.image} alt={recipe.title} />
              <ul>
                {recipe.usedIngredients?.map((ingredient) => (
                  <li key={ingredient.id}>{ingredient.name}</li>
                ))}
              </ul>
              {recipe.instructions && (
                <div>
                  <h4>Instructions</h4>
                  <ol>
                    {recipe.instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ol>
                </div>
              )}
              <button onClick={() => getRecipeInstructions(recipe.id)}>
                Show Instructions
                {recipe.instructions && (
                  <span>({recipe.instructions.length} steps)</span>
                )}
              </button>
            </div>
          ))}
        </div>
      )}
        <button type="button" onClick={handleClear} disabled={loading || searchQuery === ""}>
          Clear the page
        </button>
    </div>
  );
};

export default SearchForm;
