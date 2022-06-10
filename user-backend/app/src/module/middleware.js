let bodyParser = require("body-parser");
let cors = require("cors");
let fileupload = require('express-fileupload')


module.exports = app => {
  app.use((req, res, next) => {
    res.setHeader("X-Powered-By", "Z-Tech");
    next();
  });
  app.use(fileupload());
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  return app;
};