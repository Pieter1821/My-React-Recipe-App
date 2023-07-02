
# React JS + Vite Recipe App

This is a recipe application built using React JS and Vite. The app utilizes lazy loading functions and retrieves data from the Spoonacular API.

## Features

- Browse a wide variety of recipes
- Search for specific recipes
- Filter recipes by category or ingredients
- View recipe details including ingredients and instructions
- Save favorite recipes for later
- Lazy loading for improved performance

## Technologies Used

- React JS
- Vite
- Spoonacular API

## Getting Started

To get started with the recipe app, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/recipe-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd recipe-app
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Set up your Spoonacular API key:
   
   - Visit the [Spoonacular API website](https://spoonacular.com/food-api) and sign up for an account.
   - Obtain your API key from the dashboard.
   - Create a `.env` file in the root directory of the project.
   - Add the following line to the `.env` file, replacing `<YOUR_API_KEY>` with your actual API key:

     ```bash
     REACT_APP_SPOONACULAR_API_KEY=<YOUR_API_KEY>
     ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open your browser and visit `http://localhost:3000` to access the recipe app.

## Project Structure

The project structure is organized as follows:

```
recipe-app/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── RecipeCard.js
│   │   └── ...
│   ├── pages/
│   │   ├── Home.js
│   │   ├── RecipeDetails.js
│   │   └── ...
│   ├── services/
│   │   ├── api.js
│   │   └── ...
│   ├── utils/
│   │   ├── lazyLoad.js
│   │   └── ...
│   ├── App.js
│   └── index.js
├── .env
├── .gitignore
├── package.json
└── ...
```

- The `public/` directory contains the HTML template file and any static assets.
- The `src/` directory contains the main source code of the application.
- The `components/` directory holds reusable components used throughout the app.
- The `pages/` directory contains the different pages or views of the application.
- The `services/` directory includes utility functions for interacting with the Spoonacular API.
- The `utils/` directory consists of helper functions, such as the lazy loading function.
- The `App.js` file is the entry point of the application.
- The `index.js` file renders the root component into the DOM.
- The `.env` file stores the API key for the Spoonacular API.
- The `.gitignore` file specifies which files and directories should be ignored by Git.
- The `package.json` file includes project metadata and lists the project dependencies.

Feel free to explore the code and modify it according to your needs.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.

## License

This project is licensed
