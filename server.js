const express = require("express");
let app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
import { initializeApp } from "firebase/app";

const helmet = require("helmet");
app.use(helmet());

require('dotenv').config()

const cors = require("cors");
app.use(cors());

app.use('/', require('./app/routes/route'));

app.use(express.static(__dirname + '/public'));

app.use(require("./app/helpers/response"));

app.use(require("./app/helpers/error").handleJoiErrors);

app.use(require("./app/helpers/error").handleErrors);

const logger = require('./app/loggers/logger')

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
  };

app = initializeApp(firebaseConfig);

const port = process.env.PORT || 4005;
app.listen(port, () => {
    logger.info(`Listening to Port :  ${port}`);
});
module.exports = app;
