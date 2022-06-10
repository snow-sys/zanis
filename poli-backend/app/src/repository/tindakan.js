let {
  connection
} = require("../module/database");

exports.tambahTindakan = (
  data = {
    nama_tindakan,
    biaya_tindakan,
    jenis,
    id_lokasi
  }
) => {
  let field = Object.keys(data).join(", ");
  let param = Object.keys(data)
    .map((_, i) => `$${i + 1}`)
    .join(", ");
  return connection
    .query(
      `
      insert into tindakan(${field})
      values(${param}) returning *
      `,
      [...Object.keys(data).map(el => data[el])]
    )
    .then(({
      rows
    }) => rows);
};

exports.listTindakan = ({
  uid,
  cari,
  limit,
  from,
  id_lokasi
}) => {
  let param = [from, limit, id_lokasi];
  return connection
    .query(
      `
        select * from tindakan 
        ${
          uid
            ? "where uid = $4 and id_lokasi = $3 "
            : cari
            ? "where (nama_tindakan like $4 or jenis like $4) and id_lokasi = $3 "
            : "where id_lokasi = $3"
        } 
        order by nama_tindakan asc
        offset $1
        limit $2
        `,
      uid ? param.concat(`%${uid}%`) : cari ? param.concat(`%${cari}%`) : param
    )
    .then(({
      rows
    }) => rows);
};

exports.editTindakan = (uid, data = {
  nama_tindakan,
  biaya_tindakan
}) => {
  let newData = Object.keys(data).filter(field => data[field] !== undefined);
  let varSql = newData
    .map((field, index) => `${field} = $${index + 2}`)
    .join(", ");
  let varData = newData.map(field => data[field]);
  return connection
    .query(`update tindakan set ${varSql} where uid = $1 returning *`, [
      uid,
      ...varData
    ])
    .then(({
      rows
    }) => rows[0]);
};

exports.hapusTindakan = (uid) =>
  connection
  .query(`delete from tindakan where uid = $1 returning * `, [uid])
  .then(({
    rows
  }) => rows);