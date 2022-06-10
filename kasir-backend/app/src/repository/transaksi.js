let { connection } = require("../module/database");
let { genNoTransaksi } = require("../module/genNoTransaksi");

exports.tambahTransaksi = async (
  data = {
    nik_penerbit,
    nomor_rekam_medis,
    penjamin,
    jenis_pembayaran,
    id_lokasi
  }
) => {
  // console.log(data)
  let field = Object.keys(data).join(", ");
  let param = Object.keys(data)
    .map((_, i) => `$${i + 1}`)
    .join(", ");
  data.nomor_rekam_medis
    ? data.nomor_rekam_medis
    : (data.nomor_rekam_medis = data.no_transaksi);
  // console.log(field, param, data)
  return connection
    .query(
      `
      insert into transaksi(${field}) 
      values(${param}) returning *
      `,
      Object.keys(data).map(el => data[el])
    )
    .then(({ rows }) => rows[0]);
};

exports.tambahTransaksiBelanja = async (
  data = {
    nik_penerbit,
    penjamin,
    nomor_rekam_medis,
    jenis_pembayaran,
    id_lokasi
  }
) => {
  try {
    await connection.query("BEGIN");
    let no_transaksi = await genNoTransaksi(data.id_lokasi);
    data.no_transaksi = no_transaksi;
    data.nomor_rekam_medis = data.no_transaksi;
    // console.log(data);
    let { uid } = await connection
      .query(
        `
        insert into transaksi(nik_penerbit, penjamin, nomor_rekam_medis, jenis_pembayaran, id_lokasi, no_transaksi) 
        values($1, $2, $3, $4, $5, $6) returning *
        `,
        [
          data.nik_penerbit,
          data.penjamin,
          data.nomor_rekam_medis,
          data.jenis_pembayaran,
          data.id_lokasi,
          data.no_transaksi
        ]
      )
      .then(({ rows }) => rows[0]);
    let uid_transaksi = uid;

    for (let index in data.detailTransaksi) {
      let { item_transaksi, jumlah_item, biaya } = data.detailTransaksi[index];
      await connection.query(
        `
              INSERT INTO detail_transaksi(
              uid_transaksi,
              item_transaksi,
              jumlah_item,
              biaya
              )
              VALUES ($1, $2, $3, $4)
            `,
        [uid_transaksi, item_transaksi, jumlah_item, biaya]
      );
    }

    await connection.query("COMMIT");
    return {
      ...data
    };
  } catch (err) {
    await connection.query("ROLLBACK");
    throw err;
  }
};

exports.cekUidTransaksi = search =>
  connection
    .query(
      `select * from transaksi 
    where nomor_rekam_medis = $1
    and status_transaksi='PENDING'
    and waktu_terbit >= now()::date and waktu_terbit < now()::date + 1
     order by waktu_terbit desc limit 1`,
      [search]
    )
    .then(data => data.rows);

exports.listTransaksi = (search, id_lokasi, status_transaksi) => {
  let param = [0, 200, id_lokasi];
  return connection
    .query(
      `select * from transaksi
      ${
        search
          ? "where id_lokasi = $3 and (nomor_rekam_medis = $4 or status_transaksi =$4) and waktu_terbit >= now()::date and waktu_terbit < now()::date + 1 "
          : status_transaksi
          ? "where id_lokasi = $3 and status_transaksi = $4 and waktu_terbit >= now()::date and waktu_terbit < now()::date + 1"
          : "where id_lokasi = $3 and waktu_terbit >= now()::date and waktu_terbit < now()::date + 1"
      }
      order by no_transaksi desc
      offset $1
      limit $2`,
      search
        ? param.concat(search)
        : status_transaksi
        ? param.concat(status_transaksi)
        : param
    )
    .then(data => data.rows);
};

exports.listTransaksiHarian = (
  tanggal_transaksi,
  id_lokasi,
  parameter_waktu
) => {
  return connection
    .query(
      ` select * from transaksi
        where waktu_terbit >= $1 and waktu_terbit < $2 and id_lokasi = $4
        order by waktu_terbit asc
        offset $3`,
      [tanggal_transaksi, parameter_waktu, 0, id_lokasi]
    )
    .then(data => data.rows);
};

exports.gantiStatusTransaksi = (
  uid_transaksi,
  status,
  nik_kasir,
  diskon,
  total
) => {
  let param = [status, uid_transaksi];
  return connection
    .query(
      `
      update transaksi set status_transaksi = $1
      ${
        status == "DONE"
          ? ", nik_kasir = $3, diskon = $4, total = $5, waktu_transaksi =now() "
          : ", waktu_transaksi =now()"
      }
      where uid = $2 returning *
      `,
      status == "DONE"
        ? param
            .concat(nik_kasir)
            .concat(diskon)
            .concat(total)
        : param
    )
    .then(({ rows }) => rows);
};

exports.updateNoTransaksi = async (nomor_rekam_medis, id_lokasi) => {
  let no_transaksi = await genNoTransaksi(id_lokasi);
  return connection
    .query(
      `
      update transaksi set no_transaksi = $1 where nomor_rekam_medis = $2 
      and waktu_terbit >= now()::date and waktu_terbit < now()::date + 1  
      and status_transaksi = 'PENDING' returning *
      `,
      [no_transaksi, nomor_rekam_medis]
    )
    .then(({ rows }) => rows);
};
