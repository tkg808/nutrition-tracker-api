const Food = require('../models/Food');
const foodData = require('./foodData.json');

Food.deleteMany({})
  .then(() => Food.insertMany(foodData))
  .then(console.log('Success!'))
  .catch(console.error)
  .finally(process.exit);