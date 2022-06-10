let { tambahAntrian } = require("../../repository/antrian");

module.exports = (req, res) => {
  let { nomor_rekam_medis, poli, jaminan, dokter, id_lokasi } = req.body;
  // console.log(nomor_rekam_medis, poli, jaminan, dokter, id_lokasi)
  tambahAntrian({
    nomor_rekam_medis,
    poli,
    jaminan,
    dokter,
    id_lokasi
  })
    .then(antrian => res.status(201).json(antrian))
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
};
