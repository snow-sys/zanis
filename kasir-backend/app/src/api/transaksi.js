                                                                                                                                                                                                                                                                                                                                                                                            module.exports = [{
    method: "GET",
    url: "/api/v1/transaksi/:search?",
    controller: "transaksi/listTransaksi",
    privilege: ["*"]
  },
  {
    method: "GET",
    url: "/api/v1/transaksi-harian",
    controller: "transaksi/listTransaksiHarian",
    privilege: ["*"]
  },
  {
    method: "POST",
    url: "/api/v1/transaksi",
    controller: "transaksi/tambahTransaksi",
    privilege: ["*"]
  },
  {
    method: "POST",
    url: "/api/v1/transaksi-belanja",
    controller: "transaksi/tambahTransaksiBelanja",
    privilege: ["*"]
  },
  {
    method: "PUT",
    url: "/api/v1/transaksi/:uid",
    controller: "transaksi/updateStatusTransaksi",
    privilege: ["*"]
  },
  {
    method: "PUT",
    url: "/api/v1/nomor-transaksi/:nomor_rekam_medis",
    controller: "transaksi/updateNoTransaksi",
    privilege: ["*"]
  }
];