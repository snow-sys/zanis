let {
  hapusStokPerObat
} = require("../../repository/stokObat");

module.exports = (req, res) => {
  let {
    uid
  } = req.params;
  hapusStokPerObat(uid)
    .then(stokObat => res.status(200).json(stokObat))
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
};