let { listTier } = require("../../repository/tier");

module.exports = (_, res) => {
  listTier()
    .then(tier => res.status(200).json(tier))
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
};
