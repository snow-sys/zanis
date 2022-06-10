let {
  connection
} = require("../module/database");
// let genNik = require("../module/genNIK")

exports.tambahDokter = (
  nik, nama_dokter, poli, id_lokasi
) => {
  console.log(nik, nama_dokter, poli, id_lokasi)
  // let prevNik = await connection.query(
  //   ` select nik from dokter order by nik desc
  //   `).then(({
  //   rows
  // }) => rows[0])
  // console.log(prevNik)
  // let nik = genNik(prevNik)
  // console.log("miaw", nik)
  let param = [nik, nama_dokter, poli, id_lokasi]
  console.log(param)
  return connection
    .query(
      `
      insert into dokter (nik, nama_dokter, poli, id_lokasi) values($1, $2, $3, $4) returning *
      `, param
    )
    .then(({
      rows
    }) => rows);
}

exports.listDokter = (uid, cari, id_lokasi) => {
  // console.log(uid, cari, id_lokasi)
  let param = [0, 30, id_lokasi]
  return connection.query(
    ` select*from dokter
      ${uid ? "where uid = $4 and id_lokasi = $3" :
       cari ? "where (nik like $4 or nama_dokter like $4 or poli like $4) and id_lokasi = $3":
       "where id_lokasi = $3"} 
    limit $2 offset $1
    `,
    uid ? param.concat(uid) : cari ? param.concat(`%${cari}%`) : param       
).then(({
  rows
}) => rows)
}

exports.editDokter = (uid, data) => {
  console.log(uid, data)
  let newData = Object.keys(data).filter(field => data[field] !== undefined);
  let varSql = newData
    .map((field, index) => `${field} = $${index + 2}`)
    .join(", ");
  let varData = newData.map(field => data[field]);
  return connection
    .query(`update dokter set ${varSql} where uid = $1 returning *`, [
      uid,
      ...varData
    ])
    .then(({
      rows
    }) => rows[0]);

}

exports.hapusDokter = (uid) => {
  console.log(uid)
  return connection.query(
    `
    delete from dokter where uid = $1 returning *
    `, [uid]
  ).then(({
    rows
  }) => rows)
}