let { hapusTier } = require("../../repository/tier");

module.exports = (req, res) => {
  let { id } = req.params;
  hapusTier(id)
    .then(
      tier =>
        tier > 0
          ? res.status(200).json(`${id} dihapus`)
          : res.status(400).json(`id ${id} tidak ditemukan`)
    )
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
};
