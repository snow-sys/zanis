let { editTier } = require("../../repository/tier");

module.exports = (req, res) => {
  let tier = req.body;
  let { id } = req.params;
  editTier(id, tier)
    .then(
      tier =>
        tier
          ? res.status(200).json(tier)
          : res.status(400).json(`id ${id} tidak ditemukan`)
    )
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
};
