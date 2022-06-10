let {
  listPasien
} = require("../../repository/pasien");

module.exports = (req, res) => {
  let {
    nomor_rekam_medis
  } = req.params;
  let {
    cari,
    limit,
    from,
    id_lokasi
  } = req.query;
  listPasien({
      nomor_rekam_medis,
      cari,
      limit,
      from,
      id_lokasi
    })
    .then(pasien => res.status(200).json(pasien))
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
};