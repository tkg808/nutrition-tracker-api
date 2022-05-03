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

/* === Controllers === */
// Handles redirect.
app.get("/", (request, response) =>
{
  response.redirect("/foods");
});

const foodsController = require("./controllers/foodsController");
app.use("/foods", foodsController);

/* === Connection === */
app.listen(app.get("port"), () =>
{
  console.log(`✅ Listening on port ${app.get('port')}`);
});