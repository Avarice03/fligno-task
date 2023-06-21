const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const { config } = require("dotenv");
const cors = require("cors");

config();

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const port = process.env.PORT;
const database = process.env.DATABASE;

const app = express();

const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/users");
const recipeRouter = require("./routes/recipes");
const HttpError = require("./models/httpError");

// Middleware to parse incoming request bodies
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/signup", signupRouter);
app.use("/api/v1/login", loginRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/recipes", recipeRouter);

// Handling unknown routes
app.use((req, res, next) => {
  return next(new HttpError("Route not found", 404));
});

// Error handling
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  // If no header was sent, error exists
  res
    .status(error.code || 500)
    .json({ message: error.message || "Unknown Error" });
});

mongoose
  .connect(
    `mongodb+srv://${dbHost}:${dbPort}/${database}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
