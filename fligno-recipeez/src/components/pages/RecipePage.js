import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import backImg from "../images/back.png";
import { UserContext } from "../providers/User";
import imagePlaceholder from "../images/photo.png";
import { UserDetailsContext } from "../providers/UserDetailsProvider";
import axios from "axios";
import spinner from "../images/loading.gif";

// Recipe page for RecipeEZ
function RecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoggedIn] = useContext(UserContext);
  // const recipe = recipes.find((recipe) => recipe._id == id);
  const [recipe, setRecipe] = useState();
  const [userDetails] = useContext(UserDetailsContext);
  const [responseMessage, setResponseMessage] = useState("");
  const tokenExists = localStorage.getItem("token-auth");

  // useEffect(() => {
  //   const fetch = async () => {
  //     try {
  //       if (tokenExists) {
  //         axios.defaults.headers.common[
  //           "Authorization"
  //         ] = `Bearer ${tokenExists}`;
  //       }
  //       const data = await getRecipe(id);
  //       setRecipe(data);
  //       setResponseMessage(data.message);
  //     } catch (error) {
  //       console.log(error);
  //       setResponseMessage(error.response.data.message);
  //     }
  //   };
  //   fetch();
  // }, [id, tokenExists]);

  if (!recipe) {
    return (
      <img src={spinner} className="loading-image" alt="cooking cat gif" />
    );
  }

  if (isLoggedIn && !userDetails) {
    return (
      <img src={spinner} className="loading-image" alt="cooking cat gif" />
    );
  }

  return (
    <>
      <div className="recipePage-container">
        <div className="column-containers">
          <div className="left-column">
            <h1>{recipe.name}</h1>
            <div className="recipe-content">
              <p className="badge rounded-pill text-bg-danger">
                {recipe.category}
              </p>
              <p>Servings: {recipe.servings}</p>
              <p>Cuisine: {recipe.cuisine}</p>
              <p>{recipe.description}</p>
            </div>
            <div className="recipe-ingredients">
              <h2>Ingredients:</h2>
              <ul>
                {recipe.ingredients.map((ingredients) => {
                  return <li key={ingredients}>{ingredients}</li>;
                })}
              </ul>
            </div>
            <div className="recipe-instructions">
              <h2>Instructions:</h2>
              <ol>
                {recipe.instructions.map((instructions) => {
                  return <li key={instructions}>{instructions}</li>;
                })}
              </ol>
            </div>
          </div>
          <div className="right-column">
            <div className="back-btn">
              {/* <div className="edit-btn">
                {isLoggedIn && userDetails.recipes.includes(id) ? (
                  <button
                    className="btn btn-outline-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteModal"
                  >
                    Delete Recipe
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div className="edit-btn">
                {isLoggedIn && userDetails.recipes.includes(id) ? (
                  <button
                    className="btn btn-secondary"
                    onClick={() => navigate(`/recipe/${id}/edit-recipe`)}
                  >
                    Edit
                  </button>
                ) : (
                  ""
                )}
              </div> */}
              <NavLink to="/recipes">
                <img
                  src={backImg}
                  width="30"
                  alt="icon of back"
                  style={{ border: "none" }}
                ></img>
              </NavLink>
            </div>
            <div className="recipe-image">
              <img
                src={recipe.image !== "" ? recipe.image : imagePlaceholder}
                alt="placeholder"
              />
            </div>
            <div className="recipe-notes">
              <h2>Notes:</h2>
              <p>{recipe.notes}</p>
            </div>
          </div>
        </div>
      </div>
      {/* <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="deleteModalLabel">
                {`Are you sure you want to delete this recipe?`}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h2>{recipe.name}</h2>
            </div>
            <div className="modal-footer">
              <div>
                <p>{responseMessage}</p>
              </div>
              <div className="modal-buttons">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={handleDelete}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  data-bs-dismiss="modal"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default RecipePage;
