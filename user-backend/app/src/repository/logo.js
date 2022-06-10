let fs = require('fs')
let {
  connection
} = require("../module/database");

exports.tambahLogo = async (id_lokasi, nama_logo) => {
  // console.log(id_lokasi, nama_logo)
  let cekLogo = await connection
    .query(
      `
  select nama_logo from logo where id_lokasi = $1
  `,
      [id_lokasi]
    )
    .then(({
      rows
    }) => rows);

  // console.log(cekLogo);
  if (cekLogo.length > 0) {
    // console.log("update");
    // console.log(process.cwd() + "/src/assets/" + cekLogo[0].nama_logo)
    fs.unlinkSync(process.cwd() + "/src/assets/" + cekLogo[0].nama_logo)
    return connection
      .query(
        `
        update logo set nama_logo = $2 where id_lokasi = $1 returning *
        `,
        [id_lokasi, nama_logo]
      )
      .then(({
        rows
      }) => rows[0]);
  } else {
    // console.log("tambah");
    return connection
      .query(
        `
        insert into logo(id_lokasi, nama_logo) values($1, $2) returning *
        `,
        [id_lokasi, nama_logo]
      )
      .then(({
        rows
      }) => rows[0]);
  }
};

exports.listLogo = id_lokasi => {
  return connection
    .query(
      `
  select nama_logo from logo where id_lokasi = $1
  `,
      [id_lokasi]
    )
    .then(({
      rows
    }) => rows[0]);
};