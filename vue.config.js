// const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
  // 基本路径
  publicPath: process.env.NODE_ENV === 'production' ? './' : './',
  // 输出文件目录
  outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devdist',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  // assetsDir: 'static',
  // 指定生成的 index.html 的输出路径 (相对于 outputDir),也可以是一个绝对路径
  // indexPath: 'index.html',
  // 生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
  filenameHashing: true,
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  /**
   * webpack配置，see https://github.com/vuejs/vue-cli/blob/d7acff56a44cc53be743916409ca6a731dd6af20/docs/zh/guide/webpack.md
   */
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
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // GZIP压缩
      // return {
      //   plugins: [
      //     new CompressionWebpackPlugin({
      //       test: /\.(js|css)(\?.*)?$/i, //需要压缩的文件正则
      //       threshold: 10240, //文件大小大于这个值时启用压缩
      //       deleteOriginalAssets: false //压缩后保留原文件
      //     })
      //   ]
      // }
      // 打包时禁止打包conlose.log
      config.optimization = {
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              compress: {
                drop_console: true,
                warnings: false,
                drop_debugger: true,
                pure_funcs: ['console.log']
              }
            }
          })
        ]
      }
    }
    // config.resolve = { // 配置解析别名
    //   extensions: ['.js', '.json', '.vue'],
    //   alias: {
    //     '@': path.resolve(__dirname, '.src'),
    //     public: path.resolve(__dirname, './public'),
    //     components: path.resolve(__dirname, './src/components'),
    //     common: path.resolve(__dirname, './src/common'),
    //     api: path.resolve(__dirname, './src/api'),
    //     views: path.resolve(__dirname, './src/views'),
    //     data: path.resolve(__dirname, './src/data')
    //   }
    // }
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps？
    sourceMap: false,
    // css预设器配置
    loaderOptions: {
      // postcss: {
      //   plugins: [
      //     require('postcss-px-to-viewport')({
      //       unitToConvert: 'px',
      //       viewportWidth: 750,
      //       unitPrecision: 3,
      //       propList: [
      //         '*'
      //       ],
      //       viewportUnit: 'vw',
      //       fontViewportUnit: 'vw',
      //       selectorBlackList: ['.ignore'],
      //       minPixelValue: 1,
      //       mediaQuery: false,
      //       replace: true,
      //       exclude: /(\/|\\)(node_modules)(\/|\\)/
      //     })
      //   ]
      // }
    },
    // 启用 CSS modules for all css / pre-processor files
    modules: false
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1,
  /**
   * PWA 插件相关配置， see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
   */
  pwa: {},

  // pagrs: {
  //   index: {

  //   }
  // },
  // webpack-dev-serve 相关配置
  devServer: {
    open: true, // 编译完是否打开网页
    // host: 'localhost', // 指定使用地址，默认localhost,0.0.0.0代表可以被外界访问
    port: 9625, // 访问端口
    https: false, // 编译失败时刷新页面
    hot: true, // 开启热加载
    hotOnly: false,
    // 设置代理
    proxy: { // 配置跨域
      '/api': {
        target: 'http://localhost:3000', // 代理地址，这里设置的地址会代替axios中设置的baseURL
        // ws: true, // proxy websockets
        changOrigin: true, // 允许跨域
        // pathRewrite 方法重写 url
        pathRewrite: {
          '^/api': '/'// 请求的时候使用这个api就可以
          // pathRewrite: {'^/api': '/'} 重写之后url为 http://localhost:3000/xxxx
          // pathRewrite: {'^/api': '/api'} 重写之后url为 http://localhost:3000/api/xxxx
        }
      }
    },
    // 全屏模式下是否显示脚本错误
    overlay: {
      warnings: true,
      errors: true
    },
    before: app => {
    }
  },
  /**
   * 第三方插件配置
   */
  pluginOptions: {}
}
