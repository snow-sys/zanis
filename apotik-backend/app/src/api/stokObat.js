module.exports = [{
    method: "GET",
    url: "/api/v1/stok-obat/:uid_obat?",
    controller: "stokObat/listStokObat",
    privilege: ["*"]
  },
  {
    method: "GET",
    url: "/api/v1/stok-obat-kadaluarsa/:tanggal",
    controller: "stokObat/listKadaluarsa",
    privilege: ["*"]
  },
  {
    method: "GET",
    url: "/api/v1/list-stok-obat/:nama_obat?",
    controller: "stokObat/listBelanja",
    privilege: ["*"]
  },
  {
    method: "GET",
    url: "/api/v1/list-stok-menipis",
    controller: "stokObat/listStokMenipis",
    privilege: ["*"]
  },
  {
    method: "POST",
    url: "/api/v1/stok-obat/:uid_obat",
    controller: "stokObat/tambahStokObat",
    privilege: ["*"]
  },
  {
    method: "PATCH",
    url: "/api/v1/stok-obat/",
    controller: "stokObat/kurangStokObatFromBelanja",
    privilege: ["*"]
  },
  {
    method: "DELETE",
    url: "/api/v1/stok-obat/:uid_stok_obat",
    controller: "stokObat/hapusStokObat",
    privilege: ["*"]
  },
  {
    method: "DELETE",
    url: "/api/v1/kurang-stok-per-obat/:uid",
    controller: "stokObat/hapusStokPerObat",
    privilege: ["*"]
  },

  {
    method: "PUT",
    url: "/api/v1/stok-obat/:uid_stok_obat",
    controller: "stokObat/editStokObat",
    privilege: ["*"]
  },
  {
    method: "PUT",
    url: "/api/v1/kurang-stok-obat/:uid_pesanan",
    controller: "stokObat/kurangStokObat",
    privilege: ["*"]
  }
];