let {
  hapusTindakan
} = require("../../repository/tindakan");

module.exports = (req, res) => {
  let {
    uid
  } = req.params;
  
  hapusTindakan(uid)
    .then(status => {
      res.status(200).json(status);

    })
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
};