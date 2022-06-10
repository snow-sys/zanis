let {
  hapusRacik
} = require('../../repository/racik')


module.exports = (req, res) => {
  let {
    uid
  } = req.params
  hapusRacik(uid)
    .then(newData => res.status(200).json(newData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err)
    })
}