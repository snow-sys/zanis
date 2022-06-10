let {
  listHistoriMedis
} = require("../../repository/historiMedis");
let ax = require('axios').default


module.exports = (req, res) => {
  let {
    nomor_rekam_medis
  } = req.params;
  let {
    limit,
    from
  } = req.query;
  listHistoriMedis({
      nomor_rekam_medis,
      limit,
      from
    })
    .then(async historiMedis => {
      // console.log(historiMedis)
      if (historiMedis.length > 0) {
        for (let index in historiMedis) {
          // console.log(historiMedis[index].nik_dokter)
          let nm_petugas = await ax.get('http://user:8000/api/v1/akun-user/' + historiMedis[index].nik_dokter)
            .then(data => {
              // console.log(data.data[0])
              if (data.data[0] == undefined){
                return ""
              }else  return data.data[0].nama
            })
            .catch("")
          // listHistoriMedis.push(nm_petugas)
          // console.log(nm_petugas + "(" + historiMedis[index].nik_dokter + ")")
          historiMedis[index].nik_dokter = nm_petugas + "(" + historiMedis[index].nik_dokter + ")"
        }
        res.status(200).json(historiMedis)
      } else {
        res.status(200).json(historiMedis)
      }
    })
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
};