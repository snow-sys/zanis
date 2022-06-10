let {
  connection
} = require("../module/database");

module.exports = (() => {
  connection.query(`
    create extension if not exists "uuid-ossp";

    create table if not exists detail_transaksi (
      uid uuid primary key default uuid_generate_v4(),
      uid_transaksi uuid not null references transaksi(uid) on delete restrict,
      item_transaksi varchar(20) not null,
      jumlah_item smallint not null,
      biaya integer not null
    )
  `);
})();