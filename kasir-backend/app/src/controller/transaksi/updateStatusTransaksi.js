let {
  gantiStatusTransaksi
} = require("../../repository/transaksi");
let ax = require('axios').default

module.exports = (req, res) => {
  let {
    uid
  } = req.params;
  let {
    status,
    nik_kasir,
    nomor_rekam_medis,
    diskon,
    total
  } = req.body;
  // console.log(uid, status,
  //   nik_kasir,
  //   nomor_rekam_medis,
  //   diskon,
  //   total)
  status = status.toUpperCase();
  if (status === "DONE" || status === "CANCEL") {
    gantiStatusTransaksi(uid, status, nik_kasir, diskon, total)
      .then(async transaksi => {
        // console.log("lalalala", nomor_rekam_medis, transaksi)
        let uid_pesanan = await ax.get('http://apotik:8000/api/v1/cari-pesanan-obat/' + nomor_rekam_medis).then(data => data.data[0])
        // console.log(uid_pesanan)
        if (uid_pesanan) {
          // //update status pesanan ke SELESAI
          await ax.put('http://apotik:8000/api/v1/pesanan-obat/' + uid_pesanan.uid, {
            status_pesanan: 'SELESAI'
          })
        }
        // console.log("miaw")
        // console.log(transaksi)
        res.status(200).json(transaksi)
      })
      .catch(err => {
        console.log(err);
        res.status(400).json("error");
      });
  } else {
    res.status(400).json("status pembayaran hanya DONE atau CANCEL");
  }
};