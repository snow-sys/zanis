let {
  listPesananObat
} = require("../../repository/pesananObat");
let ax = require('axios').default

module.exports = (req, res) => {
  let {
    uid_pesanan
  } = req.params;
  let {
    status_pesanan,
    id_lokasi,
    limit,
    from
  } = req.query;
  // console.log("satu", uid_pesanan,
  //   status_pesanan,
  //   id_lokasi,
  //   limit,
  //   from)
  listPesananObat(
      uid_pesanan,
      status_pesanan,
      id_lokasi,
      limit,
      from
    )
    .then(async listPesanan => {
      // console.log("miaw", port, baseURL)
      // console.log(listPesanan)
      if (uid_pesanan) {
        res.status(200).json(listPesanan);
      } else {
        let list = []
        for (let index in listPesanan) {
          let nm_pasien = await ax.get('http://rekam-medis:8000/api/v1/pasien/' + listPesanan[index].nomor_rekam_medis + '?id_lokasi=' + id_lokasi)
            .then(data => ({
              nama_pasien: data.data[0].nama_pasien,
              tanggal_lahir: (data.data[0].tanggal_lahir + "").substr(0, 10),
              ...listPesanan[index],
              detailObat: `${req.protocol}://${req.get("host")}/api/v1/pesanan-obat/${listPesanan[index].uid}`,
              detailRacik: `${req.protocol}://${req.get("host")}/api/v1/racik/${listPesanan[index].uid}`
            }))
          list.push(nm_pasien)
        }
        res.status(200).json(list);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
};