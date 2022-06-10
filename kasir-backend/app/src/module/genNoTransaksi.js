let {
  connection
} = require("../module/database");

exports.genNoTransaksi = async (id_lokasi) => {
  let jumlahTransaksi = await connection.query(`
      select count(uid) as jumlahtransaksi
      from transaksi where waktu_terbit >= now()::date and waktu_Terbit < now()::date + 1 
      and id_lokasi=$1 and status_transaksi = 'PENDING' and no_transaksi <> 'null'
      `,
    [id_lokasi]
  ).then(({
    rows
  }) => rows[0].jumlahtransaksi)
  console.log("miaw", jumlahTransaksi)
  let no_transaksi = ("00000000" + (parseInt(jumlahTransaksi) + 1)).substr(-7);
  return no_transaksi
}