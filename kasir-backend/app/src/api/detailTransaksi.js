module.exports = [{
    method: "GET",
    url: "/api/v1/detail-transaksi/:uid_transaksi",
    controller: "detailTransaksi/listDetailTransaksi",
    privilege: ["*"]
  },
  {
    method: "POST",
    url: "/api/v1/detail-transaksi/",
    controller: "detailTransaksi/tambahDetailTransaksi",
    privilege: ["*"]
  },
  {
    method: "PUT",
    url: "/api/v1/detail-transaksi/:uid",
    controller: "detailTransaksi/editDetailTransaksi",
    privilege: ["*"]
  },
  {
    method: "DELETE",
    url: "/api/v1/detail-transaksi/:uid",
    controller: "detailTransaksi/hapusDetailTransaksi",
    privilege: ["*"]
  }
  // {
  //   method: "DELETE",
  //   url: "/api/v1/tier/:id",
  //   controller: "tier/hapusTier",
  //   privilege: ["*"]
  // }
];