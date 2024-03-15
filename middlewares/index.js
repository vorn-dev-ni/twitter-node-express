const { validationResult } = require("express-validator");

function handleRequest(req, res, next) {
  const error = false;
  if (error) {
    res.status(500).send("Error!");
  }
  next();
}

function authMiddleware(req, res, next) {
  //Checking logic in req
  const error = false;
  if (error) {
    res.status(500).send("Error Auth!");
  }
  next();
}

function handleValidation(req, res, next) {
  const result = validationResult(req);
  result.isEmpty() ? next() : res.send({ errors: result.array() });
}

module.exports = {
  handleRequest,
  authMiddleware,
  handleValidation,
};
