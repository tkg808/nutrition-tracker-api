const mongoose = require("mongoose");

// Extend JS 'Error.prototype' to use app-specific info in responses.

class OwnderShipError extends Error
{
  constructor()
  {
    super();
    this.name = "OwnershipError";
    this.statusCode = 401;
    this.message = "The provided token does not match the owner of this document";
  }
}

class DocumentNotFoundError extends Error
{
  constructor()
  {
    super();
    this.name = "DocumentNotFoundError";
    this.statusCode = 404;
    this.message = "The provided ID doesn't match any documents";
  }
}

class BadParamsError extends Error
{
  constructor()
  {
    super();
    this.name = "BadParamsError";
    this.statusCode = 422;
    this.message = "A required parameter was omitted or invalid";
  }
}

class BadCredentialsError extends Error
{
  constructor()
  {
    super();
    this.name = "BadCredentialsError";
    this.statusCode = 422;
    this.message = "The provided username or password is incorrect";
  }
}

class InvalidIdError extends Error
{
  constructor()
  {
    super();
    this.name = "InvalidIdError";
    this.statusCode = 422;
    this.message = "Invalid id";
  }
}

const handleValidateOwnership = function (request, document)
{
  const ownerId = document.owner._id || document.owner;

  // Check if the curreent user is also the owner of the document.
  if (!request.user._id.equals(ownerId))
  {
    throw new OwnderShipError();
  }
  else
  {
    return document;
  }
};

const handleRecordExists = function (record)
{
  if (!record)
  {
    throw new DocumentNotFoundError();
  }
  else
  {
    return record;
  }
};

const handleValidateId = function (request, response, next)
{
  const isValidId = mongoose.Types.ObjectId.isValid(request.params.id);

  if (!isValid)
  {
    throw new InvalidIdError();
  }
  else
  {
    next();
  }
}

const handleValidationErrors = function (error, request, response)
{
  if (error.name.match(/Valid/) || error.name === "MongoError")
  {
    throw new BadParamsError();
  }
  else
  {
    next(error);
  }
};

// Last/generic handler for any error that falls through.
const handleErrors = function (error, request, response, next)
{
  const statusCode = error.statusCode || 500;

  const message = error.message || "Internal Server Error";

  response.status(statusCode).send(message);
};

module.exports =
{
  handleValidateOwnership,
  handleRecordExists,
  handleValidateId,
  handleValidationErrors,
  handleErrors
}