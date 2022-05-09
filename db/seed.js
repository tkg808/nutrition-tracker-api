const User = require("../models/User");
const Food = require("../models/Food");
const userData = require("./dataUsers.json");
const foodData = require("./dataFoods.json");

// Handles hashing.
const bcrypt = require("bcrypt");

let hashed = "";

Promise.resolve(bcrypt.hash(userData[0].password, 10))
  .then((hash) => hashed += hash);

User.deleteMany({})
  .then(() => Food.deleteMany({}))
  .then(() => User.insertMany(userData))
  .then((users) => 
  {
    // Sets owner for all foods before seeding.
    foodData.forEach((food) => food.owner = users[0]._id);

    return foodData;
  })
  .then((foods) => Food.insertMany(foods))
  .then((foods) => console.log(foods))
  .then(() => User.updateMany({}, { "$set": { "password": hashed } }))
  .then(console.log("Success!"))
  .catch(console.error)
  .finally(process.exit);