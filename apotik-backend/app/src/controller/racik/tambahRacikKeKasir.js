let ax = require('axios').default
let {
  connection
} = require('../../module/database')

module.exports = async (req, res) => {
  let data = req.body;
  // console.log(data)
  let dataRacik = await connection.query(
    ` select nama_racik, harga, jl from racik where uid_pesanan = $1 
    `, [data.uid_pesanan]).then(({
    rows
  }) => rows)
  // console.log(dataRacik)
  // await console.log({
  //   "nomor_rekam_medis": data.nomor_rekam_medis,
  //   "listDetail": dataRacik.map(({
  //     nama_racik,
  //     harga,
  //     jumlah_racik
  //   }) => ({
  //     item_transaksi: nama_racik,
  //     biaya: harga,
  //     jumlah_item: jumlah_racik
  //   }))
  // })
//  console.log(dataRacik)

  await ax.post('http://kasir:8000/api/v1/detail-transaksi/', {
      "nomor_rekam_medis": data.nomor_rekam_medis,
      "listDetail": dataRacik.map(({
        nama_racik,
        harga,
        jl
      }) => ({
        item_transaksi: nama_racik,
        jumlah_item: jl,
        biaya: harga
      }))
    })
    .then(({
      data
    }) => {return res.status(200).json(data)})
    .catch(err => {
      console.error(err);
      return res.status(400).json(err.message)
    })

  // console.log(uid_pesanan_obat)
}