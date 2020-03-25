import axios from 'axios'
// 版本号获取
export const getVersion = () => {
  return axios.request({ url: `${location.origin}/v.json`, method: 'get' })
}
