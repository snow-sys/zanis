let {
  connection
} = require("../module/database");

exports.tambahObat = (
  data = {
    nama_obat,
    minimal_stok,
    kategori,
    satuan,
    id_lokasi,
    komposisi
  }
) => {
  let field = Object.keys(data).join(", ");
  let param = Object.keys(data)
    .map((_, i) => `$${i + 1}`)
    .join(", ");
  return connection
    .query(
      `
      insert into obat(${field})
      values(${param}) returning *
      `,
      [...Object.keys(data).map(el => data[el])]
    )
    .then(({
      rows
    }) => rows);
};

exports.listObat = ({
  uid,
  cari,
  limit,
  from,
  id_lokasi
}) => {
  let param = [from ? from : 0, limit ? limit : 10000, id_lokasi];
  // console.log("miaw", param)
  return connection
    .query(
      `
      select obat.*, cast(coalesce(sum(stok_obat.stok), 0) as integer) as stok_total, stok_obat.harga_jual from obat 
      left join stok_obat on obat.uid = stok_obat.uid_obat
      ${
        uid ? "where obat.uid = $4 and stok_obat.stok > 0 and obat.id_lokasi = $3" :
        cari ? "where obat.nama_obat like $4 and stok_obat.stok > 0 and obat.id_lokasi = $3" :
         " where obat.id_lokasi = $3 and stok_obat.stok > 0 "
      }
      group by obat.uid, stok_obat.harga_jual
      order by nama_obat asc
      offset $1
      limit $2
      `,
      uid ?
      param.concat(`${uid}`) :
      cari ? param.concat(`%${cari}%`) :
      param
    )
    .then(({
        rows
      }) =>
      rows
    );
};
exports.cariObat = ({
  cari,
  limit,
  from,
  id_lokasi
}) => {
  let param = [from ? from : 0, limit, id_lokasi];
  return connection
    .query(
      `
      select obat.*, cast(coalesce(sum(stok_obat.stok), 0) as integer) as stok_total from obat 
      left join stok_obat on obat.uid = stok_obat.uid_obat
      ${
        cari ? "where obat.nama_obat like $4 and obat.id_lokasi = $3" :
         "where obat.id_lokasi = $3"
      }
      group by obat.uid
      order by nama_obat asc
      offset $1
      limit $2
      `,
      cari ? param.concat(`%${cari}%`) :
      param
    )
    .then(({
      rows
    }) => rows);
};

exports.cariUidObat = (nama_obat, id_lokasi) => {
  // console.log("miaw", nama_obat, id_lokasi)
  return connection.query(
    `select uid from obat where nama_obat like $1 and id_lokasi = $2`,
    [`%${nama_obat}%`, id_lokasi]).then(({
    rows
  }) => rows[0])
}

exports.editObat = (
  uid,
  data
) => {
  let data2 = {
    nama_obat: data.nama_obat,
    minimal_stok: data.minimal_stok,
    kategori: data.kategori,
    satuan: data.satuan,
    komposisi: data.komposisi
  }
  let id_lokasi = data.id_lokasi
  let newData = Object.keys(data2).filter(field => data2[field] !== undefined);
  let varSql = newData
    .map((field, index) => `${field} = $${index + 3}`)
    .join(", ");
  let varData = newData.map(field => data[field]);
  return connection
    .query(`update obat set ${varSql} where uid = $1 and id_lokasi = $2 returning *`, [
      uid, id_lokasi,
      ...varData
    ])
    .then(({
      rows
    }) => rows[0]);
};

exports.hapusObat = uid =>
  connection
  .query(`delete from obat where uid = $1 returning *`, [uid])
  .then(({
    rows
  }) => rows);