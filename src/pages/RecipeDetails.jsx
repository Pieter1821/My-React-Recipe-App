import React from "react";

const RecipeDetails = ({ recipe }) => {
  return (
    <article>
      <h2>{recipe.title}</h2>
      <section>
        <h3>Ingredients:</h3>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </section>
      <section>
        <h3>Instructions:</h3>
        <ol>
          {recipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </section>
    </article>
  );
};

export default RecipeDetails;
