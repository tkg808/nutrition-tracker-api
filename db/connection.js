/* === Config === */
const mongoose = require('mongoose');
require("dotenv").config();

// Use different databases for production and development.
const mongoURI = process.env.DATABASE_URL;

// As of Mongoose 6, useNewUrlParser, useUnifiedTopology, and useCreateIndex defaults to true.
// Also, useFindAndModify defaults to false.
mongoose.connect(mongoURI)
  .then((instance) =>
  {
    console.log(`Connected to db: ${instance.connections[0].name}`);
  })
  .catch((error) => 
  {
    console.log('Connection failed!', error);
  });

// Use this configured mongoose through API.
module.exports = mongoose;
