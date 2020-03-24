
module.exports = {
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    https: false,
    proxy: { // 配置跨域
      '/api': {
        target: 'http://localhost:3000',
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/api': ''// 请求的时候使用这个api就可以
        }
      }

    }
  }
}
