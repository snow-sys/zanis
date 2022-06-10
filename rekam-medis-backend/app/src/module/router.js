let fs = require("fs");
// let { checkPrivilege } = require("../repository/user");
// let { verifyToken } = require("../module/token");

module.exports = (app, apiDir, controllerDir) => {
  let api = fs.readdirSync(apiDir);
  api.forEach(route => {
    require(apiDir + "/" + route).forEach(val => {
      app[val.method.toLowerCase()](
        val.url,
        // (req, res, next) => {
        //   let token = req.headers.user_token;
        //   if (val.privilege.indexOf("*") !== -1) {
        //     next();
        //   } else if (token) {
        //     let idUser = verifyToken(req.headers.user_token)._id;
        //     checkPrivilege(idUser, val.privilege).then(
        //       passed =>
        //         passed ? next() : res.status(401).json("akses ditolak")
        //     );
        //   } else {
        //     res.status(401).json("token tidak valid");
        //   }
        // },
        require(controllerDir + "/" + val.controller)
      );
    });
  });
  app.use("*", (req, res) => res.status(404).json("rute API tidak ditemukan"));
  return app;
};
