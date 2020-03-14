/*
 * @Author: MackBai
 * @Date: 2020-03-14 14:52:12
 * @LastEditors: MackBai
 * @LastEditTime: 2020-03-14 16:32:41
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

export default request
