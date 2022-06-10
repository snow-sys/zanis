let {
  connection
} = require("../module/database");

module.exports = (() => {
  connection.query(`
    create extension if not exists "uuid-ossp";

    create table if not exists transaksi (
      uid uuid primary key default uuid_generate_v4(),
      waktu_terbit timestamp default now(),
      waktu_transaksi timestamp,
      nik_penerbit varchar(20),
      nik_kasir varchar(20),
      nomor_rekam_medis varchar(10),
      penjamin varchar(20) not null,
      jenis_pembayaran varchar(10) not null default 'CASH',
      status_transaksi varchar(10) not null default 'PENDING',
      no_transaksi varchar(7),
      id_lokasi integer not null,
      total real default 0,
      diskon real default 0
    );

    create index if not exists indexRM on transaksi(nomor_rekam_medis, nik_kasir);
  `);
})();