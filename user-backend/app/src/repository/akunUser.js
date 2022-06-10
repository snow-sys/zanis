let {
  connection
} = require("../module/database");

exports.tambahUser = ({
    nik,
    password,
    nama,
    email,
    role,
    id_lokasi
  }) =>
  connection.query(
    `
      insert into akun_user(nik, password, nama, email, role, id_lokasi) 
      values($1, $2, $3, $4, $5, $6) returning *
      `,
    [nik, password, nama, email, role, id_lokasi]
  );

exports.listUser = nik => {
  return connection.query(`
    select akun_user.*, logo.nama_logo from akun_user 
    inner join logo on akun_user.id_lokasi = logo.id_lokasi
    ${nik ? " where nik = $1":""} 
  `, nik ? [nik] : []).then(({
    rows
  }) => rows)

}

exports.editUser = (nik, {
  password,
  nama,
  email,
  id_lokasi
}) => {
  let data = {
    password,
    nama,
    email,
    id_lokasi
  };
  let newData = Object.keys(data).filter(field => data[field] !== undefined);
  let varSql = newData
    .map((field, index) => `${field} = $${index + 2}`)
    .join(", ");
  let varData = newData.map(field => data[field]);
  return connection.query(
    `update akun_user set ${varSql} where nik = $1 returning *`,
    [nik, ...varData]
  );
};

exports.login = (nik, encryptedPass) =>
  connection.query(`select * from akun_user
    inner join lokasi on akun_user.id_lokasi = lokasi.id
    where nik = $1 and password = $2`, [
    nik,
    encryptedPass
  ]);