export function emailVerify (value) {
  return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)
}
export function photoVerify (value) {
  return /^1(3|4|5|6|7|8|9)\d{9}$/.test(value)
}
