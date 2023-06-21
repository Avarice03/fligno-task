import React, { useContext, useState } from "react";
import imagePlaceholder from "./images/photo.png";
import { useNavigate } from "react-router-dom";
import { UserDetailsContext } from "./providers/UserDetailsProvider";
import { addFavorite, removeFavorite } from "./services/RecipesService";

function RecipeCard({ id, image, name, calories, servings, source, details }) {
  const [userDetails] = useContext(UserDetailsContext);
  const [isFavorite, setIsFavorite] = useState(
    userDetails.favoriteRecipes.some((recipe) => {
      return recipe.uri === details.uri;
    })
  );
  const navigate = useNavigate();

  if (!userDetails) {
    return null;
  }

  const toggleFavorite = async () => {
    const recipe = details;
    console.log(userDetails);
    if (isFavorite) {
      try {
        await removeFavorite(recipe);
        setIsFavorite(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await addFavorite(recipe);
        setIsFavorite(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const showRecipe = (id) => {
    navigate(`/recipe/${id}`);
  };

  return (
    <div className="card-wrapper col-6 col-sm-4 col-md-3 d-flex">
      <div className="card flex-fill" style={{ backgroundColor: "#fff5e4" }}>
        <div className="position-relative">
          <i
            className={`bi ${
              isFavorite ? "bi-star-fill" : "bi-star"
            } position-absolute top-0 end-0 p-2`}
            style={{ color: "gold", fontSize: "30px", cursor: "pointer" }}
            onClick={toggleFavorite}
          ></i>
        </div>
        <img
          src={image !== "" ? image : imagePlaceholder}
          className="card-img-top"
          alt="recipe thumbnail"
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-center">{name}</h5>
          <div className="mt-auto">
            <p className="card-text text-center">
              <span className="text-danger">
                {Math.floor(calories / servings)}{" "}
              </span>
              Calories | <span className="text-danger">{servings} </span>
              Servings
            </p>
            <div className="card-footer text-body-secondary">{source}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
