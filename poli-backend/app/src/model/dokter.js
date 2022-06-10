let {
  connection
} = require("../module/database");

module.exports = (() => {
  connection.query(`
    create extension if not exists "uuid-ossp";

    create table if not exists dokter (
      uid uuid primary key default uuid_generate_v4(),
      nik varchar(15) unique not null,
      nama_dokter varchar(99) not null,
      poli varchar(50) ,
      id_lokasi integer not null
    )
  `);
})();