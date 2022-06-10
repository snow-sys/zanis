let { connection } = require("../module/database");

module.exports = (() => {
  connection.query(`
    create table if not exists tier (
      id serial primary key,
      nama_tier varchar(20) unique,
      level smallint not null
    );

    insert into tier (id, nama_tier, level) values(0, 'silver', 0) on conflict do nothing;
  `);
})();
