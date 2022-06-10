let { connection } = require("../module/database");

exports.tambahTier = ({ nama_tier, level }) =>
  connection
    .query(
      `
      insert into tier(nama_tier, level) 
      values($1, $2) returning *
      `,
      [nama_tier, level]
    )
    .then(({ rows }) => rows[0]);

exports.listTier = () =>
  connection
    .query(`select * from tier order by level asc`)
    .then(({ rows }) => rows);

exports.editTier = (id, data = { nama_tier, level }) => {
  let newData = Object.keys(data).filter(field => data[field] !== undefined);
  let varSql = newData
    .map((field, index) => `${field} = $${index + 2}`)
    .join(", ");
  let varData = newData.map(field => data[field]);
  return connection
    .query(`update tier set ${varSql} where id = $1 returning *`, [
      id,
      ...varData
    ])
    .then(({ rows }) => rows[0]);
};

exports.hapusTier = id =>
  connection
    .query(`delete from tier where id = $1 returning *`, [parseInt(id)])
    .then(({ rows }) => rows);
