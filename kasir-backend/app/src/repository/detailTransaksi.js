let {
  connection
} = require("../module/database");
let {
  cekUidTransaksi
} = require("../repository/transaksi")

exports.tambahDetailTransaksi = async (
  nomor_rekam_medis, listDetail
) => {
  let listTransaksiByRM = await cekUidTransaksi(nomor_rekam_medis)
  if (listTransaksiByRM.length > 0) {
    try {
      await connection.query("begin");
      await listDetail.forEach(({
        item_transaksi,
        jumlah_item,
        biaya
      }) => {
        connection.query(
          `
                insert into detail_transaksi(uid_transaksi, item_transaksi, jumlah_item, biaya)
                values($1, $2, $3, $4)
              `,
          [listTransaksiByRM[0].uid, item_transaksi, jumlah_item, biaya]
        );
      });
      await connection.query("commit");
      return listDetail;
    } catch (error) {
      await connection.query("rollback");
      throw error;
    }
  } else {
    return Promise.reject("uid tidak ditemukan")
  }
};

exports.listDetailTransaksi = uid_transaksi =>
  connection
  .query(
    `
        select * from detail_transaksi
        where uid_transaksi = $1
        `,
    [uid_transaksi]
  )
  .then(({
    rows
  }) => rows);

exports.gantiStatusTransaksi = (uid, status) =>
  connection
  .query(
    `update transaksi set status_transaksi = $1 where uid = $2 returning *`,
    [status, uid]
  )
  .then(({
    rows
  }) => rows[0]);

exports.hapusDetailTransaksi = (uid) =>
  connection
  .query(
    `delete from detail_transaksi where uid = $1 returning *`,
    [uid]
  )
  .then(({
    rows
  }) => rows[0]);

exports.editDetailTransaksi = (uid, jumlah_item, diskon) => {
  return connection.query(`
    update detail_transaksi ${ jumlah_item ? diskon ? 
      "set jumlah_item = $1 , diskon = $2 where uid = $3":
      "set jumlah_item = $1 where uid = $2":
      diskon ? "set diskon = $1 where uid = $2":
      " set uid = $1 where uid = $1"} returning *`,
    jumlah_item ? diskon ? [jumlah_item, diskon, uid] : [jumlah_item, uid] :
    diskon ? [diskon, uid] : [uid]
  ).then(({
    rows
  }) => rows)
}