let {
  listKadaluarsa
} = require("../../repository/stokObat");

module.exports = (req, res) => {
  let {
    tanggal,
    id_lokasi
  } = req.params
  listKadaluarsa(tanggal, id_lokasi)
    .then(stokObat => res.status(200).json(stokObat))
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
};