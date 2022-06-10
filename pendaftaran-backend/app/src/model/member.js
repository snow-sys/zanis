let { connection } = require("../module/database");

module.exports = (() => {
  connection.query(`
    create table if not exists member (
      nomor_pengenal varchar(20) unique not null,
      jenis_nomor_pengenal varchar(15) not null,
      email varchar(100) primary key not null,
      password varchar(200) not null,
      nama_member varchar(100) not null,
      tempat_lahir varchar(30) not null,
      tanggal_lahir date not null,
      jenis_kelamin varchar(10) not null,
      status varchar(20),
      agama varchar(20),
      alamat text,
      kecamatan varchar(20),
      kelurahan varchar(20),
      kode_pos varchar(10),
      telepon varchar(14),
      handphone varchar(14),
      tanggal_join timestamp default now(),
      akses_terakhir timestamp default now(),
      poin integer default 0,
      tier_id integer default 0 references tier(id) on delete restrict
    )
  `);
})();
