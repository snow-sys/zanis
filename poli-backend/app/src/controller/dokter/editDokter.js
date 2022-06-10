let {
  editDokter
} = require("../../repository/dokter");

module.exports = (req, res) => {
  let {
    uid
  } = req.params;
  let data = req.body;
  // console.log(uid, data)
  editDokter(uid, data)
    .then(newDokter => res.status(200).json(newDokter))
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
};