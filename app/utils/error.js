const config = require("./config");
const logger = require('../loggers/logger')

class GeneralError extends Error {
  constructor(message, data = "", statusCode = "") {
    super();
    this.message = message;
    this.statusCode = ""?config.HTTP_ACCEPTED:statusCode;
    this.data = data === "" ? undefined : data;
    this.action = 0;
  }
  getCode() {
    if (this instanceof BadRequest) {
      return config.HTTP_BAD_REQUEST;
    } else if (this instanceof NotFound) {
      return config.HTTP_NOT_FOUND;
    } else if (this instanceof UnAuthorized) {
      return config.HTTP_UN_AUTHORIZED;
    } else if (this instanceof ServiceNotAvailable) {
      return config.HTTP_SERVICE_NOT_AVAILABLE;
    } else if (this instanceof ValidationError){
      return config.HTTP_SUCCESS;
    }
    return config.HTTP_SERVER_ERROR;
  }
}

class BadRequest extends GeneralError { }
class NotFound extends GeneralError { }
class UnAuthorized extends GeneralError { }
class ServiceNotAvailable extends GeneralError { }
class ValidationError extends GeneralError{ }

module.exports = {
  GeneralError,
  BadRequest,
  NotFound,
  UnAuthorized,
  ServiceNotAvailable,
  ValidationError
};