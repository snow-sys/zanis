let { connection } = require("../module/database");

module.exports = (() => {
  connection.query(`
    create extension if not exists "uuid-ossp";

    create table if not exists tindakan (
      uid uuid primary key default uuid_generate_v4(),
      nama_tindakan varchar(100) unique not null,
      biaya_tindakan integer not null,
      created_at timestamp default now(),
      update_at timestamp default now(),
      jenis varchar(30) not null,
      id_lokasi integer not null
    )
  `);
})();
