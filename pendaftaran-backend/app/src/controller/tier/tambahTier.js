let { tambahTier } = require("../../repository/tier");

module.exports = (req, res) => {
  let data = req.body;
  tambahTier(data)
    .then(newTier => res.status(201).json(newTier))
    .catch(err => {
      console.error(err);
      res.status(400).json("nama tier sudah ada");
    });
};
