module.exports = [{
    method: "GET",
    url: "/api/v1/dokter/:uid?",
    controller: "dokter/listDokter",
    privilege: ["*"]
  },
  {
    method: "POST",
    url: "/api/v1/dokter",
    controller: "dokter/tambahDokter",
    privilege: ["*"]
  },
  {
    method: "PUT",
    url: "/api/v1/dokter/:uid",
    controller: "dokter/editDokter",
    privilege: ["*"]
  },
  {
    method: "DELETE",
    url: "/api/v1/dokter/:uid",
    controller: "dokter/hapusDokter",
    privilege: ["*"]
  }
];