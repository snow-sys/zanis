let {
  connection
} = require("../module/database");

module.exports = (() => {
  connection.query(`
    create extension if not exists "uuid-ossp";

    create table if not exists racik (
      uid uuid primary key default uuid_generate_v4(),
      nomor_rekam_medis varchar(20)  not null,
      nama_racik varchar(50) not null,
      komposisi varchar(200) not null,
      nama_dokter varchar(50) not null,
      waktu_terbit timestamp default now(),
      status varchar(50), 
      harga integer default 0,
      jumlah_racik integer not null,
      id_lokasi integer,
      uid_pesanan uuid,
      jl integer default 1
    );
  `);
})();