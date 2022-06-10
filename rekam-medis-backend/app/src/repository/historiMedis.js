let {
  connection
} = require("../module/database");
let ax = require("axios").default;

exports.tambahHistoriMedis = async (nomor_rekam_medis, id_lokasi, data) => {
  // //coding v2
  // //cek RM apakah sudah ada RM yang diinput. ambil field analisa
  // let cekHM = await connection
  //   .query(
  //     `select analisa from histori_medis where nomor_rekam_medis = $1 and waktu_checkup >= now()::date and waktu_checkup < now()::date + 1
  //     order by waktu_checkup desc limit 1
  //   `,
  //     [nomor_rekam_medis]
  //   )
  //   .then(({
  //     rows
  //   }) => rows);
  // // console.log("miaw", cekHM);
  // //ubah bentuk data yang akan diinput
  // let newData = {
  //   nik_dokter: data.nik_dokter,
  //   subjektif: data.subjektif,
  //   objektif: data.objektif,
  //   analisa: data.analisa ? data.analisa : "test",
  //   tindakan: data.tindakan ? data.tindakan : "test",
  //   diagnosa: data.diagnosa ? data.diagnosa : "test",
  //   jenis_perawatan: data.jenis_perawatan,
  //   nama_terapis: data.nama_terapis,
  //   penjamin: data.penjamin,
  //   catatan: data.catatan
  // };
  // // console.log("newdata", newData);
  // let field = Object.keys(newData).join(", ");
  // let param = Object.keys(newData)
  //   .map((_, i) => `$${i + 2}`)
  //   .join(", ");
  // // console.log("miawmiaw", newData);
  // //jika id_lokasi adalah id lokasi TNC
  // if (id_lokasi == 1 || id_lokasi == 2) {
  //   console.log("tambah RM di TNC");
  //   return connection
  //     .query(
  //       `
  //         insert into histori_medis(nomor_rekam_medis, ${field})
  //         values($1, ${param}) returning *
  //         `,
  //       [nomor_rekam_medis, ...Object.keys(newData).map(el => newData[el])]
  //     )
  //     .then(({
  //       rows
  //     }) => rows[0]);
  // }
  // //jika id lokasi selain id lokasi tnc, cek dahulu apakah field analisa adalah test. jika ia
  // //maka update field yg berisikan test, jika tidak makan input rekam medis
  // else if (cekHM[0].analisa == "test") {
  //   console.log("update RM di klinik");
  //   let uidRM = await connection
  //     .query(
  //       `
  //   select uid from histori_medis
  //     where nomor_rekam_medis = $1 and (waktu_checkup >= now()::date and waktu_checkup < now()::date + 1) order by waktu_checkup desc limit 1
  //   `,
  //       [nomor_rekam_medis]
  //     )
  //     .then(({
  //       rows
  //     }) => rows[0].uid);
  //   // console.log(uidRM);
  //   return connection
  //     .query(
  //       `
  //     update histori_medis set analisa = $1 , tindakan = $2, diagnosa = $3 where uid = $4
  //     returning *
  //   `,
  //       [newData.analisa, newData.tindakan, newData.diagnosa, uidRM]
  //     )
  //     .then(({
  //       rows
  //     }) => rows);
  // } else {
  //   console.log("tambah RM di klinik");
  //   return connection
  //     .query(
  //       `
  //         insert into histori_medis(nomor_rekam_medis, ${field})
  //         values($1, ${param}) returning *
  //         `,
  //       [nomor_rekam_medis, ...Object.keys(newData).map(el => newData[el])]
  //     )
  //     .then(({
  //       rows
  //     }) => rows[0]);
  // 

  //coding v1
  // let cekHM = await connection
  //   .query(
  //     `select uid from histori_medis where nomor_rekam_medis = $1 and waktu_checkup >= now()::date and waktu_checkup < now()::date + 1
  //     order by waktu_checkup desc
  //   `,
  //     [nomor_rekam_medis]
  //   )
  //   .then(({
  //     rows
  //   }) => rows[0]);
  // console.log("miaw", cekHM)
  let newData = {
    nik_dokter: data.nik_dokter,
    subjektif: data.subjektif,
    objektif: data.objektif,
    analisa: data.analisa,
    tindakan: data.tindakan,
    diagnosa: data.diagnosa,
    jenis_perawatan: data.jenis_perawatan,
    nama_terapis: data.nama_terapis,
    penjamin: data.penjamin,
    catatan: data.catatan
  };
  // console.log("newdata", newData);
  let field = Object.keys(newData).join(", ");
  let param = Object.keys(newData)
    .map((_, i) => `$${i + 2}`)
    .join(", ");
  // let cekAntrian = await ax
  //   .get(
  //     "http://165.22.98.116:8001/api/v1/antrian?status_antrian=menunggu&id_lokasi=" +
  //     id_lokasi +
  //     "&cari=" +
  //     nomor_rekam_medis
  //   )
  //   .then(data => data.data);
  // console.log('miawmiaw', cekAntrian);
  return connection
    .query(
      `
        insert into histori_medis(nomor_rekam_medis, ${field})
        values($1, ${param}) returning *
        `,
      [nomor_rekam_medis, ...Object.keys(newData).map(el => newData[el])]
    )
    .then(({
      rows
    }) => rows[0]);
};

exports.listHistoriMedis = ({
    nomor_rekam_medis,
    limit,
    from
  }) =>
  connection
  .query(
    `
      select * from histori_medis 
      where nomor_rekam_medis = $1
      order by waktu_checkup desc
      offset $2
      limit $3
      `,
    [nomor_rekam_medis, from ? from : 0, limit ? limit : 999]
  )
  .then(({
    rows
  }) => rows);

// exports.listTerapis = async ({
//   id_lokasi,
//   limit,
//   from
// }) => {
//   // console.log(id_lokasi);
//   return connection
//     .query(
//       `
//         select histori_medis.*, pasien.nama_pasien, pasien.tanggal_lahir, pasien.id_lokasi 
//         from histori_medis inner join pasien 
//         on pasien.nomor_rekam_medis = histori_medis.nomor_rekam_medis 
//         where waktu_checkup::date >= now()::date and waktu_checkup::date < now()::date + 1
//         ${id_lokasi ? "and pasien.id_lokasi = $3" : ""}
//         order by waktu_checkup
//         offset $1
//         limit $2
//         `,
//       id_lokasi ?
//       [from ? from : 0, limit ? limit : 200, id_lokasi] :
//       [from ? from : 0, limit ? limit : 200]
//     )
//     .then(({
//       rows
//     }) => rows);
// };

exports.listTerapis = async ({
  id_lokasi,
  limit,
  from
}) => {
  console.log(id_lokasi);
  return connection
    .query(
      `
        select histori_medis.*, pasien.nama_pasien, pasien.tanggal_lahir, pasien.id_lokasi 
        from histori_medis inner join pasien 
        on pasien.nomor_rekam_medis = histori_medis.nomor_rekam_medis 
        where waktu_checkup::date >= now()::date and waktu_checkup::date < now()::date + 1
        order by waktu_checkup
        offset $1
        limit $2
        `,
      [from ? from : 0, limit ? limit : 200]
    )
    .then(({
      rows
    }) => rows);
};

exports.editNamaTerapis = (uid, namaTerapis) => {
  return connection
    .query(
      `
    update histori_medis set nama_terapis = $1 where uid = $2 returning *
    `,
      [namaTerapis, uid]
    )
    .then(({
      rows
    }) => rows);
};

exports.editHistoriMedis = (nomor_rekam_medis, data) => {
  console.log(data);
  let newData = Object.keys(data).filter(field => data[field] !== undefined);
  let varSql = newData
    .map((field, index) => `${field} = $${index + 2}`)
    .join(", ");
  let varData = newData.map(field => data[field]);
  console.log(newData)
  return connection
    .query(
      `update histori_medis set ${varSql} where uid = (select uid from histori_medis
      where nomor_rekam_medis = $1 and (waktu_checkup >= now()::date and waktu_checkup < now()::date + 1) order by waktu_checkup desc limit 1)
      returning *`,
      [nomor_rekam_medis, ...varData]
    )
    .then(({
      rows
    }) => rows[0]);
};