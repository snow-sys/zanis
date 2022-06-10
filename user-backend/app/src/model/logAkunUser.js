let { connection } = require("../module/database");

module.exports = (() => {
  connection.query(`
    create table if not exists log_akun_user (
      waktu_aktifitas datetime default now(),
      nik varchar(20) unique not null,
      data jsonb
    )
  `);
})();
