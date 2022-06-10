let {
  connection
} = require("../module/database");

module.exports = (() => {
  connection.query(`
    create extension if not exists "uuid-ossp";

    create table if not exists detail_pesanan_obat(
      uid uuid primary key default uuid_generate_v4(),
      uid_pesanan uuid not null references pesanan_obat(uid) on delete restrict,
      uid_obat uuid not null references obat(uid) on delete cascade,
      jumlah_obat integer not null,
      keterangan text not null
    );
  `);
})();