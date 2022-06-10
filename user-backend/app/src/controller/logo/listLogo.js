let { listLogo } = require("../../repository/logo");
let fs = require("fs");

let directory = process.cwd() + "/src/assets";
// console.log(directory)
if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory);
}

module.exports = (req, res) => {
  let { id_lokasi } = req.params;
  // console.log(id_lokasi)
  listLogo(id_lokasi)
    .then(newLogo => {
      if (newLogo != undefined) {
        res
          .status(200)
          .sendFile(process.cwd() + "/src/assets/" + newLogo.nama_logo);
      } else {
        res.status(200).json("logo tidak ada sama sekali di database");
      }
    })
    .catch(err => {
      console.error(err);
    });
};
