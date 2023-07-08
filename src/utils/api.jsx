const BASE_URL = "https://api.spoonacular.com";

const getHeaders = () => ({
  "Content-Type": "application/json",
});

export const getRecipes = async (number) => {
  try {
    const apiKey = import.meta.env.VITE_API_KEY;
    const response = await fetch(`${BASE_URL}/recipes/random?number=${number}&apiKey=${apiKey}`, {
      headers: getHeaders(),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch recipes");
    }
    const data = await response.json();
    return data.recipes;
  } catch (error) {
    console.log("Error fetching recipes:", error);
    throw error;
  }
};

const api = {
  getRecipes,
};

export default api;
