let { cekMasuk } = require("../../repository/antrian");

module.exports = (req, res) => {
  let { poli, id_lokasi } = req.query;
  cekMasuk(poli, id_lokasi)
    .then(antrian => res.status(200).json(antrian))
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
};
