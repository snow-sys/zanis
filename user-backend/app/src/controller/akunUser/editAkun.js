let {
  editUser
} = require("../../repository/akunUser");

module.exports = (req, res) => {
  let data = req.body;
  let {
    nik
  } = req.params;
  editUser(nik, data)
    .then(({
      rows
    }) => res.status(200).json(rows[0]))
    .catch(err => res.status(500).json(err));
};