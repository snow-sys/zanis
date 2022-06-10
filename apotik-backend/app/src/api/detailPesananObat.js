module.exports = [{
    method: "GET",
    url: "/api/v1/detail-pesanan-obat/:uid_pesanan",
    controller: "detailPesananObat/listDetailPesananObat",
    privilege: ["*"]
  },
  {
    method: "PUT",
    url: "/api/v1/detail-pesanan-obat/:uid",
    controller: "detailPesananObat/editDetailPesananObat",
    privilege: ["*"]
  },
  {
    method: "POST",
    url: "/api/v1/detail-pesanan-obat/",
    controller: "detailPesananObat/tambahDetailPesananObat",
    privilege: ["*"]
  },
  {
    method: "DELETE",
    url: "/api/v1/detail-pesanan-obat/:uid",
    controller: "detailPesananObat/hapusDetailPesananObat",
    privilege: ["*"]
  }
];