let {
  tambahDokter
} = require("../../repository/dokter");

module.exports = (req, res) => {
  let {
    nik,
    nama_dokter,
    poli,
    id_lokasi,

  } = req.body;
  // console.log(nik,nama_dokter, poli, id_lokasi)
  tambahDokter(
      nik,
      nama_dokter,
      poli,
      id_lokasi,
    )
    .then(dokter => res.status(201).json(dokter))
    .catch(err => {
      console.error(err);
      res.status(400).json(` error `);
    });
};