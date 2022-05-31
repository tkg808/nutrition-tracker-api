/* === Config === */
const mongoose = require("mongoose");

// NODE_ENV is a Heroku variable.
// This prevents dotenv throwing errors when deployed.
if (process.env.NODE_ENV !== "production")
{
  require("dotenv").config();
}


// Use different databases for production and development.
const mongoURI = process.env.DATABASE_URL;

// As of Mongoose 6, useNewUrlParser, useUnifiedTopology, and useCreateIndex defaults to true.
// Also, useFindAndModify defaults to false.
mongoose.connect(mongoURI, { ssl: true })
  .then((instance) =>
  {
    console.log(`Connected to db: ${instance.connections[0].name}`);
  })
  .catch((error) => 
  {
    console.log("Connection failed!", error);
  });

// Use this configured mongoose throughout API.
module.exports = mongoose;
