let {
  listBelanja
} = require("../../repository/stokObat");

module.exports = (req, res) => {
  let {
    nama_obat
  } = req.params;
  let {
    id_lokasi
  } = req.query
  // console.log(nama_obat, id_lokasi)
  listBelanja(nama_obat, id_lokasi)
    .then(stokObat => res.status(200).json(stokObat))
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
};