let {
  listTransaksiHarian
} = require("../../repository/transaksi");

module.exports = (req, res) => {
  // let tanggal_transaksi = req.params.waktuTransaksi;
  let {
    tanggal_transaksi, id_lokasi
  } = req.query
  let tahun = tanggal_transaksi.substr(0, 4)
  let bulan = tanggal_transaksi.substr(5, 2)
  let tanggal = parseInt(tanggal_transaksi.substr(-2)) + 1 + ""
  let parameter_waktu = tahun + "-" + bulan + "-" + tanggal
  // console.log(tanggal_transaksi, parameter_waktu, id_lokasi)
  listTransaksiHarian(tanggal_transaksi, id_lokasi, parameter_waktu)
    .then(transaksi => res.status(200).json(transaksi))
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
};