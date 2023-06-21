import React, { useCallback, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FilterCategory from "../FilterCategory";
import axios from "axios";
import { UserContext } from "../providers/User";
import spinner from "../images/loading.gif";
import RecipeCard from "../RecipeCard";

// Recipes Home page for RecipeEZ
function Recipes() {
  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useContext(UserContext);
  const [recipes, setRecipes] = useState();
  const [recipesCopy, setRecipesCopy] = useState([]);
  const [category, setCategory] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [keyword, setKeyword] = useState("");
  const [personal, setPersonal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const tokenExists = localStorage.getItem("token-auth");
  const query = new URLSearchParams(useLocation().search);
  let categoryQuery = query.get("category");
  let cuisineQuery = query.get("cuisine");
  const BASE_URL =
    "https://api.edamam.com/api/recipes/v2?type=public&app_id=eafc061e&app_key=a5794987f811b6ea660835e57fcc3b19";
  // const BASE_URL = "http://localhost:3069";

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        if (isLoggedIn) {
          const response = await axios.get(`${BASE_URL}&q=${keyword}`);
          setRecipes(response.data.hits);
          setRecipesCopy(response.data);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
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
  }, [isLoggedIn, keyword]);

  // console.log("Recipes:", recipes);
  // console.log("Recipes:", recipesCopy._links.next.href);

  if (categoryQuery === null) {
    categoryQuery = "";
  }
  if (cuisineQuery === null) {
    cuisineQuery = "";
  }

  // Function for filtering recipes based on category and cuisine
  const filterCategory = useCallback((category, cuisine) => {
    setCategory(category);
    setCuisine(cuisine);
  }, []);

  // Function for removing category tags
  const deleteCategory = () => {
    filterCategory("", cuisine);
    navigate(`/recipes?&cuisine=${cuisine}`);
  };

  // Function for removing cuisine tags
  const deleteCuisine = () => {
    filterCategory(category, "");
    navigate(`/recipes?category=${category}`);
  };

  // Function for searching recipe names
  const handleSearch = (e) => {
    e.preventDefault();
    filterCategory("", "");
    setKeyword(searchQuery);
  };

  if (!recipes) {
    return null;
  }

  // Handle page change
  const handleLoadMore = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${recipesCopy._links.next.href}`);
      setRecipes((prevRecipes) => [...prevRecipes, ...response.data.hits]);
      setRecipesCopy(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <img src={spinner} className="loading-image" alt="cooking cat gif" />
    );
  }

  return (
    <div className="recipes-container">
      <div className="recipes-btn-container">
        <div className="filter-btn-grp">
          {/* <div className="category-btn">
            <FilterCategory
              categories={categories}
              category={category}
              cuisine={cuisine}
              filterCategory={filterCategory}
              label={"Category"}
            />
          </div>
          <div className="cuisine-btn">
            <FilterCategory
              categories={cuisineCategories}
              category={category}
              cuisine={cuisine}
              filterCategory={filterCategory}
              label={"Cuisine"}
            />
          </div> */}
          {isLoggedIn ? (
            <div>
              <input
                type="checkbox"
                className="btn-check"
                id="btncheck"
                onClick={() => setPersonal(!personal)}
              ></input>
              <label
                className={
                  !personal ? "btn btn-outline-danger" : "btn btn-danger"
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
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
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
        </div>
      </div>
      <div className="filters-container">
        {category === "" ? (
          ""
        ) : (
          <button
            className="filter-btn btn btn-outline-danger"
            onClick={deleteCategory}
          >
            <span className="btn-close" style={{ opacity: "0" }}></span>
            {category}
            <span className="btn-close"></span>
          </button>
        )}
        {cuisine === "" ? (
          ""
        ) : (
          <button
            className="filter-btn btn btn-outline-danger"
            onClick={deleteCuisine}
          >
            <span className="btn-close" style={{ opacity: "0" }}></span>
            {cuisine}
            <span className="btn-close"></span>
          </button>
        )}
      </div>
      <h2 className="text-danger" style={{ textTransform: "capitalize" }}>
        {keyword}
      </h2>
      <div className="recipes-item-container">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.recipe.uri}
            // id={recipe._id}
            calories={recipe.recipe.calories}
            servings={recipe.recipe.yield}
            name={recipe.recipe.label}
            image={recipe.recipe.image}
            source={recipe.recipe.source}
          />
        ))}
      </div>
      {/* Pagination */}
      {recipes.length === 0 || recipesCopy._links.next === undefined ? (
        ""
      ) : (
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

//   if (!personal) {
//     axios.defaults.headers.common[
//       "Authorization"
//     ] = `Bearer ${tokenExists}`;
//     const { data } = await axios.get(
//       `${BASE_URL}/v1/recipes/user?category=${categoryQuery}&cuisine=${cuisineQuery}`
//     );
//     setRecipesCopy(data);
//   } else {
//     axios.defaults.headers.common[
//       "Authorization"
//     ] = `Bearer ${tokenExists}`;
//     const { data } = await axios.get(
//       `${BASE_URL}/v1/recipes/user/personal?category=${categoryQuery}&cuisine=${cuisineQuery}`
//     );
//     setRecipesCopy(data);
//   }
// } else {
//   const { data } = await axios.get(
//     `${BASE_URL}/v1/recipes?category=${categoryQuery}&cuisine=${cuisineQuery}`
//   );
//   setRecipesCopy(data);

// Push each category intro  an array
// const categories = recipes.reduce((categories, recipe) => {
//   if (!categories.includes(recipe.category)) {
//     categories.push(recipe.category);
//   }
//   return categories;
// }, []);

// // Push each cuisine intro  an array
// const cuisineCategories = recipes.reduce((cuisines, recipe) => {
//   if (!cuisines.includes(recipe.cuisine)) {
//     cuisines.push(recipe.cuisine);
//   }
//   return cuisines;
// }, []);
