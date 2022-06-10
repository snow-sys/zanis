let { connection } = require("../module/database");

exports.logTransaksiObat = ({
  uid_obat,
  uid_stok_obat,
  jumlah,
  nik_karyawan,
  id_lokasi
}) =>
  connection.query(
    `
        insert into transaksi_obat(
          nama_obat,
          uid_obat,
          uid_stok_obat,
          jumlah,
          nik_karyawan,
          id_lokasi
        )
        values((select nama_obat from obat where uid = $1), $1, $2, $3, $4, $5)
    `,
    [uid_obat, uid_stok_obat, jumlah, nik_karyawan, id_lokasi]
  );

exports.listTransaksiObat = (id_lokasi, mulai_tanggal, sampai_tanggal) => {
  let param = [id_lokasi, mulai_tanggal, sampai_tanggal];
  // console.log(param);
  return connection
    .query(
      `
    select * from transaksi_obat where id_lokasi = $1 and
    waktu_transaksi::date >= $2 and waktu_transaksi::date <= $3
     `,
      param
    )
    .then(({ rows }) => rows);
};
