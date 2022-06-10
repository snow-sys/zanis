module.exports = prevNik => {
  let tanggal = new Date()
  // console.log(tanggal)
  // console.log(prevNumber)
  let nomorNik = tanggal.getFullYear().toString().substr(-4) +
    ("0" + (tanggal.getMonth() + 1)).substr(-2)
  if (prevNik.nik) {
    let nik = nomorNik + ("000" + (parseInt(prevNik.nik.substr(-3)) + 1)).substr(-3)
    return nik
  } else {
    let nik = nomorNik + "001"
    return nik
  }
}