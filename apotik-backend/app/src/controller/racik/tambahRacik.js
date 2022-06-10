let {
  tambahRacik
} = require('../../repository/racik')
let {
  connection
} = require('../../module/database')

module.exports = async (req, res) => {
  let data = req.body;
  // console.log(data)
  let uid_pesanan = await connection.query(
    ` select uid from pesanan_obat where nomor_rekam_medis = $1 
    and status_pesanan = 'MENUNGGU'
    and waktu_pesan >= now()::date and waktu_pesan < now()::date + 1
    `, [data.nomor_rekam_medis]).then(({
    rows
  }) => rows[0])
  // console.log(uid_pesanan)

  if (uid_pesanan) {
    tambahRacik(uid_pesanan.uid, data).then(newData => res.status(200).json(newData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err)
      })
    // console.log("miaw")
  } else {
    // console.log("wakwaw")
    // tambahkan ke pesananObat
    let uid_pesanan = await connection.query(
      `insert into pesanan_obat(nomor_rekam_medis, nik_dokter, id_lokasi) values ($1, $2, $3) returning *
      `, [data.nomor_rekam_medis, data.nik_dokter, data.id_lokasi]
    ).then(({
      rows
    }) => rows[0].uid)
    // await console.log(uid_pesanan)
    // tambah ke Racik
    await tambahRacik(uid_pesanan, data).then(newData => res.status(200).json(newData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err)
      })
  }
  // console.log(uid_pesanan_obat)
}