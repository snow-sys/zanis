module.exports = [{
    method: "GET",
    url: "/api/v1/obat/:uid?",
    controller: "obat/listObat",
    privilege: ["*"]
  },
  {
    method: "GET",
    url: "/api/v1/cari-obat",
    controller: "obat/cariObat",
    privilege: ["*"]
  },
  {
    method: "POST",
    url: "/api/v1/obat",
    controller: "obat/tambahObat",
    privilege: ["*"]
  },
  {
    method: "PUT",
    url: "/api/v1/obat/:uid",
    controller: "obat/editObat",
    privilege: ["*"]
  },
  {
    method: "DELETE",
    url: "/api/v1/obat/:uid",
    controller: "obat/hapusObat",
    privilege: ["*"]
  }
];