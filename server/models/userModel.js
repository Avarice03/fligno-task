const mongoose = require("mongoose");

// Defining a schema
const userSchema = new mongoose.Schema({
  deletedAt: String,
  isAdmin: Boolean,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  favoriteRecipes: [{ type: mongoose.Types.ObjectId }],
});

// Defining a model
const User = mongoose.model("User", userSchema);

module.exports = User;
