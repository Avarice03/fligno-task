import React from "react";
import Navigation from "../Navigation";
import { Outlet } from "react-router-dom";
import "../stylesheets/Layout.css";

 // Layout for RecipeEZ
function MainLayout() {
  return (
    <div className="layout-container">
      <div className="navigation-container">
        <Navigation/>
      </div>
      <div className="main-container">
        <Outlet/>
      </div>
      <div className="footer-container">
        <small>Uplift Code Camp</small>
        {/* <small>Recipes from <a href="https://www.allrecipes.com/" style={{color: "#dc3545"}}>allrecipes.com</a> </small> */}
        <small>Icons by Freepik, Mark, Wahyu Adam from <a href="https://www.flaticon.com/" style={{color: "#dc3545"}}>Flaticons.com</a></small>
      </div>
    </div>
  );
}

export default MainLayout;
