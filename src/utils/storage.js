/*
 * @Author: MackBai
 * @Date: 2020-03-16 19:35:50
 * @LastEditors: MackBai
 * @LastEditTime: 2020-03-16 20:26:22
 * @FilePath: /music-app/src/utils/storage.js
 * @Description: 本地存储
 */

export const setItem = (name, value) => {
  const data = value instanceof Object ? JSON.stringify(value) : value
  window.localStorage.setItem(name, data)
}

export const getItem = name => {
  const data = window.localStorage.getItem(name)
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}

export const remItem = name => {
  window.localStorage.removeItem(name)
}
