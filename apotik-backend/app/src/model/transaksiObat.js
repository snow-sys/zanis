let {
  connection
} = require("../module/database");

module.exports = (() => {
  connection.query(`
    create extension if not exists "uuid-ossp";

    create table if not exists transaksi_obat (
      uid uuid primary key default uuid_generate_v4(),
      waktu_transaksi timestamp default now(),
      uid_obat uuid not null,
      uid_stok_obat uuid not null,
      nama_obat varchar(50) not null,
      jumlah integer not null,
      nik_karyawan varchar(20) not null,
      id_lokasi varchar(5) not null
    );
  `);
})();