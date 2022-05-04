/* === Config === */
const express = require("express");
const app = express();
app.set("port", process.env.PORT || 8000);

/* === Middleware === */
// Parses key value pairs in request.
app.use(express.urlencoded({ extended: true }));

// Converts json strings to an object for the request.
app.use(express.json());

// Allow connections from all domains.
const cors = require("cors");
app.use(cors());

// Log each request.
const requestLogger = require("./middleware/request_logger");
app.use(requestLogger);

// Handles redirect.
app.get("/", (request, response) =>
{
  response.redirect("/foods");
});

/* === Controllers === */
const foodsController = require("./controllers/foodsController");
app.use("/foods", foodsController);

const usersController = require("./controllers/usersController");
app.use("/users", usersController);

/* === Connection === */
// Configured right before connecting.
const { handleErrors } = require("./middleware/error_handler");
app.use(handleErrors);

app.listen(app.get("port"), () =>
{
  console.log(`✅ Listening on port ${app.get('port')}`);
});