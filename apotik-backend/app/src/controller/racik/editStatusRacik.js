let {
  editStatusRacik
} = require('../../repository/racik')

module.exports = (req, res) => {
  let {
    uid
  } = req.params
  let {
    status
  } = req.body
  // console.log(uid, status, harga)
  editStatusRacik(uid, status)
    .then(newData => res.status(200).json(newData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err)
    })
}