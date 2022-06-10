let {
  connection
} = require("../module/database");
let {
  logTransaksiObat
} = require("./transaksiObat");

exports.tambahRacik = (
  uid_pesanan, data
) => {
  let newData = {
    nomor_rekam_medis: data.nomor_rekam_medis,
    nama_racik: data.nama_racik,
    komposisi: data.komposisi,
    nama_dokter: data.nik_dokter,
    jumlah_racik: data.jumlah_racik,
    id_lokasi: data.id_lokasi,
    uid_pesanan: uid_pesanan
  }
  newData.nama_racik + "".toLowerCase
  newData.komposisi + "".toLowerCase
  // console.log(newData)
  let field = Object.keys(newData).join(", ");
  let param = Object.keys(newData)
    .map((_, i) => `$${i + 1}`)
    .join(", ");
  // console.log(field, param)
  return connection
    .query(
      `
      insert into racik(${field})
      values(${param}) returning * 
      `,
      [...Object.keys(newData).map(el => newData[el])]
    )
    .then(({
      rows
    }) => rows);
};

exports.listRacik = (uid, limit, from, cari, id_lokasi) => {
  let param = [limit ? limit : 50, from ? from : 0, id_lokasi];
  // console.log("miaw", param)
  return connection
    .query(
      `
    select * from racik
    ${
      uid
        ? "where (uid = $4 or uid_pesanan = $4)  and waktu_terbit >= now()::date and waktu_terbit < now()::date +1  and id_lokasi = $3"
        : cari
        ? " where (nomor_rekam_medis like $4 or nama_dokter like $4)  and waktu_terbit >= now()::date and waktu_terbit < now()::date +1 and id_lokasi = $3 "
        : " where waktu_terbit >= now()::date and waktu_terbit < now()::date +1 and id_lokasi = $3 "
    }
    order by uid
    offset $2
    limit $1
    `,
      uid ? param.concat(uid) : cari ? param.concat(`%${cari+"".toLowerCase}%`) : param
    )
    .then(({
      rows
    }) => rows);
};

exports.editHargaRacik = async (uid, nik_karyawan, id_lokasi, listDetail) => {
  try {
    await connection.query("BEGIN");
    let harga = 0;
    // console.log(listDetail)
    for (let index in listDetail) {
      harga = harga + listDetail[index].jumlah_keluar * listDetail[index].harga;
      // console.log(harga);
      let {
        uid_obat,
        stok_obat
      } = await connection
        .query(`
        select obat.uid as uid_obat,
        stok_obat.stok as stok_obat from stok_obat
        join obat on obat.uid = stok_obat.uid_obat where stok_obat.uid=$1
        `,
          [listDetail[index].uid_stok]
        )
        .then(({
          rows
        }) => rows[0])
        .catch(err => {
          console.log(err)
          throw err
        });
      // console.log(uid_obat, nama_obat, stok_obat);
      await connection.query(
        `update stok_obat set stok = $1 where uid = $2 returning *
        `,
        [stok_obat - listDetail[index].jumlah_keluar, listDetail[index].uid_stok]
      );
      await logTransaksiObat({
        uid_obat,
        uid_stok_obat: listDetail[index].uid_stok,
        jumlah: 0 - listDetail[index].jumlah_keluar,
        nik_karyawan,
        id_lokasi
      });
    }
    // console.log(harga);
    // console.log("miaw")
    connection.query(
      `update racik set  harga =$1 where uid= $2 returning *
      `, [harga, uid]
    );
    await connection.query("COMMIT");
    return {
      uid,
      nik_karyawan,
      id_lokasi,
      listDetail
    };
  } catch (err) {
    await connection.query("ROLLBACK");
    throw err;
  }
};

exports.hapusRacik = uid => {
  return connection
    .query(
      `delete from racik where uid = $1 returning *
    `,
      [uid]
    )
    .then(({
      rows
    }) => rows);
};


exports.editStatusRacik = (uid, status) => {
  return connection
    .query(
      `update racik set status = $2 where uid = $1 returning *
          `,
      [uid, status]
    )
    .then(({
      rows
    }) => rows);
};