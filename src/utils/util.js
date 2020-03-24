// // 获取cookie、
// export function getCookie (name) {
//   var arr; var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
//   if (arr = document.cookie.match(reg)) { return (arr[2]) } else { return null }
// }

// // 设置cookie,增加到vue实例方便全局调用
// export function setCookie (cname, value, expiredays) {
//   var exdate = new Date()
//   exdate.setDate(exdate.getDate() + expiredays)
//   document.cookie = cname + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
// };

// // 删除cookie
// export function delCookie (name) {
//   var exp = new Date()
//   exp.setTime(exp.getTime() - 1)
//   var cval = getCookie(name)
//   if (cval != null) { document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString() }
// };

import Cookies from 'js-cookie'

export const setToken = (name, value) => {
  return Cookies.set(name, value)
}

export const getToken = name => {
  return Cookies.get(name)
}

export const removeToken = name => {
  return Cookies.remove(name)
}
