let { hapusObat } = require("../../repository/obat");

module.exports = (req, res) => {
  let { uid } = req.params;
  hapusObat(uid)
    .then(obat => res.status(200).json(obat))
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
};
