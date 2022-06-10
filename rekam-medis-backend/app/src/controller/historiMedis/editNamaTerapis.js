let {
  editNamaTerapis
} = require("../../repository/historiMedis");

module.exports = (req, res) => {
  let {
    uid
  } = req.params;
  let {
    namaTerapis
  } = req.body;
  editNamaTerapis(uid, namaTerapis)
    .then(newHistoriMedis => res.status(201).json(newHistoriMedis))
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
};