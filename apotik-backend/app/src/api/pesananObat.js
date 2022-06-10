module.exports = [{
    method: "GET",
    url: "/api/v1/pesanan-obat/:uid_pesanan?",
    controller: "pesananObat/listPesananObat",
    privilege: ["*"]
  },
  {
    method: "GET",
    url: "/api/v1/cari-pesanan-obat/:cari",
    controller: "pesananObat/cariUIDPesanan",
    privilege: ["*"]
  },
  {
    method: "POST",
    url: "/api/v1/pesanan-obat",
    controller: "pesananObat/tambahPesananObat",
    privilege: ["*"]
  },
  // {
  //   method: "DELETE",
  //   url: "/api/v1/stok-obat/:uid_stok_obat",
  //   controller: "pesananObat/hapuspesananObat",
  //   privilege: ["*"]
  // },
  {
    method: "PUT",
    url: "/api/v1/pesanan-obat/:uid_pesanan",
    controller: "pesananObat/editStatusPesananObat",
    privilege: ["*"]
  }
  // {
  //   method: "PATCH",
  //   url: "/api/v1/stok-obat/:uid_obat",
  //   controller: "pesananObat/kurangpesananObat",
  //   privilege: ["*"]
  // }
];