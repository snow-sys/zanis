let {
  tambahPasien,
  lastRM
} = require("../../repository/pasien");
let genRM = require("../../module/generateNomorRM");
let ax = require("axios").default;

module.exports = (req, res) => {
  let dataBody = req.body;
  // console.log(dataBody.id_lokasi)
  lastRM().then(async pasienTerakhir => {
    // console.log("miaw",pasienTerakhir)
    let nomor_rekam_medis = genRM(pasienTerakhir.nomor_rekam_medis);
    // console.log(nomor_rekam_medis);
    dataBody.nomor_kartu ? (cari = dataBody.nomor_kartu) : (cari = "");
    // console.log(nomor_rekam_medis);
    ax.get("http://165.22.98.116:8000/api/v1/member/" + cari + "?limit=2")
      .catch(_ => {
       ax.post('http://165.22.98.116:8000/api/v1/member', {
            "nomor_kartu": dataBody.nomor_kartu,
            "nomor_pengenal": dataBody.nomor_pengenal,
            "jenis_nomor_pengenal": dataBody.jenis_nomor_pengenal,
            "nama_member": dataBody.nama_member,
            "tempat_lahir": dataBody.tempat_lahir,
            "tanggal_lahir": dataBody.tanggal_lahir,
            "jenis_kelamin": dataBody.jenis_kelamin,
            "status": dataBody.status,
            "agama": dataBody.agama,
            "alamat": dataBody.alamat,
            "kecamatan": dataBody.kecamatan,
            "kelurahan": dataBody.kelurahan,
            "kode_pos": dataBody.kode_pos,
            "telepon": dataBody.telepon,
            "handphone": dataBody.handphone,
            "email": dataBody.email,
            "poin": 1000,
            "tier_id": 0
          })
          .then(res.status(201).json("berhasil simpan ke membership"))
          .catch(err => console.log(err))
        // await console.log("berhasil simpan ke membership")
      })
      tambahPasien({
        nomor_rekam_medis,
        ...dataBody,
        nama_pasien: dataBody.nama_member,
      })
      .then(newPasien => res.status(201).json(newPasien))
      .catch(err => {
        console.error(err);
        res.status(400).json("gagal menambahkan pasien");
      });
  });
};