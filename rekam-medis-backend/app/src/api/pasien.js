module.exports = [
  {
    method: "GET",
    url: "/api/v1/pasien/:nomor_rekam_medis?",
    controller: "pasien/listPasien",
    privilege: ["*"]
  },
  {
    method: "POST",
    url: "/api/v1/pasien",
    controller: "pasien/tambahPasien",
    privilege: ["*"]
  },
  {
    method: "PUT",
    url: "/api/v1/pasien/:nomor_rekam_medis",
    controller: "pasien/editPasien",
    privilege: ["*"]
  }
];
