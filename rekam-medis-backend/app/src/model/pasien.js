let {
  connection
} = require("../module/database");

module.exports = (() => {
  connection.query(`
    create table if not exists pasien (
      nomor_rekam_medis varchar(10) primary key not null,
      nomor_pengenal varchar(20) unique not null,
      jenis_nomor_pengenal varchar(15) not null,
      nama_pasien varchar(100) not null,
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
      pendidikan varchar(30),
      pekerjaan varchar(30),
      kantor varchar(30),
      catatan text,
      id_lokasi integer not null
    )
  `);
})();