let {
  rataRataAntrian
} = require("../../repository/antrian");

module.exports = (req, res) => {
  let {
    poli,
    limit,
    id_lokasi
  } = req.query;
  rataRataAntrian(poli, limit, id_lokasi)
    .then(rataRata => res.status(200).json(rataRata))
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
};