import React from "react";

const RecipeDetails = ({ recipe }) => {
  return (
    <article>
      <h2>{recipe.title}</h2>
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
