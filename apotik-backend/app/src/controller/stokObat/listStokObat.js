let {
  listStokObat
} = require("../../repository/stokObat");

module.exports = (req, res) => {
  let {
    uid_obat
  } = req.params;
  let {
    limit,
    from,
    cari,
    id_lokasi
  } = req.query;
  listStokObat(uid_obat, limit, from, cari, id_lokasi)
    .then(stokObat => res.status(200).json(stokObat))
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
};