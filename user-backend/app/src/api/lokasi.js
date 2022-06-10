module.exports = [{
    method: "GET",
    url: "/api/v1/lokasi/:id_lokasi?",
    controller: "lokasi/listLokasi",
    privilege: ["*"]
  },
  {
    method: "POST",
    url: "/api/v1/lokasi",
    controller: "lokasi/tambahLokasi",
    privilege: ["*"]
  },
  {
    method: "PUT",
    url: "/api/v1/lokasi/:id_lokasi",
    controller: "lokasi/editLokasi",
    privilege: ["*"]
  },
  {
    method: "DELETE",
    url: "/api/v1/lokasi/:id_lokasi",
    controller: "lokasi/hapusLokasi",
    privilege: ["*"]
  }
];