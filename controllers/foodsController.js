/* === Config === */
const express = require("express");
const router = express.Router();
const Food = require("../models/Food");

/* === Routes === */
// INDEX -- get all.
router.get("/", (request, response) =>
{
  Food.find()
    .then((foods) => response.json(foods))
    .catch(console.error);
});

module.exports = router;