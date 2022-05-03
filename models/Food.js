const mongoose = require("../db/connection");

const FoodSchema = new mongoose.Schema(
  {
    name: String,
    calories: Number,
    carbohydrates_total_g: Number,
    cholesterol_mg: Number,
    fat_saturated_g: Number,
    fat_total_g: Number,
    fiber_g: Number,
    potassium_mg: Number,
    protein_g: Number,
    serving_size_g: Number,
    sodium_mg: Number,
    sugar_g: Number
  }
);

module.exports = mongoose.model("Food", FoodSchema);