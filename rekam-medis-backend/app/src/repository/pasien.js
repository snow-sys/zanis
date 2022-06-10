let {
  connection
} = require("../module/database");
// let genRM = require("../module/generateNomorRM");

exports.tambahPasien = (
  data
) => {
  let newData = {
    nomor_pengenal: data.nomor_pengenal,
    nomor_rekam_medis: data.nomor_rekam_medis,
    jenis_nomor_pengenal: data.jenis_nomor_pengenal,
    nama_pasien: (data.nama_member + "").toLowerCase(),
    tempat_lahir: data.tempat_lahir,
    tanggal_lahir: data.tanggal_lahir,
    jenis_kelamin: data.jenis_kelamin,
    status: data.status,
    agama: data.agama,
    alamat: data.alamat,
    kecamatan: data.kecamatan,
    kelurahan: data.kelurahan,
    kode_pos: data.kode_pos,
    telepon: data.telepon,
    handphone: data.handphone,
    pendidikan: data.pendidikan,
    pekerjaan: data.pekerjaan,
    kantor: data.kantor,
    catatan: data.catatan,
    id_lokasi: data.id_lokasi

  }
  let field = Object.keys(newData).join(", ");
  let param = Object.keys(newData)
    .map((_, i) => `$${i + 1}`)
    .join(", ");
  console.log("testing", newData)
  return connection
    .query(
      `
      insert into pasien(${field})
      values(${param}) returning *
      `,
      [...Object.keys(newData).map(el => newData[el])]
    )
    .then(({
      rows
    }) => rows[0]);
};

exports.listPasien = async ({
  nomor_rekam_medis,
  cari,
  limit,
  from,
  id_lokasi
}) => {
  // console.log(cari, limit, from, id_lokasi)
  let param = [from, limit ? limit : 300];

  let where = nomor_rekam_medis ?
    "WHERE nomor_rekam_medis = $3" :
    cari ?
    "WHERE (nomor_rekam_medis LIKE $3 OR nama_pasien LIKE $3 OR nomor_pengenal LIKE $3)" :
    "";

  let params = nomor_rekam_medis ?
    param.concat(nomor_rekam_medis) :
    cari ?
    param.concat(`%${cari}%`) :
    param;

  let list = await connection
    .query(
      `
    SELECT * FROM pasien 
    ${where}
    ORDER BY nomor_rekam_medis DESC
    OFFSET $1
    LIMIT $2
    `,
      params
    )
    .then(({
      rows
    }) => rows);

  let listDetail = await connection
    .query(
      `
    SELECT histori_medis.*, pasien.id_lokasi from pasien
    JOIN histori_medis
    ON pasien.nomor_rekam_medis = histori_medis.nomor_rekam_medis
    WHERE pasien.nomor_rekam_medis in (
      SELECT nomor_rekam_medis from pasien
      ${where}
      OFFSET $1
      LIMIT $2
    )
    ORDER BY waktu_checkup DESC
    `,
      params
    )
    .then(({
      rows
    }) => rows);
  return list.map(data => {
    return {
      ...data,
      histori_medis: listDetail
        .filter(
          ({
            nomor_rekam_medis
          }) =>
          nomor_rekam_medis === data.nomor_rekam_medis
        )
        .map(({
          nomor_rekam_medis,
          ...val
        }) => val)
    };
  });
};

exports.editPasien = (
  nomor_rekam_medis,
  data = {
    nomor_pengenal,
    jenis_nomor_pengenal,
    email,
    nama_pasien,
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
    handphone,
    pendidikan,
    pekerjaan,
    kantor,
    catatan,
    id_lokasi
  }
) => {
  let newData = Object.keys(data).filter(field => data[field] !== undefined);
  let varSql = newData
    .map((field, index) => `${field} = $${index + 2}`)
    .join(", ");
  let varData = newData.map(field => data[field]);
  return connection
    .query(
      `update pasien set ${varSql} where nomor_rekam_medis = $1 returning *`,
      [nomor_rekam_medis, ...varData]
    )
    .then(({
      rows
    }) => rows[0]);
};
exports.lastRM = () => {
  return connection
    .query(
      `select nomor_rekam_medis from pasien order by nomor_rekam_medis desc`
    )
    .then(({
      rows
    }) => rows[0]);
};