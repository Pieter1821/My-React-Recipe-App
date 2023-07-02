import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Spinner from "./components/Spinner"; 
import RecipeList from "./pages/RecipeList";
import RecipeDetails from "./pages/RecipeDetails";
import FavoriteRecipes from "./pages/FavoriteRecipes";

const LazyHome = React.lazy(() => import("./pages/Home"));
const LazyError = React.lazy(() => import("./pages/Error"));

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<LazyHome />} />
            <Route path="/recipes" element={<RecipeList />} />
            <Route path="/recipes/:id" element={<RecipeDetails />} />
            <Route path="/favorites" element={<FavoriteRecipes />} />
            <Route path="*" element={<LazyError />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
