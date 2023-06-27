import React, { useContext, useState } from "react";
import imagePlaceholder from "./images/photo.png";
import { useNavigate } from "react-router-dom";
import { UserDetailsContext } from "./providers/UserDetailsProvider";
import {
  addFavorite,
  getUserDetails,
  removeFavorite,
} from "./services/RecipesService";

function RecipeCard({ details }) {
  const [userDetails, setUserDetails] = useContext(UserDetailsContext);
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
    if (isFavorite) {
      try {
        await removeFavorite(recipe);
        setIsFavorite(false);
      } catch (error) {}
    } else {
      try {
        await addFavorite(recipe);
        setIsFavorite(true);
      } catch (error) {}
    }
    const data = await getUserDetails();
    setUserDetails(data);
    // setUserDetails({ ...userDetails });
  };

  const showRecipe = () => {
    const uri = details.uri;
    const id = uri.substring(uri.lastIndexOf("#") + 1);
    navigate(`/recipe/${id}`);
  };

  return (
    <div className="card-wrapper col-6 col-sm-4 col-md-3 d-flex">
      <div
        className="card flex-fill"
        style={{ backgroundColor: "#fff5e4" }}
        onClick={showRecipe}
      >
        <div className="position-relative">
          <i
            className={`bi ${
              isFavorite ? "bi-star-fill" : "bi-star"
            } position-absolute top-0 end-0 p-2`}
            style={{
              color: "gold",
              fontSize: "30px",
              cursor: "pointer",
              zIndex: 10,
            }}
            onClick={(event) => {
              event.stopPropagation();
              toggleFavorite();
            }}
          ></i>
        </div>
        <img
          src={details.image !== "" ? details.image : imagePlaceholder}
          className="card-img-top"
          alt="recipe thumbnail"
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-center">{details.label}</h5>
          <div className="mt-auto">
            <p className="card-text text-center">
              <span className="text-danger">
                {Math.floor(details.calories / details.yield)}{" "}
              </span>
              Calories | <span className="text-danger">{details.yield} </span>
              Servings
            </p>
            <div className="card-footer text-body-secondary">
              {details.source}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
