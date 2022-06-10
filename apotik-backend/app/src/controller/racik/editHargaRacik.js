let {
  editHargaRacik
} = require('../../repository/racik')

module.exports = (req, res) => {
  let {
    uid
  } = req.params
  let {
    nik_karyawan,
    id_lokasi,
    listDetail
  } = req.body
  // console.log("controller", nik_karyawan, id_lokasi, listDetail)
  editHargaRacik(uid, nik_karyawan, id_lokasi, listDetail)
    .then(newData => res.status(200).json(newData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err)
    })
}