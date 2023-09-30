const BASE_URL = "https://api.spoonacular.com";
const API_KEY = import.meta.env.VITE_API_KEY;

const fetchRecipes = async (number) => {
  const url = `${BASE_URL}/recipes/random?number=${number}&apiKey=${API_KEY}`;
  const headers = { "Content-Type": "application/json" };

  try {
    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error("Failed to fetch recipes");
    }

    const data = await response.json();
    return data.recipes;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};

export default fetchRecipes;
