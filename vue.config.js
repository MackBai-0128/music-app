module.exports = {
  publicPath: './',
  outputDir: 'dist',
  // assetsDir: 'static',
  // indexPath: 'index.html',
  // filenameHashing: true,
  // pagrs: {
  //   index: {

  //   }
  // },
  chainWebpack: config => {
    // const imagesRule = config.module.rule('images')
    // imagesRule
    //   .use('url-loader')
    //   .loader('url-loader')
    //   .tap(options => Object.assign(options, { limit: 6144 }))

    // config.when(process.env.NODE_ENV === 'production', config => {
    //   config.set('exte')
    // })
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
