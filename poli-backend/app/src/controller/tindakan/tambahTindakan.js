let { tambahTindakan } = require("../../repository/tindakan");

module.exports = (req, res) => {
  let { nama_tindakan, biaya_tindakan, jenis, id_lokasi } = req.body;
  tambahTindakan({ nama_tindakan, biaya_tindakan, jenis, id_lokasi })
    .then(tindakan => res.status(201).json(tindakan))
    .catch(err => {
      console.error(err);
      res.status(400).json(`${nama_tindakan} sudah ada`);
    });
};
