const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Handles hashing.
const bcrypt = require("bcrypt");

// POST -- sign up
router.post("/signup", (request, response, next) =>
{
  bcrypt.hash(request.body.password, 10)
    // Returns a new object with the email and hashed password.
    .then((hash) =>
    // Parentheses needed to read curly braces as object and not function block.
    ({
      email: request.body.email,
      password: hash
    })
    )
    .then((user) => User.create(user))
    // The sent user object won't have the password due to virtuals configuration.
    .then((user) => response.status(201).json(user))
    // Pass errors to error handler.
    .catch(next);
});

// Import for tokens.
const { createUserToken } = require("../middleware/auth");

// POST -- sign in
router.post("/login", (request, response, next) =>
{
  // Use email to look for user in database.
  User.findOne({ email: request.body.email })
    // Try to create token with user and the request => Send token to client or throw error.
    .then((user) => createUserToken(request, user))
    .then((token) => response.json({ token }))
    .catch(next);
});

module.exports = router;