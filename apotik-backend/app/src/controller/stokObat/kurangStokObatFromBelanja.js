let {
  kurangStokObatFromBelanja
} = require("../../repository/stokObat");

module.exports = (req, res) => {
  let
    data = req.body;
  // console.log(data)
  kurangStokObatFromBelanja(data)
    .then(stokObat => res.status(200).json(stokObat))
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
};