let {
  listTerapis
} = require("../../repository/historiMedis");
let ax = require("axios").default;

module.exports = (req, res) => {
  let {
    id_lokasi
  } = req.params;
  let {
    limit,
    from
  } = req.query;
  // console.log(waktu_checkup, limit, from, id_lokasi)
  listTerapis({
      id_lokasi,
      limit,
      from
    })
    .then(async historiMedis => {
      var hasil = []
      for (let i = 0; i < historiMedis.length; i++) {
        let test2 = await ax.get("http://user:8000/api/v1/akun-user/" + historiMedis[i].nik_dokter)
          .then(data => data.data[0].id_lokasi)
        if (test2 == id_lokasi) {
          // console.log(listHistory[i])
          hasil.push(historiMedis[i])
        }
      }
      res
        .status(200)
        .json(hasil)
    })
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
};