import React from "react";
import imagePlaceholder from "./images/photo.png";
import { useNavigate } from "react-router-dom";

function RecipeButton({ id, image, name }) {
  const navigate = useNavigate();
  const showRecipe = (id) => {
    navigate(`/recipe/${id}`);
  };
  return (
    <>
      <div className="recipe-card">
        <h4>{name}</h4>
        <button className="recipeButton" onClick={() => showRecipe(id)}>
          <img
            className="recipeButtonImg"
            key={id}
            src={image !== "" ? image : imagePlaceholder}
            alt="recipe thumbnail"
          />
        </button>
      </div>
    </>
  );
}

export default RecipeButton;
