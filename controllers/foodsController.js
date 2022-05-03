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

// SHOW -- get by id.
router.get("/:id", (request, response) =>
{
  Food.findById(request.params.id)
    .then((food) => response.json(food))
    .catch(console.error);
});

// CREATE -- add new.
router.post("/", (request, response) =>
{
  Food.create(request.body)
    .then((newFood) => response.json(newFood))
    .catch(console.error);
});

// DELETE -- remove by id.
router.delete("/:id", (request, response) =>
{
  Food.findByIdAndDelete(request.params.id)
    .then((food) => response.json(food))
    .catch(console.error);
});

module.exports = router;