module.exports = [
  {
    method: "GET",
    url: "/api/v1/member/:nomor_pengenal?",
    controller: "member/listMember",
    privilege: ["*"]
  },
  {
    method: "POST",
    url: "/api/v1/member",
    controller: "member/tambahMember",
    privilege: ["*"]
  },
  {
    method: "PUT",
    url: "/api/v1/member/:nomor_pengenal",
    controller: "member/editMember",
    privilege: ["*"]
  }
];
