/**
 *
 * @param {String} prevNumber RM sebelumnya format yymmddxxx (yy - tahun, mm - bulan, dd - tanggal, xxx - nomor serial)
 */
module.exports = prevNumber => {
  // let [newDay, newMonth, newYear] = new Date()
  //   .toLocaleDateString("id", {
  //     year: "2-digit",
  //     month: "2-digit",
  //     day: "2-digit"
  //   })
  //   .split("/");
  let tanggal = new Date()
  // console.log(tanggal)
  // console.log(prevNumber)
  let nomorRM = tanggal.getFullYear().toString().substr(-2) +
    ("0" + (tanggal.getMonth() + 1)).substr(-2) + ("0" + tanggal.getDate()).substr(-2)
  let newMonth = ("0" + (tanggal.getMonth() + 1)).substr(-2)
  // console.log(nomorRM)
  // console.log(newMonth, prevNumber.substr(2, 2))
  if (prevNumber && prevNumber.substr(0, 6) === nomorRM) {
    let bulan = prevNumber.substr(2, 2);
    let serial = prevNumber.substr(6, 3);
    if (newMonth === bulan) {
      let newSerial = "000" + (parseInt(serial) + 1);
      newSerial = newSerial.substr(newSerial.length - 3, 3);
      // console.log(nomorRM + newSerial)
      return nomorRM + newSerial;
    }
  }
  // console.log(nomorRM + "001")
  return nomorRM + "001";

};