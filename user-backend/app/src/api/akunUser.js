module.exports = [
  {
    method: "GET",
    url: "/api/v1/akun-user/:nik?",
    controller: "akunUser/listAkun",
    privilege: ["*"]
  },
  {
    method: "POST",
    url: "/api/v1/akun-user",
    controller: "akunUser/tambahAkun",
    privilege: ["*"]
  },
  {
    method: "PUT",
    url: "/api/v1/akun-user/:nik",
    controller: "akunUser/editAkun",
    privilege: ["*"]
  }
];
