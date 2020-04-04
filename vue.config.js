// const path = require('path')
// const fs = require('fs')
// const resolve = dir => {
//   return path.join(__dirname, dir)
// }
// ;(() => {
//   // 时间戳模拟版本号
//   const v = +new Date()
//   process.env.VUE_APP_VERSION = v
//   // 此处是写入.env文件中，参考链接( https://cli.vuejs.org/zh/guide/mode-and-env.html )
//   fs.writeFile(resolve('.env'), `VUE_APP_VERSION=${v}`, err => {
//     if (err) {
//       return console.error(err)
//     }
//     console.log(`版本号变量写入成功，本次为${v}`)
//   })
//   // 写入到public 的文件
//   fs.writeFile(resolve('public/v.json'), JSON.stringify({ version: v }), err => {
//     if (err) {
//       return console.error(err)
//     }
//     console.log(`版本号写入成功，本次为${v}`)
//   })
// })()
module.exports = {
  chainWebpack: (config) => {
    const imagesRule = config.module.rule('images')
    imagesRule
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 6144 }))
  },
  devServer: {
    open: true,
    // host: 'localhost',
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
