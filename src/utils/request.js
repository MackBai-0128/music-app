/*
 * @Author: MackBai
 * @Date: 2020-03-14 14:52:12
 * @LastEditors: MackBai
 * @LastEditTime: 2020-03-25 14:48:41
 * @FilePath: /music-app/src/utils/request.js
 * @Description: axios
 */
import axios from 'axios'
axios.defaults.withCredentials = true
const request = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: { 'X-Real-IP': '192.168.0.106' }
  // 'Access-Control-Allow-Origin': '*',
  // 'Access-Control-Allow-Credentials': 'true',
  // 'Access-Control-Allow-Methods': 'GET,POST',
  // 'Access-Control-Allow-Headers': 'x-requested-with,content-type'
})
// 请求
request.interceptors.request.use(
  function (config) {
    // config.headers = {
    //   'X-Real-IP': '211.161.244.70'
    // }
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
