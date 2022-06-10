let {
  connection
} = require("../module/database");

module.exports = (() => {
  connection.query(`
    create extension if not exists "uuid-ossp";

    create table if not exists obat (
      uid uuid primary key default uuid_generate_v4(),
      nama_obat varchar(50) unique not null,
      minimal_stok integer not null default 0,
      komposisi text ,
      kategori varchar(30) not null,
      satuan varchar(20) not null,
      id_lokasi integer
    );
  `);
})();