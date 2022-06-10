let server = require("./module/server");
let db = require("./module/database");

let initModel = () => {
  try {
    require("./model/obat");
    require("./model/stokObat");
    require("./model/transaksiObat");
    require("./model/pesananObat");
    require("./model/detailPesananObat");
    require("./model/racik");
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
