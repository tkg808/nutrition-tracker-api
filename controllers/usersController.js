const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Handles hashing.
const bcrypt = require("bcrypt");

// Import errors.
const { handleExistingUser } = require("../middleware/custom_errors");

// POST -- sign up
router.post("/signup", (request, response, next) =>
{
  // Check if username or email is already taken.
  User.findOne(
    {
      $or:
        [
          { username: request.body.username },
          { email: request.body.email }
        ]
    })
    .then(handleExistingUser)
    .then(() => bcrypt.hash(request.body.password, 10))
    // Returns a new object with the email and hashed password.
    .then((hash) =>
    // Parentheses needed to read curly braces as object and not function block.
    ({
      username: request.body.username,
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
  User.findOne({ username: request.body.username })
    // Try to create token with user and the request => Send token to client or throw error.
    .then((user) => createUserToken(request, user))
    .then((token) => response.json({ token }))
    .catch(next);
});

module.exports = router;