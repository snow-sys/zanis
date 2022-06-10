let server = require("./module/server");
let db = require("./module/database");

let initModel = () => {
  try {
    require("./model/akunUser");
    require("./model/logo");
    require("./model/lokasi");
  } catch (err) {
    return Promise.reject(err);
  }
  return Promise.resolve();
};

db.connect()
  .then(() => {
    console.log("Terkoneksi ke database");
    initModel()
      .then(() => server.start())
      .catch(() => console.log("Inisiasi model gagal"));
  })
  .catch(() => console.log("Koneksi ke database gagal"));
