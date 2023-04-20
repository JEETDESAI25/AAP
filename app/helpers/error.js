const { GeneralError,ValidationError} = require("../utils/error");
const config = require("../utils/config");
const logger = require('../loggers/logger');

const handleErrors = (err, req, res, next) => {
  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json({
      status: config.ERROR,
      code: err.statusCode !== "" ? err.statusCode : err.getCode(),
      message: err.message,
    });
  }
  return res.status(config.HTTP_SERVER_ERROR).json({
    status: config.ERROR,
    code: err.statusCode !== "" ? err.statusCode : config.HTTP_SERVER_ERROR,
    message: err.message,
  });
};

const handleJoiErrors = (err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    logger.error(err.error);
    const customErrorResponse = {};
    if (err.error.details.length !== 0) {
      err.error.details.forEach(item => {
        customErrorResponse[`${item.context.key}`] = {
          message: item.message,
          context: item.context.label,
          type: item.type
        }
      })
    }
    next(
      new ValidationError(
        customErrorResponse[Object.keys(customErrorResponse)[0]].message,
        customErrorResponse,
        config.HTTP_BAD_REQUEST
      )
    );
  } else {
    next(err);
  }
};
module.exports = { handleErrors, handleJoiErrors };