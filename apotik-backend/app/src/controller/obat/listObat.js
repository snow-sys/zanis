let {
  listObat
} = require("../../repository/obat");

module.exports = (req, res) => {
  let {
    uid
  } = req.params;
  let {
    limit,
    cari,
    from,
    id_lokasi
  } = req.query;
  // console.log("lala", uid, cari, limit, from, id_lokasi)
  listObat({
      uid,
      cari,
      limit,
      from,
      id_lokasi
    })
    .then(obat =>
      res.status(200).json(
        obat.map(data => {
          return {
            ...data,
            restok: data.stok_total <= data.minimal_stok
          };
        })
      )
    )
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
};