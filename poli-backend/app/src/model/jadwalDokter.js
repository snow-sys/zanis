let { connection } = require("../module/database");

module.exports = (() => {
  connection.query(`
    create extension if not exists "uuid-ossp";

    create type list_hari as enum(
      'senin', 
      'selasa',
      'rabu',
      'kamis',
      'jumat',
      'sabtu'
    )

    create table if not exists jadwal_dokter (
      uid uuid primary key default uuid_generate_v4(),
      nama_dokter varchar(100) not null,
      hari list_hari not null
      waktu_start time not null,
      waktu_akhir time not null,
      nama_poli varchar(20),
      id_lokasi integer not null
    )
  `);
})();
