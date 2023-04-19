const config = require("./config");
const logger = require("../loggers/logger");
class GeneralResponse {
  constructor(message, data, statusCode , action) {
    this.message = message;
    this.statusCode = statusCode ? statusCode:config.HTTP_SUCCESS;
    this.data = data;
    this.action = action ? 1 : 0;
  }
}

module.exports = {
  GeneralResponse,
};