let { connection } = require("../module/database");

exports.tambahAntrianPoli = (
  data = {
    poli,
    nomor_antrian
  }
) =>
  connection
    .query(
      `
      insert into antrian_poli (poli, nomor_antrian) values($1, $2)
      returning *
      `,
      [data.poli, data.nomor_antrian]
    )
    .then(({ rows }) => rows);

exports.listAntrianPoli = ({ status, limit, from }) => {
  let param = [from, limit];
  return connection
    .query(
      `
      select * from antrian_poli
      ${status ? "where status = $3" : ""}
      order by nomor_antrian asc
      offset $1
      limit $2
      `,
      status ? param.concat(status) : param
    )
    .then(({ rows }) => rows);
};

exports.editAntrianPoli = (
  uid,
  data = { waktu_dilayani, poli, status_antrian }
) => {
  let newData = Object.keys(data).filter(field => data[field] !== undefined);
  let varSql = newData
    .map((field, index) => `${field} = $${index + 2}`)
    .join(", ");
  let varData = newData.map(field => data[field]);
  return connection
    .query(`update antrian_poli set ${varSql} where uid = $1 returning *`, [
      uid,
      ...varData
    ])
    .then(({ rows }) => rows[0]);
};
