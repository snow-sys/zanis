let {
  hapusStokObat
} = require("../../repository/stokObat");

module.exports = (req, res) => {
  let {
    uid_stok_obat
  } = req.params;
  let {
    id_lokasi
  } = req.query
  hapusStokObat(uid_stok_obat, id_lokasi)
    .then(stokObat => res.status(200).json(stokObat))
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
};