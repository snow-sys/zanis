let {
  connection
} = require("../module/database");

module.exports = (() => {
  connection.query(`
    create extension if not exists "uuid-ossp";

    create table if not exists histori_medis (
      uid uuid primary key default uuid_generate_v4(),
      nomor_rekam_medis varchar(10) not null references pasien(nomor_rekam_medis) on delete restrict,
      nik_dokter varchar(20) not null,
      waktu_checkup timestamp default now(),
      subjektif text,
      objektif text,
      analisa text,
      tindakan text,
      diagnosa varchar(100),
      jenis_perawatan varchar(30) not null,
      nama_terapis varchar(50),
      penjamin varchar(20) not null,
      catatan text
    )
  `);
})();