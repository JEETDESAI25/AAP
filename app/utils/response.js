const config = require("./config");
const logger = require("../loggers/logger");
class GeneralResponse {
  constructor(message, data, statusCode) {
    this.message = message;
    this.statusCode = statusCode ? statusCode : config.HTTP_SUCCESS;
    this.data = data ? data : {}
  }
}

module.exports = {
  GeneralResponse,
};