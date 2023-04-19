const express = require("express");
const router = express.Router();

router.use('/', require('./Routers/userRoute'));

module.exports = router;