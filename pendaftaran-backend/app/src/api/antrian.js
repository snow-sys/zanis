module.exports = [{
    method: "GET",
    url: "/api/v1/antrian",
    controller: "antrian/listAntrian",
    privilege: ["*"]
  },
  {
    method: "GET",
    url: "/api/v1/antrian/total",
    controller: "antrian/totalAntrian",
    privilege: ["*"]
  },
  {
    method: "GET",
    url: "/api/v1/antrian/rata-rata",
    controller: "antrian/rataRataAntrian",
    privilege: ["*"]
  },
  {
    method: "POST",
    url: "/api/v1/antrian",
    controller: "antrian/tambahAntrian",
    privilege: ["*"]
  },
  // {
  //   method: "PUT",
  //   url: "/api/v1/antrian",
  //   controller: "antrian/cekMasuk",
  //   privilege: ["*"]
  // },
  {
    method: "PUT",
    url: "/api/v1/antrian/:uid",
    controller: "antrian/editAntrian",
    privilege: ["*"]
  }
];