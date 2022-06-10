let {
  connection
} = require("../module/database");
let {
  logTransaksiObat
} = require("./transaksiObat");
let {
  listPesananObat
} = require("./pesananObat")

exports.tambahStokObat = async (
  uid_obat,
  data = {
    stok,
    kadaluarsa,
    harga_modal,
    harga_jual,
    nik_penerima,
    id_lokasi
  }
) => {
  try {
    let field = Object.keys(data).join(", ");
    let param = Object.keys(data)
      .map((_, i) => `$${i + 2}`)
      .join(", ");
    await connection.query("begin");

    let newStok = await connection
      .query(
        `
      insert into stok_obat(uid_obat, ${field})
      values($1, ${param}) returning *
      `,
        [uid_obat, ...Object.keys(data).map(el => data[el])]
      )
      .then(({
        rows
      }) => rows[0]);

    await logTransaksiObat({
      uid_obat,
      uid_stok_obat: newStok.uid,
      jumlah: data.stok,
      nik_karyawan: data.nik_penerima,
      id_lokasi: data.id_lokasi
    });
    await connection.query("commit");
    return newStok;
  } catch (error) {
    await connection.query("rollback");
    throw error;
  }
};

exports.listStokObat = (uid_obat, limit, from, cari, id_lokasi) => {
  // console.log(limit, from, uid_obat,id_lokasi)
  let param = [from ? from : 0, limit ? limit : 999, id_lokasi]
  return connection
    .query(
      `
        select 
          stok_obat.uid,
          stok_obat.uid_obat,
          stok_obat.stok,
          stok_obat.harga_modal,
          stok_obat.waktu_masuk,
          stok_obat.kadaluarsa,
          stok_obat.nik_penerima,
          stok_obat.harga_jual,
          stok_obat.id_lokasi,
          obat.nama_obat,
          obat.minimal_stok,
          obat.kategori,
          obat.satuan
        from stok_obat join obat on stok_obat.uid_obat = obat.uid
        ${uid_obat ? "where stok_obat.uid_obat = $4 and stok_obat.id_lokasi = $3" :
        cari ? "where lower(obat.nama_obat) like $4 and stok_obat.id_lokasi = $3 " :
          "where stok_obat.id_lokasi = $3"} 
        order by kadaluarsa asc
        offset $1
        limit $2
        `,
      uid_obat ? param.concat(uid_obat) :
      cari ? param.concat(`%${cari}%`) :
      param
    )
    .then(({
      rows
    }) => rows);
}

exports.listKadaluarsa = (tanggal, id_lokasi) => {
  return connection
    .query(
      `
        select stok_obat.*, obat.nama_obat from stok_obat 
        left join obat on obat.uid = stok_obat.uid_obat 
        where kadaluarsa::date-30<=$1 and stok_obat.id_lokasi = $2
        `,
      [tanggal, id_lokasi]
    )
    .then(({
      rows
    }) => rows);
}

exports.listMenipis = (id_lokasi, limit, from) => {
  let param = [limit ? limit : 999, from ? from : 0, id_lokasi]
  // console.log(id_lokasi, limit, from)
  return connection
    .query(
      `
        select stok_obat.*, obat.nama_obat, obat.minimal_stok from stok_obat 
        left join obat on obat.uid = stok_obat.uid_obat 
        where stok_obat.id_lokasi = $3 and stok_obat.stok <= obat.minimal_stok 
        group by stok_obat.uid, obat.nama_obat, obat.minimal_stok
        offset $2
        limit $1
        `,
      param
    )
    .then(({
      rows
    }) => rows);
}

exports.listBelanja = async (nama_obat, id_lokasi) => {
  // console.log(nama_obat)
  try {
    await connection.query('BEGIN')
    let param2 = [id_lokasi]
    // console.log(nama_obat, uid_obat)
    let listObat = await connection
      .query(
        `
          select * from obat inner join stok_obat on obat.uid = stok_obat.uid_obat 
          ${
            nama_obat ? "where obat.nama_obat like $2 and obat.id_lokasi = $1 and stok_obat.stok > 0" :
             "where obat.id_lokasi = $1 and stok_obat.stok > 0"
          }
          order by obat.nama_obat asc
          `,
        nama_obat ? param2.concat(`%${nama_obat}%`) : param2
      )
      .then(({
        rows
      }) => rows);
    // console.log(listObat)

    await connection.query("COMMIT");
    return listObat
  } catch (err) {
    await connection.query("ROLLBACK");
    throw err;
  }
}
exports.editStokObat = (
  uid_stok_obat, id_lokasi,
  data = {
    stok,
    harga_modal,
    harga_jual,
    kadaluarsa
  }
) => {
  let newData = Object.keys(data).filter(field => data[field] !== undefined);
  let varSql = newData
    .map((field, index) => `${field} = $${index + 3}`)
    .join(", ");
  let varData = newData.map(field => data[field]);
  return connection
    .query(`update stok_obat set ${varSql} where uid = $1 and id_lokasi = $2 returning *`, [
      uid_stok_obat,
      id_lokasi,
      ...varData
    ])
    .then(({
      rows
    }) => rows[0]);
};

exports.hapusStokObat = (uid_stok_obat, id_lokasi) =>
  connection
  .query(`delete from stok_obat where uid = $1 and id_lokasi = $2 returning *`,
    [uid_stok_obat, id_lokasi])
  .then(({
    rows
  }) => rows);

exports.hapusStokPerObat = (uid) =>
  connection
  .query(`delete from stok_obat where uid = $1 returning *`,
    [uid])
  .then(({
    rows
  }) => rows);

exports.kurangStokObat = async (uid_pesanan, nik_karyawan, id_lokasi) => {
  try {
    let isi_pesanan = await listPesananObat(
      uid_pesanan,
      status_pesanan = "KONFIRMASI"
    )
    // console.log("miaw", isi_pesanan)
    // console.log(uid_pesanan)
    let isiDetailPesanan = isi_pesanan.detail_pesanan
    // console.log("awaw", isiDetailPesanan)
    // let nik_karyawan2 = nik_karyawan
    // // console.log("wewe", nik_karyawan2)
    for (var i = 0; i < isiDetailPesanan.length; i++) {
      uid_obat = isiDetailPesanan[i].uid_obat
      jumlah_keluar = isiDetailPesanan[i].jumlah_obat
      // console.log("wakwak", uid_obat)
      await connection.query("begin");
      let {
        uid,
        stok
      } = await connection
        .query(
          `select uid, stok from stok_obat where uid_obat = $1 and id_lokasi = $2 order by kadaluarsa asc limit 1`,
          [uid_obat, id_lokasi]
        )
        .then(({
          rows
        }) => rows[0]);
      // console.log("ehaaaa", uid, stok, jumlah_keluar)

      if (stok < jumlah_keluar) {
        let {
          rows
        } = await connection.query(
          "select uid, stok from stok_obat where uid_obat = $1 and id_lokasi = $2 order by kadaluarsa asc offset 1 limit 1",
          [uid_obat, id_lokasi]
        );
        uid = rows[0].uid;
        stok = rows[0].stok;
        // console.log("hacim", uid, stok)
      }
      // console.log("lalala", uid, stok - jumlah_keluar)
      let sisastok = stok - jumlah_keluar
      await connection.query(
        `update stok_obat set stok = $1 where uid = $2 returning*`,
        [sisastok, uid]
      )
      // // console.log(testing)

      await logTransaksiObat({
        uid_obat,
        uid_stok_obat: uid,
        jumlah: 0 - jumlah_keluar,
        nik_karyawan,
        id_lokasi: id_lokasi
      });
    }
    // await connection.query("delete from stok_obat where stok = 0");
    await connection.query("commit");
    return isi_pesanan;
  } catch (error) {
    console.log(error)
    connection.query("rollback");
    throw error;
  }
};

exports.kurangStokObatFromBelanja = async (data) => {
  try {
    // console.log(data)
    let listDetail = data.listDetail
    // console.log(data.listDetail)
    for (var i = 0; i < listDetail.length; i++) {
      uid_obat = listDetail[i].uid_obat
      jumlah_keluar = listDetail[i].jumlah_item
      id_lokasi = listDetail[i].id_lokasi
      // console.log(jumlah_keluar)
      await connection.query("begin");
      let {
        uid,
        stok
      } = await connection
        .query(
          `select uid, stok from stok_obat where uid_obat = $1 and id_lokasi = $2 order by kadaluarsa asc limit 1`,
          [uid_obat, id_lokasi]
        )
        .then(({
          rows
        }) => rows[0]);
      // console.log(uid, stok)

      if (stok < jumlah_keluar) {
        let {
          rows
        } = await connection.query(
          "select uid, stok from stok_obat where uid_obat = $1 and id_lokasi = $2 order by kadaluarsa asc offset 1 limit 1",
          [uid_obat, id_lokasi]
        );
        uid = rows[0].uid;
        stok = rows[0].stok;
      }

      // console.log(stok)
      // console.log(jumlah_keluar)
      let {
        _
      } = await connection.query(
        `update stok_obat set stok = $1 where uid = $2 and id_lokasi = $3 returning *`,
        [stok - jumlah_keluar, uid, id_lokasi]
      );

      // console.log(stok)
      // console.log(jumlah_keluar)

      await logTransaksiObat({
        uid_obat,
        uid_stok_obat: uid,
        jumlah: 0 - jumlah_keluar,
        nik_karyawan: data.nik_karyawan,
        id_lokasi: data.id_lokasi
      });
    }
    await connection.query("delete from stok_obat where stok = 0");
    await connection.query("commit");
    return data;
  } catch (error) {
    connection.query("rollback");
    throw error;
  }
};