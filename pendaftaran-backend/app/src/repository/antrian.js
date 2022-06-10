let {
  connection
} = require("../module/database");

exports.tambahAntrian = async (
  data = {
    nomor_rekam_medis,
    poli,
    jaminan,
    dokter,
    id_lokasi
  }
) => {
  // menentukan nomor antrian pasien
  let nomor_antri = await this.cekNomorAntrian(data.id_lokasi);
  // console.log(nomor_antri);
  if (nomor_antri) {
    data.nomor_antrian = nomor_antri.nomor_antrian + 1
  } else {
    data.nomor_antrian = 1
  }
  //membuat field dan param untuk menginput ke dalam database
  let field = Object.keys(data).join(", ");
  let param = Object.keys(data)
    .map((_, i) => `$${i + 1}`)
    .join(", ");
  //verifikasi status antrian pasien
  let verif = await connection.query(
    `select * from antrian where waktu_daftar >=now()::date 
    and waktu_daftar < now()::date + 1 
    and nomor_rekam_medis = $1 order by waktu_daftar desc
    `, [data.nomor_rekam_medis]
  ).then(({
    rows
  }) => rows[0])
  if (verif == undefined || verif.status_antrian == "batal" || verif.status_antrian == "selesai") {
    //jika status antrian pasien tidak ditemukan / batal / selesai
    return connection
      .query(
        `
        insert into antrian(${field})
        values(${param}) returning *
        `,
        [...Object.keys(data).map(el => data[el])]
      )
      .then(({
        rows
      }) => rows);

  } else return "nomor RM " + data.nomor_rekam_medis + " sudah ada di antrian!"
};

exports.cekNomorAntrian = id_lokasi => {
  //cek sudah sampai berapa nomor antrian hari ini
  return connection
    .query(
      `
  select nomor_antrian from antrian 
  where waktu_daftar >= now()::date and waktu_daftar < now()::date +1
  and id_lokasi = $1 order by nomor_antrian desc
  `,
      [id_lokasi]
    )
    .then(({
      rows
    }) => rows[0]);
};

exports.listAntrian = ({
  status_antrian,
  limit,
  from,
  id_lokasi,
  cari
}) => {
  let param = [from ? from : 0, limit ? limit : 200];
  return connection
    .query(
      `
      select * from antrian where waktu_daftar >= now()::date and waktu_daftar < now()::date + 1
      ${status_antrian? "  and id_lokasi = $3 and status_antrian = $4" :
      cari ? " and id_lokasi = $3 and nomor_rekam_medis = $4 or dokter = $4":
      id_lokasi ? "and id_lokasi = $3" : ""}
      order by waktu_daftar asc
      offset $1
      limit $2
      `,
      status_antrian ? param.concat(id_lokasi, status_antrian) :
       cari ? param.concat(id_lokasi, cari) :
        id_lokasi ? param.concat(id_lokasi) :
         param
    )
    .then(({
        rows
      }) =>
      rows
    );
};

exports.cekMasuk = (poli, id_lokasi) =>
  connection
  .query(
    `
      update antrian set waktu_masuk = now() 
      where uid = (
        select uid from antrian 
        where waktu_masuk is null and poli = $1 and id_lokasi = $2
        order by waktu_daftar 
        limit 1
      ) 
      returning *
      `,
    [poli, id_lokasi]
  )
  .then(({
    rows
  }) => rows[0]);

exports.rataRataAntrian = (poli, limit = 100, id_lokasi) =>
  connection
  .query(
    `
      select avg(hasil) as rata_rata from (
        select (waktu_masuk - waktu_daftar) as hasil
        from antrian
        where waktu_masuk is not null and poli = $1 and id_lokasi = $3
        order by waktu_daftar desc
        limit $2
      ) as hasil
      `,
    [poli, limit, id_lokasi]
  )
  .then(({
    rows
  }) => rows[0]);

exports.editAntrian = (uid, status_antrian) => {
  status_antrian = status_antrian.toLowerCase()
  // console.log(uid, status_antrian)
  return connection.query(
    `update antrian set status_antrian = $1 where uid = $2 returning *
    `, [status_antrian, uid]
  ).then(({
    rows
  }) => rows)
}

exports.totalAntrian = ({tanggal_mulai, sampai_tanggal,id_lokasi}) =>{ 
  // console.log('asdad',tanggal_mulai,sampai_tanggal)
  let param = [tanggal_mulai, sampai_tanggal]
  return connection
  .query(
    `
    select * from antrian ${
      id_lokasi ? "where id_lokasi = $3 and waktu_daftar::date >= $1 and waktu_daftar::date <= $2" :
      "where waktu_daftar::date >= $1 and waktu_daftar::date <= $2"
    } 
      `,
    id_lokasi ? param.concat(id_lokasi) : param
  )
  .then(({
    rows
  }) => rows)};