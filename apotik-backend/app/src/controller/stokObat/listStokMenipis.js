let {
  listMenipis
} = require("../../repository/stokObat");

module.exports = (req, res) => {
  let {
    id_lokasi,
    limit,
    from
  } = req.query
  listMenipis(id_lokasi, limit, from)
    .then(stokObat => res.status(200).json(stokObat))
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
};