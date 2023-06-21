const express = require("express");
const { config } = require("dotenv");
const jwt = require("jsonwebtoken");
const router = express.Router();

config();
const secret = process.env.SECRET;
const recipeController = require("../controllers/recipesController");

router.use("/", (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const verified = jwt.verify(token, secret);
  try {
    if (verified) {
      tokenExists = true;
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(401);
  }
});

// GET api/v1/recipes (Get user favorite recipes)
router.get("/", recipeController.getFavorites);

// POST api/v1/recipes (Favorite recipe)
router.post("/", recipeController.addFavoriteRecipe);

// PUT api/v1/recipes (Unfavorite recipe)
router.put("/", recipeController.removeFavorite);

module.exports = router;
