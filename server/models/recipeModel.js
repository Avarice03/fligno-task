const mongoose = require("mongoose");

// Defining a schema
const recipeSchema = new mongoose.Schema({
  uri: String,
  label: String,
  image: String,
  source: String,
  url: String,
  yield: Number,
  healthLabels: Array,
  ingredientLines: Array,
  calories: Number,
  cuisineType: Array,
  mealType: Array,
  dishType: Array,
  totalNutrients: Object,
  totalDaily: Object,
});

// Defining a model
const Recipe = mongoose.model("Recipe", recipeSchema, "recipes");

module.exports = Recipe;
