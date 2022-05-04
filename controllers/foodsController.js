/* === Config === */
const express = require("express");
const router = express.Router();
const Food = require("../models/Food");

/* === Routes === */
// INDEX -- get all.
router.get("/", (request, response, next) =>
{
  Food.find()
    .then((foods) => response.json(foods))
    .catch(next);
});

// SHOW -- get by id.
router.get("/:id", (request, response, next) =>
{
  Food.findById(request.params.id)
    .then((food) => response.json(food))
    .catch(next);
});

// CREATE -- add new.
router.post("/", (request, response, next) =>
{
  Food.create(request.body)
    .then((newFood) => response.json(newFood))
    .catch(next);
});

// DELETE -- remove by id.
router.delete("/:id", (request, response, next) =>
{
  Food.findByIdAndDelete(request.params.id)
    .then((food) => response.json(food))
    .catch(next);
});

module.exports = router;