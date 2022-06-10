let {
  tambahPesananObat
} = require("../../repository/pesananObat");
let {
  connection
} = require("../../module/database")

module.exports = async (req, res) => {
  let {
    nik_dokter,
    nomor_rekam_medis,
    id_lokasi,
    detail_pesanan_obat
  } = req.body;
  let uid_pesanan = await connection.query(
    ` select uid from pesanan_obat where nomor_rekam_medis = $1 
    and status_pesanan = 'MENUNGGU'
    and waktu_pesan >= now()::date and waktu_pesan < now()::date + 1
    `, [nomor_rekam_medis]).then(({
    rows
  }) => rows[0])
  // console.log(uid_pesanan)
  if (uid_pesanan) {
    // console.log("miaw")
    for (let index in detail_pesanan_obat) {
      let {
        uid_obat,
        jumlah_obat,
        keterangan
      } = detail_pesanan_obat[index];
      await connection.query(
        `
            INSERT INTO detail_pesanan_obat(
              uid_pesanan,
              uid_obat,
              jumlah_obat,
              keterangan
            )
            VALUES ($1, $2, $3, $4)
          `,
        [uid_pesanan.uid, uid_obat, jumlah_obat, keterangan]
      ).then(({
        rows
      }) => rows[0]);
    }
    return res.status(201).json(req.body)
  } else {
    // console.log("wakwaw")
    await tambahPesananObat(nik_dokter, nomor_rekam_medis, id_lokasi, detail_pesanan_obat)
      .then(pesananObat => res.status(201).json(pesananObat))
      .catch(err => {
        console.log(err);
        res.status(400).json(`error`);
      });
  }
};