/* === Config === */
const express = require("express");
const app = express();
app.set("port", process.env.PORT || 8000);

// Allow connections from all domains.
const cors = require("cors");
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