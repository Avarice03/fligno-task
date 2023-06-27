import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../providers/User";
import spinner from "../images/loading.gif";
import RecipeCard from "../RecipeCard";
import { getFavoriteRecipes } from "../services/RecipesService";
import FilterCuisine from "../FilterCuisine";
import FilterMeal from "../FilterMeal";
import FilterDish from "../FilterDish";

// Recipes Home page for RecipeEZ
function Recipes() {
  const [isLoggedIn, setLoggedIn] = useContext(UserContext);
  const [recipes, setRecipes] = useState([]);
  const [recipesCopy, setRecipesCopy] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [keyword, setKeyword] = useState("");
  const [meal, setMeal] = useState("Meal Type");
  const [dish, setDish] = useState("Dish Type");
  const [cuisine, setCuisine] = useState("Cuisine");
  const [showFavorites, setShowFavorites] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const BASE_URL =
    "https://api.edamam.com/api/recipes/v2?type=public&app_id=eafc061e&app_key=a5794987f811b6ea660835e57fcc3b19&field=uri&field=label&field=image&field=source&field=url&field=yield&field=healthLabels&field=ingredientLines&field=calories&field=cuisineType&field=mealType&field=dishType&field=totalNutrients&field=totalDaily";
  const cuisineTypes = [
    "American",
    "Asian",
    "British",
    "Carribean",
    "Central Europe",
    "Chinese",
    "Eastern Europe",
    "French",
    "Indian",
    "Italian",
    "Japanese",
    "Kosher",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Nordic",
    "South American",
    "South East Asian",
  ];
  const dishTypes = [
    "Biscuit and cookies",
    "Bread",
    "Cereals",
    "Condiments and sauces",
    "Desserts",
    "Drinks",
    "Main course",
    "Pancake",
    "Preps",
    "Salad",
    "Sandwiches",
    "Side dish",
    "Soup",
    "Starter",
    "Sweets",
  ];
  const mealTypes = ["Breakfast", "Dinner", "Lunch", "Snack", "Teatime"];
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        if (isLoggedIn) {
          if (showFavorites) {
            const response = await getFavoriteRecipes();
            setRecipes(response);
          } else {
            const response = await axios.get(
              `${BASE_URL}&q=${keyword}${
                meal !== "Meal Type" ? `&mealType=${meal}` : ""
              }
              ${dish !== "Dish Type" ? `&dishType=${dish}` : ""}
              ${cuisine !== "Cuisine" ? `&cuisineType=${cuisine}` : ""}`
            );
            setRecipes(response.data.hits);
            setRecipesCopy(response.data);
          }
        }
        setLoading(false);
      } catch (error) {
        if (error.response.data.message === "jwt expired") {
          localStorage.removeItem("token-auth");
          setLoggedIn();
          window.location.reload(true);
          alert(`Session expired`);
        }
      }
    };
    fetchRecipes();
    // eslint-disable-next-line
  }, [isLoggedIn, keyword, showFavorites, meal, dish, cuisine]);

  // Function for searching recipe names
  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(searchQuery);
    setShowFavorites(false);
  };

  // Handle page change
  const handleLoadMore = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${recipesCopy._links.next.href}`);
      setRecipes((prevRecipes) => [...prevRecipes, ...response.data.hits]);
      setRecipesCopy(response.data);
      setLoading(false);
    } catch (error) {}
  };

  // Function for filtering recipes based on meal type
  const filterMeal = useCallback((meal) => {
    setMeal(meal);
  }, []);

  // Function for filtering recipes based on dish type
  const filterDish = useCallback((dish) => {
    setDish(dish);
  }, []);

  // Function for filtering recipes based on cuisine
  const filterCuisine = useCallback((cuisine) => {
    setCuisine(cuisine);
  }, []);

  if (!recipes) {
    return null;
  }

  if (isLoading) {
    return (
      <img src={spinner} className="loading-image" alt="cooking cat gif" />
    );
  }

  return (
    <div className="recipes-container">
      <div className="recipes-btn-container">
        <div>
          {isLoggedIn ? (
            <div className="btn-favorite">
              <input
                type="checkbox"
                className="btn-check"
                id="btncheck"
                onClick={() => {
                  setShowFavorites(!showFavorites);
                  setRecipes([]);
                }}
              ></input>
              <label
                className={
                  !showFavorites ? "btn btn-outline-danger" : "btn btn-danger"
                }
                htmlFor="btncheck"
              >
                Show Favorites
              </label>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="search-btn">
          {!showFavorites && (
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                value={searchQuery}
                placeholder="Find the recipe you're looking for"
                aria-label="Search"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="btn btn-outline-danger"
                type="submit"
                onClick={handleSearch}
              >
                Search
              </button>
            </form>
          )}
        </div>
      </div>
      {!showFavorites && (
        <div className="filter-btn-grp">
          <FilterMeal
            categories={mealTypes}
            filterMeal={filterMeal}
            meal={meal}
          />
          <FilterDish
            categories={dishTypes}
            filterDish={filterDish}
            dish={dish}
          />
          <FilterCuisine
            categories={cuisineTypes}
            filterCuisine={filterCuisine}
            cuisine={cuisine}
          />
        </div>
      )}
      <h2 className="text-danger" style={{ textTransform: "capitalize" }}>
        {showFavorites ? "Favorite Recipes" : keyword}
      </h2>
      <div className="recipes-item-container">
        {recipes.map((recipe) => {
          const recipeData = showFavorites ? recipe : recipe.recipe;
          return <RecipeCard key={recipeData.uri} details={recipeData} />;
        })}
      </div>
      {/* Pagination */}
      {recipes.length === 0 ||
      recipesCopy._links.next === undefined ||
      showFavorites === true ? undefined : (
        <button
          className="btn btn-danger"
          style={{ width: "200px" }}
          onClick={handleLoadMore}
        >
          Load More
        </button>
      )}
    </div>
  );
}

export default Recipes;
