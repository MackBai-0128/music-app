
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
