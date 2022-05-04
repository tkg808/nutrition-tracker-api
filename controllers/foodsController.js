/* === Config === */
const express = require("express");
const router = express.Router();
const Food = require("../models/Food");

// Import errors.
const {
  handleValidateId,
  handleRecordExists,
  handleValidateOwnership
} = require("../middleware/custom_errors");

// Import for tokens.
const { requireToken } = require("../middleware/auth");

/* === Routes === */
// INDEX -- get all.
router.get("/", requireToken, (request, response, next) =>
{
  Food.find()
    .then((foods) => response.json(foods))
    .catch(next);
});

// SHOW -- get by id.
router.get("/:id", requireToken, (request, response, next) =>
{
  Food.findById(request.params.id)
    .then((food) => response.json(food))
    .catch(next);
});

// CREATE -- add new.
router.post("/", requireToken, (request, response, next) =>
{
  Food.create(request.body)
    .then((newFood) => response.json(newFood))
    .catch(next);
});

// EDIT -- update.
router.put("/:id", requireToken, (request, response, next) =>
{
  Food.findByIdAndUpdate(request.params.id, request.body, { new: true })
    .then((food) => response.json(food))
    .catch(next);
});

// DELETE -- remove by id.
router.delete("/:id", requireToken, (request, response, next) =>
{
  Food.findByIdAndDelete(request.params.id)
    .then((food) => response.json(food))
    .catch(next);
});

module.exports = router;