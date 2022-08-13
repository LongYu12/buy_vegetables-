
/**
 * 描述：验证手机号是否正确
 * @param phone:string 手机号
 * @returns Boolen
 */
export const vertifyPhone = (phone: string): boolean => {
  if (phone.length != 11) {
    return false
  }
  console.log(phone);
  
  let reg = /^1[3|4|5|7|8][0-9]{9}$/
  return reg.test(phone)
}

 