let { connection } = require("../module/database");

module.exports = (() => {
  connection.query(`
    create extension if not exists "uuid-ossp";

    create table if not exists histori_tindakan (
      uid uuid primary key default uuid_generate_v4(),
      uid_histori_medis uuid not null,
      nama_tindakan varchar(100) not null,
      biaya_tindakan integer not null,
      jumlah integer not null,
      keterangan text,
      id_lokasi integer not null
    )
  `);
})();
