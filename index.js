/* === Config === */
const express = require("express");
const app = express();
app.set("port", process.env.PORT || 8000);

// NODE_ENV is a Heroku variable.
// This prevents dotenv throwing errors when deployed.
if (process.env.NODE_ENV !== "production")
{
  require("dotenv").config();
}

// Allow connections from all domains.
const cors = require("cors");

// const corsOptions =
// {
//   // origin: [process.env.REACT_APP_URL, "http://localhost:3000"],
//   origin: ["*"],
//   credentials: true,
//   optionsSuccessStatus: 200
// };

app.use(cors());

/* === Middleware === */
// Parses key value pairs in request.
app.use(express.urlencoded({ extended: true }));

// Converts json strings to an object for the request.
app.use(express.json());

// Log each request.
const requestLogger = require("./middleware/request_logger");
app.use(requestLogger);

// Handles redirect.
app.get("/", (request, response) =>
{
  response.redirect("/api/foods");
});

/* === Controllers === */
const foodsController = require("./controllers/foodsController");
app.use("/api/foods", foodsController);

const usersController = require("./controllers/usersController");
app.use("/api/users", usersController);

/* === Connection === */
// Configured right before connecting.
const { handleErrors } = require("./middleware/custom_errors");
app.use(handleErrors);

app.listen(app.get("port"), () =>
{
  console.log(`✅ Listening on port ${app.get('port')}`);
});