let { connection } = require("../module/database");

module.exports = (() => {
  connection.query(`
    create extension if not exists "uuid-ossp";

    create table if not exists antrian (
      uid uuid primary key default uuid_generate_v4(),
      nomor_antrian integer not null,
      nomor_rekam_medis varchar(10) not null,
      poli varchar(20) not null,
      waktu_daftar timestamp not null default now(),
      waktu_masuk timestamp,
      jaminan varchar(20) not null,
      dokter varchar(100) not null,
      id_lokasi integer not null,
      status_antrian varchar(30) not null default 'menunggu'
    )
  `);
})();
