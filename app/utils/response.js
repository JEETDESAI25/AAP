const config = require("./config");
const logger = require("../loggers/logger");
class GeneralResponse {
  constructor(message, statusCode) {
    this.message = message;
    this.statusCode = statusCode ? statusCode:config.HTTP_SUCCESS;
  }
}

module.exports = {
  GeneralResponse,
};