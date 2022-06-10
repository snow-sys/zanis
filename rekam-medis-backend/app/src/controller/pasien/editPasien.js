let { editPasien } = require("../../repository/pasien");

module.exports = (req, res) => {
  let data = req.body;
  let { nomor_rekam_medis } = req.params;
  editPasien(nomor_rekam_medis, data)
    .then(
      pasien =>
        pasien
          ? res.status(200).json(pasien)
          : res
              .status(400)
              .json(
                `pasien dengan nomor rekam medis ${nomor_rekam_medis} tidak ditemukan`
              )
    )
    .catch(() => res.status(400).send("error"));
};
