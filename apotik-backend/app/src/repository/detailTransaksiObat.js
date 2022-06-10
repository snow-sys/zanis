let {
  connection
} = require("../module/database");

exports.tambahDetailPesananObat = async (
  uid_pesanan,
  listDetail = [{
    nama_obat: String,
    jumlah_obat: Number,
    kategori: String,
    satuan: String,
    keterangan: String
  }]
) => {
  try {
    await connection.query("begin");
    await listDetail.forEach(
      ({
        nama_obat,
        jumlah_obat,
        kategori,
        satuan,
        keterangan
      }) => {
        connection.query(
          `
          insert into detail_pesanan_obat(
            uid_pesanan, 
            nama_obat,
            jumlah_obat,
            kategori,
            satuan,
            keterangan
          )
          values($1, $2, $3, $4, $5, $6)
        `,
          [uid_pesanan, nama_obat + "".toLowerCase, jumlah_obat, kategori + "".toLowerCase, satuan, keterangan + "".toLowerCase]
        );
      }
    );
    await connection.query("commit");
    return listDetail;
  } catch (error) {
    await connection.query("rollback");
    throw error;
  }
};