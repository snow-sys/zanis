let {
  kurangStokObat
} = require("../../repository/stokObat");

module.exports = (req, res) => {
  let {
    uid_pesanan
  } = req.params;
  let {
    id_lokasi,
    nik_karyawan
  } = req.query
  // let {
  //   jumlah_keluar,
  //   nik_karyawan
  // } = req.body;
  // console.log(uid_pesanan, nik_karyawan, id_lokasi)
  kurangStokObat(uid_pesanan, nik_karyawan, id_lokasi)
    .then(stokObat => res.status(200).json(stokObat))
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
};