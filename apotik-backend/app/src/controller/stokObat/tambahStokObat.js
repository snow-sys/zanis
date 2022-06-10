let {
  tambahStokObat
} = require("../../repository/stokObat");

module.exports = (req, res) => {
  let {
    uid_obat
  } = req.params;
  let data = req.body;
  tambahStokObat(uid_obat, data)
    .then(newStokObat => res.status(201).json(newStokObat))
    .catch(err => {
      console.log(err);
      res.status(400).json(`error`);
    });
};