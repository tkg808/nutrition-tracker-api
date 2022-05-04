const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST -- sign up
router.post("/signup", (request, response, next) =>
{
  User.create(request.body)
    .then((user) => response.status(201).json(user))
    .catch(next);
});

// POST -- sign in
router.post("/signin", (request, response, next) => { });

module.exports = router;