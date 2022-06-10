let {
  connection
} = require("../module/database");

module.exports = (() => {
  connection.query(`
    create extension if not exists "uuid-ossp";

    create table if not exists akun_user (
      uid uuid primary key default uuid_generate_v4(),
      nik varchar(20) unique not null,
      password varchar(255) not null,
      nama varchar(100) not null,
      email varchar(50) not null,
      role varchar(15) not null,
      id_lokasi varchar(5) not null
    )
  `);
})();