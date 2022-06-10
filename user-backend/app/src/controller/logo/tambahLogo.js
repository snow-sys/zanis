let {
  tambahLogo
} = require("../../repository/logo");
let crypto = require("crypto");
let fs = require("fs");

let directory = process.cwd() + "/src/assets";
// console.log(directory)
if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory);
}

module.exports = (req, res) => {
  let {
    id_lokasi
  } = req.body;
  // console.log(req.files);
  let logo = req.files.logo;
  let nama_logo =
    crypto
    .createHash("md5")
    .update(logo.name)
    .digest("hex") + ".png";
  // console.log("miaw", id_lokasi);
  // console.log("lala", nama_logo);
  tambahLogo(id_lokasi, nama_logo)
    .then(newLogo => {
      logo.mv("./src/assets/" + nama_logo, (err, result) => {
        if (err) {
          throw err;
        } else {
          res.status(200).json(newLogo);
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
};