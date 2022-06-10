let {
  editObat
} = require("../../repository/obat");

module.exports = (req, res) => {
  let {
    uid
  } = req.params;
  let data = req.body;
  // console.log("1", data)
  editObat(uid, data)
    .then(newObat => res.status(200).json(newObat))
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
};