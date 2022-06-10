module.exports = [
  {
    method: "GET",
    url: "/api/v1/tier",
    controller: "tier/listTier",
    privilege: ["*"]
  },
  {
    method: "POST",
    url: "/api/v1/tier",
    controller: "tier/tambahTier",
    privilege: ["*"]
  },
  {
    method: "PUT",
    url: "/api/v1/tier/:id",
    controller: "tier/editTier",
    privilege: ["*"]
  },
  {
    method: "DELETE",
    url: "/api/v1/tier/:id",
    controller: "tier/hapusTier",
    privilege: ["*"]
  }
];
