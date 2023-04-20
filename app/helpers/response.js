const { GeneralResponse } = require('../utils/response');
const config = require('../utils/config');

const handleResponse = (response, req, res, next) => {
    if (response instanceof GeneralResponse) {
        return res.status(config.HTTP_SUCCESS).json({
            status: config.SUCCESS,
            code: response.statusCode,
            message: response.message
        })
    }
    next(response);
}

module.exports = handleResponse;