module.exports = [{
    method: "GET",
    url: "/api/v1/logo/:id_lokasi?",
    controller: "logo/listLogo",
    privilege: ["*"]
  },
  {
    method: "POST",
    url: "/api/v1/logo",
    controller: "logo/tambahLogo",
    privilege: ["*"]
  }

];