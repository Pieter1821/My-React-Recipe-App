import React from "react";

const RecipeDetails = ({ recipe, addToFavorites }) => {
  const handleAddToFavorites = () => {
    addToFavorites(recipe);
  };

  return (
    <div>
      <h2>{recipe.title}</h2>
      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <ol>
        {recipe.instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
      <button onClick={handleAddToFavorites}>Add to Favorites</button>
    </div>
  );
};

export default RecipeDetails;
