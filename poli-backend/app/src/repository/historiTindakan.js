let {
  connection
} = require("../module/database");

exports.tambahHistoriTindakan = (
    data = {
      uid_histori_medis,
      uid_tindakan,
      jumlah,
      keterangan,
      id_lokasi
    }
  ) =>
  connection
  .query(
    `
      insert into histori_tindakan (
        uid_histori_medis, 
        nama_tindakan, 
        biaya_tindakan, 
        jumlah, 
        keterangan,
        id_lokasi
      )
      values(
        $1,
        (select nama_tindakan from tindakan where uid = $2),
        (select biaya_tindakan from tindakan where uid = $2),
        $3,
        $4,
        $5
      ) 
      returning *
      `,
    [data.uid_histori_medis, data.uid_tindakan, data.jumlah, data.keterangan, data.id_lokasi]
  )
  .then(({
    rows
  }) => rows);

exports.listHistoriTindakan = ({
    uid_histori_medis,
    limit,
    from
  }) =>
  connection
  .query(
    `
        select * from histori_tindakan 
        where uid_histori_medis = $1
        order by nama_tindakan asc
        offset $2
        limit $3
        `,
    [uid_histori_medis, from, limit]
  )
  .then(({
    rows
  }) => rows);