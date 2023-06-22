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
  const [recipe, setRecipe] = useState();
  const [userDetails] = useContext(UserDetailsContext);
  const [responseMessage, setResponseMessage] = useState("");
  const tokenExists = localStorage.getItem("token-auth");
  const BASE_URL =
    "https://api.edamam.com/api/recipes/v2/by-uri?type=public&app_id=eafc061e&app_key=a5794987f811b6ea660835e57fcc3b19&field=uri&field=label&field=image&field=source&field=url&field=yield&field=healthLabels&field=ingredientLines&field=calories&field=cuisineType&field=mealType&field=dishType&field=totalNutrients&field=totalDaily&uri=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23";

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${BASE_URL}${id}`);
        setRecipe(response.data.hits[0].recipe);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [id, tokenExists]);

  console.log(recipe);
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
            <h1>{recipe.label}</h1>
            <div className="recipe-content">
              <div className="badge-container">
                <p className="badge rounded-pill text-bg-danger">
                  {recipe.mealType}
                </p>
                <p className="badge rounded-pill text-bg-danger">
                  {recipe.dishType}
                </p>
                <p className="badge rounded-pill text-bg-danger">
                  {recipe.cuisineType}
                </p>
              </div>
              <div className="recipe-summary">
                <div className="recipe-labels">
                  <p className="recipe-info">Yield: {recipe.yield}</p>
                  <p className="recipe-info">
                    Calories: {Math.floor(recipe.calories / recipe.yield)}
                  </p>
                  <p className="healthLabels">
                    {recipe.healthLabels.join(" | ")}
                  </p>
                </div>
                <div className="recipe-image">
                  <img
                    src={recipe.image !== "" ? recipe.image : imagePlaceholder}
                    alt="placeholder"
                  />
                </div>
              </div>
            </div>
            <div className="recipe-ingredients">
              <h2>Ingredients</h2>
              <ul>
                {recipe.ingredientLines.map((ingredients) => {
                  return <li key={ingredients}>{ingredients}</li>;
                })}
              </ul>
            </div>
            <div className="recipe-instructions">
              <h2>{`Preparation:`}</h2>
              <button
                className="btn btn-danger ms-2"
                onClick={() => window.open(recipe.url, "_blank")}
              >
                Instructions on {recipe.source}
              </button>
            </div>
            <div className="recipe-notes">
              <h2>Source: {recipe.source}</h2>
            </div>
          </div>

          <div className="right-column">
            <div className="back-btn">
              <NavLink to="/recipes">
                <img
                  src={backImg}
                  width="30"
                  alt="icon of back"
                  style={{ border: "none" }}
                ></img>
              </NavLink>
            </div>
            <div className="recipe-nutrition">
              <h2 style={{ textAlign: "center" }}>Nutrition Facts</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">
                      {recipe.totalNutrients.FAT?.label || ""}
                    </th>
                    <th scope="col">
                      {`
                      ${Math.floor(
                        (recipe.totalNutrients.FAT?.quantity || 0) /
                          recipe.yield
                      )}${recipe.totalNutrients.FAT?.unit || ""}`}
                    </th>
                    <th scope="col">
                      {" "}
                      {`
                      ${Math.floor(
                        (recipe.totalDaily.FAT?.quantity || 0) / recipe.yield
                      )}${recipe.totalDaily.FAT?.unit || ""}`}
                    </th>
                  </tr>
                  <tr>
                    <td>
                      <span style={{ marginLeft: "20px" }} />
                      {recipe.totalNutrients.FASAT?.label || ""}
                    </td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalNutrients.FASAT?.quantity || 0) /
                          recipe.yield
                      )}${recipe.totalNutrients.FASAT?.unit || ""}`}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalDaily.FASAT?.quantity || 0) / recipe.yield
                      )}${recipe.totalDaily.FASAT?.unit || "%"}`}</td>
                  </tr>
                  <tr>
                    <td>
                      <span style={{ marginLeft: "20px" }} />
                      {recipe.totalNutrients.FATRN?.label || "Trans"}
                    </td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalNutrients.FATRN?.quantity || 0) /
                          recipe.yield
                      )}${recipe.totalNutrients.FATRN?.unit || "g"}`}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalDaily.FATRN?.quantity || 0) / recipe.yield
                      )}${recipe.totalDaily.FATRN?.unit || "%"}`}</td>
                  </tr>
                  <tr>
                    <td>
                      <span style={{ marginLeft: "20px" }} />
                      {recipe.totalNutrients.FAMS?.label || ""}
                    </td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalNutrients.FAMS?.quantity || 0) /
                          recipe.yield
                      )}${recipe.totalNutrients.FAMS?.unit || ""}`}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalDaily.FAMS?.quantity || 0) / recipe.yield
                      )}${recipe.totalDaily.FAMS?.unit || "%"}`}</td>
                  </tr>
                  <tr>
                    <td>
                      <span style={{ marginLeft: "20px" }} />
                      {recipe.totalNutrients.FAPU?.label || "Trans"}
                    </td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalNutrients.FAPU?.quantity || 0) /
                          recipe.yield
                      )}${recipe.totalNutrients.FAPU?.unit || ""}`}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalDaily.FAPU?.quantity || 0) / recipe.yield
                      )}${recipe.totalDaily.FAPU?.unit || "%"}`}</td>
                  </tr>
                  <tr>
                    <th scope="col">
                      {recipe.totalNutrients.CHOCDF?.label || ""}
                    </th>
                    <th scope="col">
                      {`
                      ${Math.floor(
                        (recipe.totalNutrients.CHOCDF?.quantity || 0) /
                          recipe.yield
                      )}${recipe.totalNutrients.CHOCDF?.unit || ""}`}
                    </th>
                    <th scope="col">
                      {" "}
                      {`
                      ${Math.floor(
                        (recipe.totalDaily.CHOCDF?.quantity || 0) / recipe.yield
                      )}${recipe.totalDaily.CHOCDF?.unit || ""}`}
                    </th>
                  </tr>
                  <tr>
                    <td>
                      <span style={{ marginLeft: "20px" }} />
                      {recipe.totalNutrients["CHOCDF.net"]?.label || ""}
                    </td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalNutrients["CHOCDF.net"]?.quantity || 0) /
                          recipe.yield
                      )}${
                      recipe.totalNutrients["CHOCDF.net"]?.unit || ""
                    }`}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalDaily["CHOCDF.net"]?.quantity || 0) /
                          recipe.yield
                      )}${recipe.totalDaily["CHOCDF.net"]?.unit || "%"}`}</td>
                  </tr>
                  <tr>
                    <td>
                      <span style={{ marginLeft: "20px" }} />
                      {recipe.totalNutrients.FIBTG?.label || ""}
                    </td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalNutrients.FIBTG?.quantity || 0) /
                          recipe.yield
                      )}${recipe.totalNutrients.FIBTG?.unit || ""}`}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalDaily.FIBTG?.quantity || 0) / recipe.yield
                      )}${recipe.totalDaily.FIBTG?.unit || "%"}`}</td>
                  </tr>
                  <tr>
                    <td>
                      <span style={{ marginLeft: "20px" }} />
                      {recipe.totalNutrients.SUGAR?.label || ""}
                    </td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalNutrients.SUGAR?.quantity || 0) /
                          recipe.yield
                      )}${recipe.totalNutrients.SUGAR?.unit || ""}`}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalDaily.SUGAR?.quantity || 0) / recipe.yield
                      )}${recipe.totalDaily.SUGAR?.unit || "%"}`}</td>
                  </tr>
                  <tr>
                    <td>
                      <span style={{ marginLeft: "20px" }} />
                      {recipe.totalNutrients["SUGAR.added"]?.label ||
                        "Sugars, added"}
                    </td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalNutrients["SUGAR.added"]?.quantity || 0) /
                          recipe.yield
                      )}${
                      recipe.totalNutrients["SUGAR.added"]?.unit || "g"
                    }`}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalDaily["SUGAR.added"]?.quantity || 0) /
                          recipe.yield
                      )}${recipe.totalDaily["SUGAR.added"]?.unit || "%"}`}</td>
                  </tr>
                  <tr>
                    <td>{recipe.totalNutrients.PROCNT?.label || ""}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalNutrients.PROCNT?.quantity || 0) /
                          recipe.yield
                      )}${recipe.totalNutrients.PROCNT?.unit || ""}`}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalDaily.PROCNT?.quantity || 0) / recipe.yield
                      )}${recipe.totalDaily.PROCNT?.unit || "%"}`}</td>
                  </tr>
                  <tr>
                    <td>{recipe.totalNutrients.CHOLE?.label || ""}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalNutrients.CHOLE?.quantity || 0) /
                          recipe.yield
                      )}${recipe.totalNutrients.CHOLE?.unit || ""}`}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalDaily.CHOLE?.quantity || 0) / recipe.yield
                      )}${recipe.totalDaily.CHOLE?.unit || "%"}`}</td>
                  </tr>
                  <tr>
                    <td>{recipe.totalNutrients.NA?.label || ""}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalNutrients.NA?.quantity || 0) / recipe.yield
                      )}${recipe.totalNutrients.NA?.unit || ""}`}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalDaily.NA?.quantity || 0) / recipe.yield
                      )}${recipe.totalDaily.NA?.unit || "%"}`}</td>
                  </tr>
                  <tr>
                    <td>{recipe.totalNutrients.CA?.label || ""}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalNutrients.CA?.quantity || 0) / recipe.yield
                      )}${recipe.totalNutrients.CA?.unit || ""}`}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalDaily.CA?.quantity || 0) / recipe.yield
                      )}${recipe.totalDaily.CA?.unit || "%"}`}</td>
                  </tr>
                  <tr>
                    <td>{recipe.totalNutrients.MG?.label || ""}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalNutrients.MG?.quantity || 0) / recipe.yield
                      )}${recipe.totalNutrients.MG?.unit || ""}`}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalDaily.MG?.quantity || 0) / recipe.yield
                      )}${recipe.totalDaily.MG?.unit || "%"}`}</td>
                  </tr>
                  <tr>
                    <td>{recipe.totalNutrients.K?.label || ""}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalNutrients.K?.quantity || 0) / recipe.yield
                      )}${recipe.totalNutrients.K?.unit || ""}`}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalDaily.K?.quantity || 0) / recipe.yield
                      )}${recipe.totalDaily.K?.unit || "%"}`}</td>
                  </tr>
                  <tr>
                    <td>{recipe.totalNutrients.FE?.label || ""}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalNutrients.FE?.quantity || 0) / recipe.yield
                      )}${recipe.totalNutrients.FE?.unit || ""}`}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalDaily.FE?.quantity || 0) / recipe.yield
                      )}${recipe.totalDaily.FE?.unit || "%"}`}</td>
                  </tr>
                  <tr>
                    <td>{recipe.totalNutrients.ZN?.label || ""}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalNutrients.ZN?.quantity || 0) / recipe.yield
                      )}${recipe.totalNutrients.ZN?.unit || ""}`}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalDaily.ZN?.quantity || 0) / recipe.yield
                      )}${recipe.totalDaily.ZN?.unit || "%"}`}</td>
                  </tr>
                  <tr>
                    <td>{recipe.totalNutrients.P?.label || ""}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalNutrients.P?.quantity || 0) / recipe.yield
                      )}${recipe.totalNutrients.P?.unit || ""}`}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalDaily.P?.quantity || 0) / recipe.yield
                      )}${recipe.totalDaily.P?.unit || "%"}`}</td>
                  </tr>
                  <tr>
                    <td>{recipe.totalNutrients.VITA_RAE?.label || ""}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalNutrients.VITA_RAE?.quantity || 0) /
                          recipe.yield
                      )}${recipe.totalNutrients.VITA_RAE?.unit || ""}`}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalDaily.VITA_RAE?.quantity || 0) /
                          recipe.yield
                      )}${recipe.totalDaily.VITA_RAE?.unit || "%"}`}</td>
                  </tr>
                  <tr>
                    <td>{recipe.totalNutrients.VITC?.label || ""}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalNutrients.VITC?.quantity || 0) /
                          recipe.yield
                      )}${recipe.totalNutrients.VITC?.unit || ""}`}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalDaily.VITC?.quantity || 0) / recipe.yield
                      )}${recipe.totalDaily.VITC?.unit || "%"}`}</td>
                  </tr>
                  <tr>
                    <td>{recipe.totalNutrients.THIA?.label || ""}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalNutrients.THIA?.quantity || 0) /
                          recipe.yield
                      )}${recipe.totalNutrients.THIA?.unit || ""}`}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalDaily.THIA?.quantity || 0) / recipe.yield
                      )}${recipe.totalDaily.THIA?.unit || "%"}`}</td>
                  </tr>
                  <tr>
                    <td>{recipe.totalNutrients.RIBF?.label || ""}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalNutrients.RIBF?.quantity || 0) /
                          recipe.yield
                      )}${recipe.totalNutrients.RIBF?.unit || ""}`}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalDaily.RIBF?.quantity || 0) / recipe.yield
                      )}${recipe.totalDaily.RIBF?.unit || "%"}`}</td>
                  </tr>
                  <tr>
                    <td>{recipe.totalNutrients.NIA?.label || ""}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalNutrients.NIA?.quantity || 0) /
                          recipe.yield
                      )}${recipe.totalNutrients.NIA?.unit || ""}`}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalDaily.NIA?.quantity || 0) / recipe.yield
                      )}${recipe.totalDaily.NIA?.unit || "%"}`}</td>
                  </tr>
                  <tr>
                    <td>{recipe.totalNutrients.VITB6A?.label || ""}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalNutrients.VITB6A?.quantity || 0) /
                          recipe.yield
                      )}${recipe.totalNutrients.VITB6A?.unit || ""}`}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalDaily.VITB6A?.quantity || 0) / recipe.yield
                      )}${recipe.totalDaily.VITB6A?.unit || "%"}`}</td>
                  </tr>
                  <tr>
                    <td>{recipe.totalNutrients.FOLDFE?.label || ""}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalNutrients.FOLDFE?.quantity || 0) /
                          recipe.yield
                      )}${recipe.totalNutrients.FOLDFE?.unit || ""}`}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalDaily.FOLDFE?.quantity || 0) / recipe.yield
                      )}${recipe.totalDaily.FOLDFE?.unit || "%"}`}</td>
                  </tr>
                  <tr>
                    <td>{recipe.totalNutrients.FOLFD?.label || ""}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalNutrients.FOLFD?.quantity || 0) /
                          recipe.yield
                      )}${recipe.totalNutrients.FOLFD?.unit || ""}`}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalDaily.FOLFD?.quantity || 0) / recipe.yield
                      )}${recipe.totalDaily.FOLFD?.unit || "%"}`}</td>
                  </tr>
                  <tr>
                    <td>{recipe.totalNutrients.VITB12?.label || ""}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalNutrients.VITB12?.quantity || 0) /
                          recipe.yield
                      )}${recipe.totalNutrients.VITB12?.unit || ""}`}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalDaily.VITB12?.quantity || 0) / recipe.yield
                      )}${recipe.totalDaily.VITB12?.unit || "%"}`}</td>
                  </tr>
                  <tr>
                    <td>{recipe.totalNutrients.VITD?.label || ""}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalNutrients.VITD?.quantity || 0) /
                          recipe.yield
                      )}${recipe.totalNutrients.VITD?.unit || ""}`}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalDaily.VITD?.quantity || 0) / recipe.yield
                      )}${recipe.totalDaily.VITD?.unit || "%"}`}</td>
                  </tr>
                  <tr>
                    <td>{recipe.totalNutrients.TOCPHA?.label || ""}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalNutrients.TOCPHA?.quantity || 0) /
                          recipe.yield
                      )}${recipe.totalNutrients.TOCPHA?.unit || ""}`}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalDaily.TOCPHA?.quantity || 0) / recipe.yield
                      )}${recipe.totalDaily.TOCPHA?.unit || "%"}`}</td>
                  </tr>
                  <tr>
                    <td>{recipe.totalNutrients.VITK1?.label || ""}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalNutrients.VITK1?.quantity || 0) /
                          recipe.yield
                      )}${recipe.totalNutrients.VITK1?.unit || ""}`}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalDaily.VITK1?.quantity || 0) / recipe.yield
                      )}${recipe.totalDaily.VITK1?.unit || "%"}`}</td>
                  </tr>
                  <tr>
                    <td>
                      {recipe.totalNutrients["SUGAR.alcohol"]?.label ||
                        "Sugar alcohols"}
                    </td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalNutrients["SUGAR.alcohol"]?.quantity ||
                          0) / recipe.yield
                      )}${
                      recipe.totalNutrients["SUGAR.alcohol"]?.unit || "g"
                    }`}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalDaily["SUGAR.alcohol"]?.quantity || 0) /
                          recipe.yield
                      )}${
                      recipe.totalDaily["SUGAR.alcohol"]?.unit || "%"
                    }`}</td>
                  </tr>
                  <tr>
                    <td>{recipe.totalNutrients.WATER?.label || ""}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalNutrients.WATER?.quantity || 0) /
                          recipe.yield
                      )}${recipe.totalNutrients.WATER?.unit || ""}`}</td>
                    <td>{`
                      ${Math.floor(
                        (recipe.totalDaily.WATER?.quantity || 0) / recipe.yield
                      )}${recipe.totalDaily.WATER?.unit || "%"}`}</td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecipePage;
