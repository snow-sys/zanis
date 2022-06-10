module.exports = [
  {
    method: "GET",
    url: "/api/v1/tindakan/:uid?",
    controller: "tindakan/listTindakan",
    privilege: ["*"]
  },
  {
    method: "POST",
    url: "/api/v1/tindakan",
    controller: "tindakan/tambahTindakan",
    privilege: ["*"]
  },
  {
    method: "PUT",
    url: "/api/v1/tindakan/:uid",
    controller: "tindakan/editTindakan",
    privilege: ["*"]
  },
  {
    method: "DELETE",
    url: "/api/v1/tindakan/:uid",
    controller: "tindakan/hapusTindakan",
    privilege: ["*"]
  }
];
