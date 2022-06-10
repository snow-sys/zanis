let {
  editAntrian
} = require("../../repository/antrian");

module.exports = (req, res) => {
  let {
    uid
  } = req.params;
  let {
    status_antrian
  } = req.query
  editAntrian(uid, status_antrian)
    .then(antrian => res.status(200).json(antrian))
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
};