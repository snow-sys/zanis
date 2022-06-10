let {
  connection
} = require("../module/database");
// let ax = require('axios').default

exports.listDetailPesananObat = (
  uid_pesanan
) => {
  return connection.query(
      `SELECT 
        detail_pesanan_obat.uid, 
        obat.uid as uid_obat,
        obat.nama_obat, 
        detail_pesanan_obat.jumlah_obat,
        obat.satuan, 
        obat.kategori,
        stok_obat.harga_jual,
        detail_pesanan_obat.keterangan 

      FROM detail_pesanan_obat
      JOIN obat
      ON detail_pesanan_obat.uid_obat = obat.uid
      JOIN stok_obat on obat.uid = stok_obat.uid_obat
      WHERE uid_pesanan = $1`, [uid_pesanan])
    .then(({
      rows
    }) => rows)
};

exports.editDetailPesananObat = (uid, jumlah_obat) => {
  return connection.query(`update detail_pesanan_obat set jumlah_obat=$2 where uid=$1 returning *`, [uid, jumlah_obat])
    .then(({
      rows
    }) => rows[0])

};

exports.tambahDetailPesananObat = (
  uid_pesanan,
  uid_obat,
  jumlah_obat,
  keterangan) => {
  // console.log(uid_pesanan,uid_obat,jumlah_obat,keterangan)
  return connection.query(`
  insert into detail_pesanan_obat(uid_pesanan, uid_obat, jumlah_obat, keterangan) 
  values($1,$2,$3,$4) returning *
  `, [uid_pesanan, uid_obat, jumlah_obat, keterangan])
    .then(({
      rows
    }) => rows)
};

exports.hapusDetailPesananObat = uid => {
  return connection.query(`delete  from detail_pesanan_obat where uid = $1 returning *`, [uid]).then(
    rows => rows.rows
  )
};