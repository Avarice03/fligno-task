import React from "react";
import { NavLink } from "react-router-dom";
import chef from "../images/kobi-chef.png";
import timerImg from "../images/timer.png";
import globalImg from "../images/global.png";
import easyImg from "../images/easy.png";

// Home page for RecipeEZ
function Home() {
  return (
    <div className="home-container">
      <div className="hero-container">
        <div className="hero-content">
          <h2 className="hero-display display-4">
            Be a <span className="text-danger">master chef</span> and explore
            the world of flavors
          </h2>
          <p style={{ marginBottom: "0" }}>
            Want to cook but don't know how to start?
          </p>
          <p>Say no more.</p>
          <div className="btn-grp">
            <button className="start-btn btn btn-danger">
              <NavLink
                to="/login"
                style={{ textDecoration: "none", color: "white" }}
              >
                Get Started
              </NavLink>
            </button>
            <button className="recipe-btn btn btn-outline-danger">
              <NavLink
                to="/recipes"
                className="explore-btn"
                style={{ textDecoration: "none" }}
              >
                <span className="">Explore Recipes</span>
              </NavLink>
            </button>
          </div>
        </div>
        <div className="hero-image">
          <img src={chef} alt="placeholder of a chef"></img>
        </div>
      </div>
      <h4>
        Your Favorite Food Companion
      </h4>
      <div className="featured-container">
        <div className="featured-item">
          <img src={easyImg} alt="icon portraying easy"></img>
          <p>Easy to Understand</p>
        </div>
        <div className="featured-item">
          <img src={timerImg} alt="icon of timer"></img>
          <p>Cooking Timer</p>
        </div>
        <div className="featured-item">
          <img src={globalImg} alt="icon portraying global"></img>
          <p>Global Cuisine Recipes</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
