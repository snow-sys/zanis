module.exports = [{
    method: "GET",
    url: "/api/v1/histori_tindakan/:uid_histori_medis?",
    controller: "historiTindakan/listHistoriTindakan",
    privilege: ["*"]
  },
  {
    method: "POST",
    url: "/api/v1/histori_tindakan",
    controller: "historiTindakan/tambahHistoriTindakan",
    privilege: ["*"]
  }
  // {
  //   method: "PUT",
  //   url: "/api/v1/member/:nomor_pengenal",
  //   controller: "member/editMember",
  //   privilege: ["*"]
  // }
];