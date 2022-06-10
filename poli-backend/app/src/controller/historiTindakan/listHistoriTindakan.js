let {
  listHistoriTindakan
} = require("../../repository/historiTindakan");

module.exports = (req, res) => {
  let {
    uid_histori_medis
  } = req.params;
  let {
    limit,
    from,
    id_lokasi
  } = req.query;
  listHistoriTindakan({
      uid_histori_medis,
      limit,
      from,
      id_lokasi
    })
    .then(tindakan => res.status(200).json(tindakan))
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
};