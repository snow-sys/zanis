let { connection } = require("../module/database");

exports.tambahJadwalDokter = (
  data = {
    nama_dokter,
    hari,
    waktu_start,
    waktu_akhir,
    nama_poli
  }
) => {
  let field = Object.keys(data).join(", ");
  let param = Object.keys(data)
    .map((_, i) => `$${i + 1}`)
    .join(", ");
  return connection
    .query(
      `
      insert into jadwal_dokter(${field})
      values(${param}) returning *
      `,
      [...Object.keys(data).map(el => data[el])]
    )
    .then(({ rows }) => rows);
};

exports.listJadwalDokter = ({ namaPoli, limit, from }) => {
  let param = [from, limit];
  return connection
    .query(
      `
      select * from jadwal_dokter 
      ${namaPoli ? "where nama_poli = $3" : ""}
      order by hari asc
      offset $1
      limit $2
      `,
      namaPoli ? param.concat(namaPoli) : param
    )
    .then(({ rows }) => rows);
};

exports.editJadwalDokter = (
  uid,
  data = {
    nama_dokter,
    hari,
    waktu_start,
    waktu_akhir,
    nama_poli
  }
) => {
  let newData = Object.keys(data).filter(field => data[field] !== undefined);
  let varSql = newData
    .map((field, index) => `${field} = $${index + 2}`)
    .join(", ");
  let varData = newData.map(field => data[field]);
  return connection
    .query(`update jadwal_dokter set ${varSql} where uid = $1 returning *`, [
      uid,
      ...varData
    ])
    .then(({ rows }) => rows[0]);
};

exports.hapusJadwalDokter = uid =>
  connection
    .query(`delete from jadwal_dokter where uid = $1`, [uid])
    .then(({ rowCount }) => (rowCount > 0 ? true : false));
