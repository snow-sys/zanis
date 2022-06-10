let {
  connection
} = require("../module/database");

module.exports = (() => {
  connection.query(`
    create extension if not exists "uuid-ossp";

    create table if not exists stok_obat (
      uid uuid primary key default uuid_generate_v4(),
      uid_obat uuid not null references obat(uid) on delete restrict,
      stok integer not null default 0,
      harga_modal integer not null,
      waktu_masuk timestamp default now(),
      kadaluarsa timestamp not null,
      nik_penerima varchar(20),
      harga_jual integer not null,
      id_lokasi integer
    );
  `);
})();