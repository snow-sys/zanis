let {
    totalAntrian
  } = require("../../repository/antrian");
  let ax = require('axios').default
  
  module.exports = (req, res) => {
    let {
      tanggal_mulai,
      sampai_tanggal,
      id_lokasi
    } = req.query;
    totalAntrian({tanggal_mulai, sampai_tanggal, id_lokasi})
      .then(async antrian => {
        // console.log(antrian)
        let list = []
        if (antrian.length > 0) {
          for (let index in antrian) {
            let nm_pasien = await ax.get('http://rekam-medis:8000/api/v1/pasien/' + antrian[index].nomor_rekam_medis)
              .then(data => ({
                nama_pasien: data.data[0].nama_pasien,
                tanggal_lahir: (data.data[0].tanggal_lahir + "").substr(0, 10),
                ...antrian[index]
              }))
              let namaLokasiByID = await ax.get('http://user:8000/api/v1/lokasi/'+antrian[index].id_lokasi)
              .then(data => data.data[0])
              nm_pasien.nama_lokasi = namaLokasiByID.nama_lokasi ? namaLokasiByID.nama_lokasi : "nama klinik tidak ditemukan"
              nm_pasien.alamat=namaLokasiByID.alamat ? namaLokasiByID.alamat : "alamat klinik tidak ditemukan"
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