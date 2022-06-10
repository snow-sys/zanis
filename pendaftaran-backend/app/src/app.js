let server = require("./module/server");
let db = require("./module/database");

let initModel = () => {
  try {
    require("./model/tier");
    require("./model/member");
    require("./model/antrian");
  } catch (err) {
    return Promise.reject(err);
  }
  return Promise.resolve();
};

db.connect()
  .then(() => {
    console.error("Terkoneksi ke database");
    initModel()
      .then(() => server.start())
      .catch(() => console.error("Inisiasi model gagal"));
  })
  .catch(err => console.error("Koneksi ke database gagal", err));
