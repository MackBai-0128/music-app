import request from '@/utils/request'

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
