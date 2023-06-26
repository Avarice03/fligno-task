const express = require("express");
const { config } = require("dotenv");
const jwt = require("jsonwebtoken");
const router = express.Router();

config();

const secret = process.env.SECRET;

const adminController = require("../controllers/adminController");

router.use("/", (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verified = jwt.verify(token, secret);
    if (verified) {
      if (verified.isAdmin) {
        next();
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.sendStatus(401);
  }
});

// GET api/v1/admin/users (Get all users and their recipes)
router.get("/users", adminController.getAllUsers);

module.exports = router;
