let {
  listRacik
} = require('../../repository/racik')

module.exports = (req, res) => {
  let {
    uid
  } = req.params
  let {
    limit,
    from,
    cari,
    id_lokasi
  } = req.query
  // console.log(id_lokasi)
  listRacik(uid, limit, from, cari, id_lokasi)
    .then(racik => res.status(200).json(racik))
    .catch(err => {
      console.log(err);
      res.status(400).catch(err)
    })
}