let {
  listTransaksiObat
} = require("../../repository/transaksiObat");
let ax = require("axios").default

module.exports = (req, res) => {
  let {
    id_lokasi,
    mulai_tanggal,
    sampai_tanggal
  } = req.query
  // console.log(keyword)
  listTransaksiObat(id_lokasi, mulai_tanggal, sampai_tanggal)
    .then(async transaksiObat => {
      // console.log(transaksiObat)
      list = []
      for (let index in transaksiObat) {
        // console.log(transaksiObat[index].nik_karyawan)
        let nm_karyawan = await ax.get('http://user:8000/api/v1/akun-user/' + transaksiObat[index].nik_karyawan)
          .then(data => ({
            ...transaksiObat[index],
            nama_karyawan: data.data[0].nama
          }))
          .catch(err =>{
            console.error(err);
            res.status(400).json("nik karyawan tidak ditemukan di database");
          })
        // console.log(nm_karyawan)
        list.push(nm_karyawan)
      }
      res.status(200).json(list)
    })
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
};