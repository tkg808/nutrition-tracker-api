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
// Only send data that belongs to the user.
router.get("/", requireToken, (request, response, next) =>
{
  Food.find({ owner: request.user._id })
    .then((foods) => response.json(foods))
    .catch(next);
});

// SHOW -- get by id.
// Adding authorization here prevents users from accidentally finding another user's data.
router.get("/:id", handleValidateId, requireToken, (request, response, next) =>
{
  Food.findById(request.params.id)
    .then(handleRecordExists)
    .then((food) => handleValidateOwnership(request, food))
    .then((food) => response.json(food))
    .catch(next);
});

// CREATE -- add new.
router.post("/", requireToken, (request, response, next) =>
{
  Food.create({ ...request.body, owner: request.user._id })
    .then((newFood) => response.json(newFood))
    .catch(next);
});

// EDIT -- update.
router.put("/:id", handleValidateId, requireToken, (request, response, next) =>
{
  Food.findById(request.params.id)
    .then(handleRecordExists)
    .then((food) => handleValidateOwnership(request, food))
    // Updates the document and saves it to the database.
    .then((food) => food.set(request.body).save())
    .then((food) => response.json(food))
    .catch(next);
});

// DELETE -- remove by id.
router.delete("/:id", handleValidateId, requireToken, (request, response, next) =>
{
  Food.findById(request.params.id)
    .then(handleRecordExists)
    .then((food) => handleValidateOwnership(request, food))
    .then((food) => food.remove())
    .then(() => response.sendStatus(204))
    .catch(next);
});

module.exports = router;