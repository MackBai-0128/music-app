/*
 * @Author: MackBai
 * @Date: 2020-03-14 14:52:12
 * @LastEditors: MackBai
 * @LastEditTime: 2020-03-14 18:57:52
 * @FilePath: /music-app/src/utils/request.js
 * @Description: axios
 */
import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:3000'
})
// 请求
request.interceptors.request.use(
  function (config) {
    // config.headers.xhrFields = { withCredentials: true }
    return config
  },
  function (err) {
    return Promise.reject(err)
  }
)
// 响应
request.interceptors.response.use(
  function (config) {
    return config
  },
  function (err) {
    return Promise.reject(err)
  }
)

export const musicAPI = (url, method, data = {}) => {
  var config = {}
  if (method === 'GET') {
    config.params = data
  } else {
    config.data = data
  }

  return request({
    url,
    method,
    ...config
  })
}
