module.exports = [{
    method: "GET",
    url: "/api/v1/racik/:uid?",
    controller: "racik/listRacik",
    privilege: ["*"]
  },
  {
    method: "POST",
    url: "/api/v1/racik",
    controller: "racik/tambahRacik",
    privilege: ["*"]
  },
  {
    method: "POST",
    url: "/api/v1/racik-ke-kasir",
    controller: "racik/tambahRacikKeKasir",
    privilege: ["*"]
  },

  {
    method: "PUT",
    url: "/api/v1/harga-racik/:uid",
    controller: "racik/editHargaRacik",
    privilege: ["*"]
  },
  {
    method: "PUT",
    url: "/api/v1/status-racik/:uid",
    controller: "racik/editStatusRacik",
    privilege: ["*"]
  },
  // {
  //   method: "PUT",
  //   url: "/api/v1/kurang-stok-racik/:uid",
  //   controller: "racik/kurangStokRacik",
  //   privilege: ["*"]
  // },
  {
    method: "DELETE",
    url: "/api/v1/racik/:uid",
    controller: "racik/hapusRacik",
    privilege: ["*"]
  }
];