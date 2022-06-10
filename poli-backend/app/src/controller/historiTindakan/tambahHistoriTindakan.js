let {
  tambahHistoriTindakan
} = require("../../repository/historiTindakan");

module.exports = (req, res) => {
  let {
    uid_histori_medis,
    uid_tindakan,
    jumlah,
    keterangan,
    id_lokasi
  } = req.body;
  tambahHistoriTindakan({
      uid_histori_medis,
      uid_tindakan,
      jumlah,
      keterangan,
      id_lokasi
    })
    .then(historiTindakan => res.status(201).json(historiTindakan))
    .catch(err => {
      console.error(err);
      res.status(400).json(`error`);
    });
};