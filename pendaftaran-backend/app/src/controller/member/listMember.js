let { listMember } = require("../../repository/member");

module.exports = (req, res) => {
  let { nomor_pengenal } = req.params;
  let { limit, from } = req.query;
  listMember({ nomor_pengenal, limit, from })
    .then(member =>
      res
        .status(200)
        .json(
          member.map(
            ({ password, id, tier_id, level, ...dataMember }) => dataMember
          )
        )
    )
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
};
