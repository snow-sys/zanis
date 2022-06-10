let {
  listLokasi
} = require("../../repository/lokasi");

module.exports = (req, res) => {
  let {
    id_lokasi
  } = req.params;
  // console.log("miaw", id_lokasi)
  listLokasi({
      id_lokasi
    })
    .then(newLokasi => res.status(201).json(newLokasi))
    .catch(err => res.json(err));
};