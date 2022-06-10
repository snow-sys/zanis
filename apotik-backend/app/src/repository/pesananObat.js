let {
  connection
} = require("../module/database");
let ax = require('axios').default

exports.tambahPesananObat = async (
  nik_dokter,
  nomor_rekam_medis,
  id_lokasi,
  detail_pesanan_obat,

) => {
  try {
    await connection.query("BEGIN");
    let {
      uid
    } = await connection
      .query(
        `
          INSERT INTO pesanan_obat(nik_dokter, nomor_rekam_medis, id_lokasi)
          VALUES($1, $2, $3) RETURNING uid
        `,
        [nik_dokter, nomor_rekam_medis, id_lokasi]
      )
      .then(({
        rows
      }) => rows[0]);

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
        [uid, uid_obat, jumlah_obat, keterangan]
      );
    }

    await connection.query("COMMIT");
    return {
      nik_dokter,
      nomor_rekam_medis,
      detail_pesanan_obat
    };
  } catch (err) {
    await connection.query("ROLLBACK");
    throw err;
  }
};

exports.listPesananObat = async (
  uid_pesanan,
  status_pesanan,
  id_lokasi,
  limit,
  from
) => {
  // console.log("abc", uid_pesanan,
  //   status_pesanan,
  //   id_lokasi,
  //   limit,
  //   from)
  let param = [from ? from : 0, limit ? limit : 10];
  // console.log(param.concat(status_pesanan).concat(id_lokasi))
  let listPesanan = await connection
    .query(
      `
    SELECT * from pesanan_obat
    ${
         uid_pesanan
        ? "WHERE uid = $3 "
        : " where status_pesanan = $3 and waktu_pesan >= now()::date and waktu_pesan < now()::date +1 and id_lokasi = $4"
    }
    OFFSET $1
    LIMIT $2
    `,
      uid_pesanan ?
      param.concat(uid_pesanan) :
      param.concat(status_pesanan).concat(id_lokasi)
    )
    .then(({
      rows
    }) => rows);


  if (uid_pesanan) {
    let detailPesanan = await connection
      .query(
        `
      SELECT 
        detail_pesanan_obat.uid, 
        obat.uid as uid_obat,
        obat.nama_obat, 
        detail_pesanan_obat.jumlah_obat,
        obat.satuan, 
        obat.kategori,
        detail_pesanan_obat.keterangan 

      FROM detail_pesanan_obat
      JOIN obat
      ON detail_pesanan_obat.uid_obat = obat.uid
      WHERE uid_pesanan = $1
      `,
        [uid_pesanan]
      )
      .then(({
        rows
      }) => rows);
    // console.log(detailPesanan)

    for (let index in detailPesanan) {
      let harga_obat = await connection.query(`
      select stok_obat.harga_jual from stok_obat inner join obat
      on stok_obat.uid_obat = obat.uid where obat.uid = $1 
      order by kadaluarsa limit $2
      `, [detailPesanan[index].uid_obat, 1]).then(({
        rows
      }) => rows[0])
      detailPesanan[index].harga_jual = harga_obat.harga_jual
      // console.log(harga_obat.harga_jual)
    }


    return {
      ...listPesanan[0],
      detail_pesanan: detailPesanan
    };
  }

  return listPesanan;
};

exports.editPesananObat = (
  uid,
  data = {
    uid_obat,
    nomor_rekam_medis,
    status_pesanan,
    waktu_selesai
  }
) => {
  let newData = Object.keys(data).filter(field => data[field] !== undefined);
  let varSql = newData
    .map((field, index) => `${field} = $${index + 2}`)
    .join(", ");
  let varData = newData.map(field => data[field]);
  // console.log(uid, data)
  return connection
    .query(`update pesanan_obat set ${varSql} where uid = $1 returning *`, [
      uid,
      ...varData
    ])
    .then(({
      rows
    }) => rows[0]);
};

exports.cariUIDPesanan =
  (cari) => {
    return connection
      .query(
        `select uid from pesanan_obat where nomor_rekam_medis = $1 and
     waktu_pesan >= now()::date and waktu_pesan < now()::date +1 and
     status_pesanan = 'KONFIRMASI'
    `, [cari])
      .then(({
        rows
      }) => rows);
  };