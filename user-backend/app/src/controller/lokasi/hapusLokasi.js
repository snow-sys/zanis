let {
  hapusLokasi
} = require("../../repository/lokasi");

module.exports = (req, res) => {
  let {
    id_lokasi
  } = req.params;
  hapusLokasi(id_lokasi)
    .then((
      rows
    ) => res.status(200).json(rows))
    .catch(err => res.status(500).json(err));
};