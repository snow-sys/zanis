let { connection } = require("../module/database");

module.exports = (() => {
  connection.query(`
    create table if not exists logo (
      id_lokasi varchar(5),
      nama_logo varchar(100)
    )
  `);
})();
