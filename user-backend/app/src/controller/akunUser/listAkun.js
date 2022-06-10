let {
  listUser
} = require("../../repository/akunUser");

module.exports = (req, res) => {
  let {
    nik
  } = req.params;
  listUser(nik)
    .then(user =>
      res.status(200).json(user.map(({
        password,
        ...dataUser
      }) => dataUser))
    )
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    });
};