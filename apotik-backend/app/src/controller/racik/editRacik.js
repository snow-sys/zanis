let {
  editRacik
} = require('../../repository/racik')

module.exports = (req, res) => {
  let {
    uid
  } = req.params
  let {
    status,
    listDetail
  } = req.body
  // console.log(uid, status, harga)
  editRacik(uid, status, listDetail)
    .then(newData => res.status(200).json(newData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err)
    })
}