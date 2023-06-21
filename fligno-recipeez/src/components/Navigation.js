import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import recipe from "../components/images/recipe.png";
import { UserContext } from "./providers/User";

// Navigation for RecipeEZ
function Navigation() {
  const [isLoggedIn, setLoggedIn] = useContext(UserContext);

  return (
    <div className="header">
      <nav className="navigation navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <div className="title">
            <NavLink to="/" className="navbar-brand mb-0 h1">
              <img src={recipe} alt="icon of a recipe" />
              <span className="app-title">
                Recipe<span className="text-danger">EZ</span>
              </span>
            </NavLink>
          </div>
          <button
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navBar"
            className="navbar-toggler"
            aria-controls="navBar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navBar"
          >
            <ul className="navbar-nav">
              <li className="nav-item active">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/recipes" className="nav-link">
                  Recipes
                </NavLink>
              </li>
              <li className="nav-item ">
                <NavLink to="/timer" className="nav-link">
                  Timer
                </NavLink>
              </li>
              <li className="nav-item ">
                <NavLink to="/contact-me" className="nav-link">
                  Contact
                </NavLink>
              </li>
              <li className="nav-item ">
                <NavLink to="/about-this-app" className="nav-link">
                  About
                </NavLink>
              </li>
              {isLoggedIn ? (
                <li className="nav-item ">
                  <NavLink to="/account" className="nav-link">
                    Account
                  </NavLink>
                </li>
              ) : (
                ""
              )}
              <div className="signin-form">
                <li className="nav-item">
                  {isLoggedIn ? (
                    <button
                      className="login-btn btn rounded-pill btn-danger"
                      style={{ textDecoration: "none", color: "white" }}
                      onClick={() => {
                        localStorage.removeItem("token-auth");
                        setLoggedIn();
                      }}
                    >
                      <NavLink
                        to="/login"
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Logout
                      </NavLink>
                    </button>
                  ) : (
                    <button className="login-btn btn rounded-pill btn-danger">
                      <NavLink
                        to="/login"
                        style={{ textDecoration: "none", color: "white" }}
                        onClick={() => {
                          localStorage.removeItem("token-auth");
                        }}
                      >
                        Sign In
                      </NavLink>
                    </button>
                  )}
                </li>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
