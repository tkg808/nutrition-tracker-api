const User = require("../models/User");
const Food = require("../models/Food");
const userData = require("./dataUsers.json");
const foodData = require("./dataFoods.json");

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
  .then(console.log("Success!"))
  .catch(console.error)
  .finally(process.exit);