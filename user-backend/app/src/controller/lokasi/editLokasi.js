let {
  editLokasi
} = require("../../repository/lokasi");

module.exports = (req, res) => {
  let {
    nama_lokasi,
    alamat
  } = req.body;
  let {
    id_lokasi
  } = req.params;
  // console.log("miaw", id_lokasi, nama_lokasi, alamat)
  editLokasi(id_lokasi, nama_lokasi, alamat)
    .then((
      rows
    ) => res.status(200).json(rows))
    .catch(err => res.status(500).json(err));
};