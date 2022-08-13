const newDate = function () {
  let d = new Date()
  let y = d.getFullYear() > 9 ? d.getFullYear() : '0' + d.getFullYear()
  // let m = d.getMonth() > 8 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)
  let m = (d.getMonth() + 1 + '').padStart(2, '0')
  // let dd = d.getDate() > 9 ? d.getDate() : '0' + d.getDate()
  let dd = d.getDate().toString().padStart(2, '0')
  return y + '-' + m + '-' + dd
}


module.exports = {
  newDate
}