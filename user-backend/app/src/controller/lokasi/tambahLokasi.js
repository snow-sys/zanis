let {
  tambahLokasi
} = require("../../repository/lokasi");

module.exports = (req, res) => {
  let {
    nama_lokasi,
    alamat
  } = req.body;
  tambahLokasi({
      nama_lokasi,
      alamat
    })
    .then(({
      rows
    }) => res.status(201).json(rows[0]))
    .catch(() => res.send(`error`));
};