const jwt = require("jsonwebtoken");
const { UnAuthorized } = require("../utils/error");
const logger = require('../loggers/logger')

const authenticate = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (token) {
    if (token.startsWith("Bearer")) {
      token = token.slice(7, token.length);
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        logger.error(err);
        next(new UnAuthorized("auth token is invalid"));
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    next(new UnAuthorized("auth token not supplied"));
  }
};

const generateToken = (data) => {
  const token = jwt.sign({ data }, process.env.SECRET_KEY, { expiresIn: '30d' });
  return token;
};

module.exports = {
  authenticate,
  generateToken
};
