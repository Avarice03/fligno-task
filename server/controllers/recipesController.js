const { config } = require("dotenv");
const jwt = require("jsonwebtoken");
const Recipe = require("../models/recipeModel");
const User = require("../models/userModel");
const HttpError = require("../models/httpError");

config();
const secret = process.env.SECRET;

const recipeController = {
  getFavorites: async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const payload = jwt.verify(token, secret);
      const userFavorites = await User.findOne({
        _id: payload._id,
        deletedAt: "",
      }).populate("favoriteRecipes");
      if (!user) {
        return next(new HttpError("User does not exist", 404));
      }
      res.json(userFavorites);
    } catch (error) {
      console.log(error);
    }
  },
  addFavoriteRecipe: async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const payload = jwt.verify(token, secret);
      // Check if user exists
      const user = await User.findById({ _id: payload._id }).populate(
        "favoriteRecipes"
      );

      if (!user) {
        return next(new HttpError("User does not exist", 404));
      }

      const recipeIndex = user.favoriteRecipes.findIndex(
        (recipe) => recipe.uri === req.body.uri
      );

      if (recipeIndex !== -1) {
        throw new HttpError("Recipe already added to favorites", 404);
      }

      const recipe = new Recipe(req.body);
      await recipe.save();

      // Access user
      user.favoriteRecipes.push(recipe._id);
      await user.save();
      res.send(user);
    } catch (error) {
      console.log(error);
      res.status(500).send("Error adding favorite recipe");
    }
  },
  removeFavorite: async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const payload = jwt.verify(token, secret);
      const user = await User.findById({ _id: payload._id }).populate(
        "favoriteRecipes"
      );
      if (!user) {
        return next(new HttpError("User does not exist", 404));
      }

      const recipe = user.favoriteRecipes.find(
        (recipe) => recipe.uri === req.body.uri
      );

      const recipeIndex = user.favoriteRecipes.findIndex(
        (recipe) => recipe.uri === req.body.uri
      );

      if (recipeIndex === -1) {
        throw new HttpError("Recipe does not exist", 404);
      }

      await user.favoriteRecipes.splice(recipeIndex, 1);
      await Recipe.findByIdAndDelete({ _id: recipe._id });
      await user.save();
      res.send("Favorite recipe deleted successfully.");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error removing favorite recipe.");
    }
  },
};

module.exports = recipeController;
