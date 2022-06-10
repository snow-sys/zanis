module.exports = [
  {
    method: "GET",
    url: "/api/v1/refresh-token",
    controller: "auth/refreshToken",
    privilege: ["*"]
  },
  {
    method: "POST",
    url: "/api/v1/login",
    controller: "auth/login",
    privilege: ["*"]
  },
  {
    method: "GET",
    url: "/api/v1/cek-token",
    controller: "auth/cekToken",
    privilege: ["*"]
  }
];
