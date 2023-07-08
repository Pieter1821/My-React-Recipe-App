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
        {recipe.ingredients.map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <ol>
        {recipe.instructions.map((instruction) => (
          <li key={instruction}>{instruction}</li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeDetails;
