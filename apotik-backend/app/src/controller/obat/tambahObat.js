let {
  tambahObat
} = require("../../repository/obat");

module.exports = (req, res) => {
  let data = req.body;
  tambahObat(data)
    .then(newObat => res.status(201).json(newObat))
    .catch(err => {
      console.log(err);
      res.status(400).json(`${data.nama_obat} sudah ada`);
    });
};