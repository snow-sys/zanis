let http = require("http");
let express = require("express");
let app = express();

let rootDir = process.cwd();
let apiDir = rootDir + "/src/api";
let controllerDir = rootDir + "/src/controller";
let port = process.env.PORT || 8000;

app = require("./middleware")(app);
app = require("./router")(app, apiDir, controllerDir);

exports.start = () =>
  http
    .createServer(app)
    .listen(port, () =>
      console.error(`Server pendaftaran berjalan di ${port}`)
    );
