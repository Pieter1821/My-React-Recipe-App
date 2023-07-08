import React, { useState, useEffect } from "react";

const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showInstructions, setShowInstructions] = useState({});

  useEffect(() => {
    if (searchQuery !== "") {
      // Call the search API when searchQuery changes
      searchRecipes();
    }
  }, [searchQuery]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const searchRecipes = async (event) => {
    if (event) {
      event.preventDefault(); // Prevent form submission causing page reload
    }
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
      setShowInstructions((prevState) => ({
        ...prevState,
        [recipeId]: instructions,
      }));
      console.log('Instructions for recipe', recipeId, ':', instructions);
    } catch (error) {
      console.log('Error fetching recipe instructions:', error);
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    setSearchResults([]);
    setError(null);
    setShowInstructions({});
  };

  const handleBack = () => {
    setShowInstructions({});
  };

  return (
    <div>
      <form onSubmit={searchRecipes}>
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
      {!loading && !error && Object.keys(showInstructions).length === 0 && (
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
      {!loading && !error && Object.keys(showInstructions).length > 0 && (
        <div>
          <button type="button" onClick={handleBack}>
            Back to Search Results
          </button>
          {searchResults.map((recipe) => (
            <div key={recipe.id}>
              {showInstructions[recipe.id] ? (
                <div>
                  <h3>{recipe.title}</h3>
                  <img src={recipe.image} alt={recipe.title} />
                  <ul>
                    {recipe.usedIngredients?.map((ingredient) => (
                      <li key={ingredient.id}>{ingredient.name}</li>
                    ))}
                  </ul>
                  <div>
                    <h4>Instructions</h4>
                    <ol>
                      {showInstructions[recipe.id].map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              ) : (
                <div>
                  <h3>{recipe.title}</h3>
                  <img src={recipe.image} alt={recipe.title} />
                  <ul>
                    {recipe.usedIngredients?.map((ingredient) => (
                      <li key={ingredient.id}>{ingredient.name}</li>
                    ))}
                  </ul>
                  <button onClick={() => getRecipeInstructions(recipe.id)}>
                    Show Instructions
                    {recipe.instructions && (
                      <span>({recipe.instructions.length} steps)</span>
                    )}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
};

export default SearchForm;
