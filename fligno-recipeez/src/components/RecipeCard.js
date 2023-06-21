import React, { useState } from "react";
import imagePlaceholder from "./images/photo.png";
import { useNavigate } from "react-router-dom";

function RecipeCard({ id, image, name, calories, servings, source }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const toggleFavorite = () => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
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
