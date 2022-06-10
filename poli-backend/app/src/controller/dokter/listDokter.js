let {
  listDokter
} = require("../../repository/dokter");

module.exports = (req, res) => {
  let {
    uid
  } = req.params;
  let {
    cari,
    id_lokasi
  } = req.query;
  // console.log("lala",uid, cari, id_lokasi)
  listDokter(
      uid,
      cari,
      id_lokasi
    )
    .then(dokter => res.status(200).json(dokter))
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
};