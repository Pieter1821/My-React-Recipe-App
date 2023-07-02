import React from "react";

const FavoriteRecipes = ({ favoriteRecipes, removeFromFavorites }) => {
  const handleRemoveFromFavorites = (recipe) => {
    removeFromFavorites(recipe);
  };

  return (
    <div>
      <h2>Favorite Recipes</h2>
      <ul>
        {favoriteRecipes.map((recipe) => (
          <li key={recipe.id}>
            {recipe.title}
            <button onClick={() => handleRemoveFromFavorites(recipe)}>
              Remove from Favorites
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteRecipes;
