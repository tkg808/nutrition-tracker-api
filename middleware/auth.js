/* === Passport Config === */

const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Used to encrypt/decrypt the token.
// Can be any string value -- even gibberish.
const secret = process.env.JWT_SECRET;

// Require the specific "strategy" for authentication.
// Require the method to handle extracting the token from requests from the client.
const { Strategy, ExtractJwt } = require("passport-jwt");

// Minimum required options for passport-jwt.
const options =
{
  // How passport should find and extract the token from the request.
  // We'll be sending it as a "bearer" token when we make requests from our front end.
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
}

const User = require("../models/User");

// Configure our strategy using the passport constructor, and passing the options defined above.
// Passport extracts/decrypts the data from the token, and passes that data as jwt_payload.
const strategy = new Strategy(options, (jwt_payload, done) =>
{
  User.findById(jwt_payload.id)
    // Use done to pass the user on to our route.
    // param1 => for errors.
    // param2 => adds the user doc to the request object as request.user.
    .then((user) => done(null, user))
    // Pass error to error handlers in Express.
    .catch((error) => done(error));
});

// Register the strategy with passport to enable passport.authenticate() method.
passport.use(strategy);

passport.initialize();

/* === Token Config === */

// Authenticate method to use with routes.
const requireToken = passport.authenticate("jwt", { session: false });

function createUserToken(request, user)
{
  // Validate user login.
  // Use the same error message for increased security.
  if (
    !user ||
    !request.body.password ||
    !bcrypt.compareSync(request.body.password, user.password))
  {
    const error = new Error("The provided username or password is incorrect");
    error.statusCode = 422;
    throw error;
  }

  // If no error, create and return the token using user's id.
  return jwt.sign({ id: user._id }, secret, { expiresIn: 36000 });
}

const jwtDecode = require("jwt-decode");

function getIdFromToken(request)
{
  // Remove "bearer " from string.
  const token = request.headers.authorization.slice(7);

  if (!token)
  {
    const error = new Error("The credentials provided is incorrect");
    error.statusCode = 422;
    throw error;
  }

  return jwtDecode(token).id;
}

module.exports = { requireToken, createUserToken, getIdFromToken };