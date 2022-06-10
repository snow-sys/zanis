let {
  editTindakan
} = require("../../repository/tindakan");

module.exports = (req, res) => {
  let {
    uid
  } = req.params;
  
  let data = req.body;
  editTindakan(uid, data)
    .then(newTindakan => res.status(200).json(newTindakan))
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
};