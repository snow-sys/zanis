let { connection } = require("../module/database");

exports.tambahMember = (
  data = {
    nomor_pengenal,
    jenis_nomor_pengenal,
    email,
    password,
    nama_member,
    tempat_lahir,
    tanggal_lahir,
    jenis_kelamin,
    status,
    agama,
    alamat,
    kecamatan,
    kelurahan,
    kode_pos,
    telepon,
    handphone
  }
) => {
  let field = Object.keys(data).join(", ");
  let param = Object.keys(data)
    .map((_, i) => `$${i + 1}`)
    .join(", ");
  return connection
    .query(
      `
      insert into member(${field}) 
      values(${param}) returning *
      `,
      Object.keys(data).map(el => data[el])
    )
    .then(({ rows }) => rows[0]);
};

exports.listMember = ({ nomor_pengenal, limit, from }) => {
  let param = [from, limit];
  return connection
    .query(
      `
        select * from member 
        left join tier on member.tier_id = tier.id
        ${nomor_pengenal ? "where nomor_pengenal = $3" : ""} 
        order by tanggal_join desc
        offset $1
        limit $2
        `,
      nomor_pengenal ? param.concat(nomor_pengenal) : param
    )
    .then(({ rows }) => rows);
};

exports.editMember = (
  nomor_pengenal,
  data = {
    password,
    nama_member,
    tempat_lahir,
    tanggal_lahir,
    jenis_kelamin,
    status,
    agama,
    alamat,
    kecamatan,
    kelurahan,
    kode_pos,
    telepon,
    handphone
  }
) => {
  let newData = Object.keys(data).filter(field => data[field] !== undefined);
  let varSql = newData
    .map((field, index) => `${field} = $${index + 2}`)
    .join(", ");
  let varData = newData.map(field => data[field]);
  return connection
    .query(
      `update member set ${varSql} where nomor_pengenal = $1 returning *`,
      [nomor_pengenal, ...varData]
    )
    .then(({ rows }) => rows[0]);
};
