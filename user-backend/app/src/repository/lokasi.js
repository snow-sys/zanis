let {
  connection
} = require("../module/database");

exports.tambahLokasi = ({
    nama_lokasi,
    alamat
  }) =>
  connection.query(
    `
      insert into lokasi(nama_lokasi, alamat) 
      values($1, $2) returning *
      `,
    [nama_lokasi, alamat]
  );

exports.listLokasi = (id_lokasi) => {
  console.log(id_lokasi);
  return connection.query(
      `
      select * from lokasi ${id_lokasi.id_lokasi ? "where id = $1 ":""}
    `, id_lokasi.id_lokasi ? [id_lokasi.id_lokasi] : []

    )
    .then(({
      rows
    }) => rows);
}

exports.editLokasi = (id_lokasi, nama_lokasi, alamat) => {
  // console.log(id_lokasi, nama_lokasi, alamat)
  return connection.query(`update lokasi set 
  nama_lokasi = $2, 
  alamat = $3 where 
  id = $1 returning *`, [id_lokasi, nama_lokasi, alamat])
    .then(({
      rows
    }) => rows[0]);
}


exports.hapusLokasi = (id_lokasi) => {
  return connection.query('delete from lokasi where id=$1 returning *', [id_lokasi])
    .then(({
      rows
    }) => rows[0]);
}