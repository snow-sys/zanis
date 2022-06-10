let { connection } = require("../module/database");

module.exports = (() => {
  connection.query(`
    create extension if not exists "uuid-ossp";

    create table if not exists pesanan_obat(
      uid uuid primary key default uuid_generate_v4(),
      nomor_rekam_medis varchar(10) not null,
      nik_dokter varchar(20) not null,
      waktu_pesan timestamp default now(),
      waktu_selesai timestamp,
      id_lokasi integer not null,
      status_pesanan varchar(10) default 'MENUNGGU'
    );
  `);
})();
