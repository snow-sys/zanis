let { listTindakan } = require("../../repository/tindakan");

module.exports = (req, res) => {
  let { uid } = req.params;
  let { cari, limit, from, id_lokasi } = req.query;
  listTindakan({ uid, cari, limit, from, id_lokasi })
    .then(tindakan => res.status(200).json(tindakan))
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
};
