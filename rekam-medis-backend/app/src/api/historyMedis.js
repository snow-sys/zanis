module.exports = [{
    method: "GET",
    url: "/api/v1/histori-medis/:nomor_rekam_medis",
    controller: "historiMedis/listHistoriMedis",
    privilege: ["*"]
  },
  {
    method: "GET",
    url: "/api/v1/list-terapis/:id_lokasi?",
    controller: "historiMedis/listTerapis",
    privilege: ["*"]
  },
  {
    method: "POST",
    url: "/api/v1/histori-medis/:nomor_rekam_medis",
    controller: "historiMedis/tambahHistoriMedis",
    privilege: ["*"]
  },
  {
    method: "PUT",
    url: "/api/v1/histori-medis/:uid",
    controller: "historiMedis/editNamaTerapis",
    privilege: ["*"]

  },
  {
    method: "PUT",
    url: "/api/v1/rekam-medis/:nomor_rekam_medis",
    controller: "historiMedis/editHistoriMedis",
    privilege: ["*"]

  }
];