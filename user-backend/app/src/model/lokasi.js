let {
  connection
} = require("../module/database");

module.exports = (() => {
  connection.query(`
    create table if not exists lokasi (
      id serial primary key,
      nama_lokasi varchar(30) unique not null,
      alamat text not null
    );
  `);
})();