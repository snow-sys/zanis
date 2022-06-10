let {
  cariUIDPesanan
} = require("../../repository/pesananObat");

module.exports = (req, res) => {
  let {
    cari
  } = req.params;
  // console.log(cari)
  cariUIDPesanan(cari)
    .then(listPesanan => {
      res.status(200).json(listPesanan
        // listPesanan.map(val => ({
        //   ...val,
        //   detail: `${req.protocol}://${req.get("host")}/api/v1/pesanan-obat/${
        //       val.uid
        //     }`
        // }))
      );
    })
    .catch(err => {
      console.error(err);
      res.status(400).json("error");
    });
};