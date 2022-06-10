let {
  listTransaksi
} = require("../../repository/transaksi");
let ax = require("axios").default

module.exports = (req, res) => {
  let {
    search
  } = req.params;
  let {
    id_lokasi,
    status_transaksi
  } = req.query
  // console.log(search, id_lokasi)
  listTransaksi(search, id_lokasi, status_transaksi)
    .then(async transaksi => {
      let list = []
      // console.log(transaksi)
      for (let index in transaksi) {
        let nm_pasien = await ax.get('http://rekam-medis:8000/api/v1/pasien/' + transaksi[index].nomor_rekam_medis + '?id_lokasi=' + id_lokasi)
          .then(data =>
            ({
              nama_pasien: data.data[0] == undefined ? transaksi[index].penjamin : data.data[0].nama_pasien,
              tanggal_lahir: data.data[0] == undefined ? "-" : data.data[0].tanggal_lahir,
              ...transaksi[index]
            }))
        list.push(nm_pasien)
        // console.log("miaw", nm_pasien)
      }
      res.status(200).json(list)
    })
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
  // res.status(200).json(list);

}