import React, { useState, useEffect } from "react";

const RecipeList = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_API_KEY}&number=10`
      );
      const data = await response.json();

      setRecipes(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleIngredientChange = (event) => {
    const ingredient = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedIngredients((prevIngredients) => [
        ...prevIngredients,
        ingredient,
      ]);
    } else {
      setSelectedIngredients((prevIngredients) =>
        prevIngredients.filter((prevIngredient) => prevIngredient !== ingredient)
      );
    }
  };

  // Filter recipes based on selected category and ingredients
  const filteredRecipes = recipes
    ? recipes.filter(
        (recipe) =>
          (selectedCategory === "" || recipe.category === selectedCategory) &&
          selectedIngredients.every((ingredient) =>
            recipe.ingredients.includes(ingredient)
          )
      )
    : [];

  const recipeItems = filteredRecipes.map((recipe) => (
    <recipeItems key={recipe.id} recipe={recipe} />
  ));

  return (
    <div>
      <h2>Filter Recipes</h2>
      <div>
        <label>
          Category:
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">All</option>
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
            <option value="category3">Category 3</option>
          </select>
        </label>
      </div>
      <div>
        Ingredients:
        <label>
          <input
            type="checkbox"
            value="ingredient1"
            onChange={handleIngredientChange}
          />
          Ingredient 1
        </label>
        <label>
          <input
            type="checkbox"
            value="ingredient2"
            onChange={handleIngredientChange}
          />
          Ingredient 2
        </label>
        <label>
          <input
            type="checkbox"
            value="ingredient3"
            onChange={handleIngredientChange}
          />
          Ingredient 3
        </label>
      </div>
      <h2>Recipes</h2>
      <ul>{recipeItems}</ul>
    </div>
  );
};

export default RecipeList;
