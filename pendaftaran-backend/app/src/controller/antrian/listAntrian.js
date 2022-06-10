let {
  listAntrian
} = require("../../repository/antrian");
let ax = require('axios').default

module.exports = (req, res) => {
  let {
    status_antrian,
    limit,
    from,
    id_lokasi,
    cari
  } = req.query;
  listAntrian({
      status_antrian,
      limit: limit || 100,
      from: from || 0,
      id_lokasi,
      cari
    })
    .then(async antrian => {
      // console.log(antrian)
      let list = []
      if (antrian.length > 0) {
        for (let index in antrian) {
          let nm_pasien = await ax.get('http://rekam-medis:8000/api/v1/pasien/' + antrian[index].nomor_rekam_medis + '?id_lokasi=' + id_lokasi)
            .then(data => ({
              nama_pasien: data.data[0].nama_pasien,
              tanggal_lahir: (data.data[0].tanggal_lahir + "").substr(0, 10),
              ...antrian[index]
            }))
          list.push(nm_pasien)
        }
        res.status(200).json(list)
      } else {
        res.status(200).json(list)
      }
    })
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
};