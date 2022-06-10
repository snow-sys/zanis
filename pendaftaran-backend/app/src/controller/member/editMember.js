let { editMember } = require("../../repository/member");

module.exports = (req, res) => {
  let data = req.body;
  let { nomor_pengenal } = req.params;
  editMember(nomor_pengenal, data)
    .then(
      member =>
        member
          ? res.status(200).json(member)
          : res
              .status(400)
              .json(`nomor pengenal ${nomor_pengenal} tidak ditemukan`)
    )
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
};
