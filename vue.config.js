// const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
// const CompressionPlugin = require('compression-webpack-plugin')
// 是否为生产环境
// const isProduction = process.env.NODE_ENV !== 'development'
// 是使用cdn
// const needCdn = false
// 是否压缩文件
// const isZip = false
// CDN
// const cdn = {
//   // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
//   externals: {
//     vue: 'Vue',
//     vuex: 'Vuex'
//   },
//   // cdn的css链接
//   css: [],
//   // cdn的js链接
//   js: [
//     'https://cdn.staticfile.org/vue/2.6.10/vue.min.js',
//     'https://cdn.staticfile.org/vuex/3.0.1/vuex.min.js'
//   ]
// }
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
  // eslint-loader 是否在保存的时候检查/是否开启ESlint
  lintOnSave: true,
  /**
   * webpack配置，see https://github.com/vuejs/vue-cli/blob/d7acff56a44cc53be743916409ca6a731dd6af20/docs/zh/guide/webpack.md
   */
  chainWebpack: config => {
    // 在路由中用懒加载时，webpack默认有预加载此设置是关闭预加载
    // config.plugins.delete('preload')
    // config.plugins.delete('prefetch')
    // 压缩图片
    //  config.module
    //   .rule('images')
    //   .use('image-webpack-loader')
    //   .loader('image-webpack-loader')
    //   .options({ bypassOnDebug: true })
    //   .end()
    // 设置别名
    // config.resolve.alias
    // .set('@', path.resolve(__dirname, './src'))
    // .set('@V', path.resolve(__dirname, './src/views'))
    // .set('@I', path.resolve(__dirname, './src/assets/img'))
    // .set('@F', path.resolve(__dirname, './src/shujudata/public.js'))
    // .set('@H', path.resolve(__dirname, './src/shujudata/https.js'))
    // .set('@R', path.resolve(__dirname, './src/router'))
    // .set('@S', path.resolve(__dirname, './src/store'))
    // .set('@C', path.resolve(__dirname, './src/components/comm'))
    // .set('@U', path.resolve(__dirname, './src/shujudata/severUrl.js'))

    // 生产环境或本地需要cdn时，才注入cdn
    // config.plugin('html').tap(args => {
    //   if (needCdn) args[0].cdn = cdn
    //   return args
    // })
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 打包忽略项
      config.optimization = {
        minimizer: [new TerserPlugin({
          terserOptions: {
            // 忽略注释
            output: { comments: false },
            // 打包时禁止打包conlose.log
            compress: {
              drop_console: true,
              warnings: false,
              drop_debugger: true,
              pure_funcs: ['console.log']
            }
          }
        })]
      }
      // GZIP压缩
      // return {
      //   plugins: [new CompressionPlugin({
      //     test: /\.(js|css)(\?.*)?$/i, // 需要压缩的文件正则
      //     threshold: 10240, // 文件超过10k的数据进行压缩
      //     deleteOriginalAssets: false // 是否删除原文件
      //   })]
      // }
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
  // webpack-dev-serve 服务器相关配置
  devServer: {
    open: true, // 编译完是否打开网页
    // host: '192.168.0.108:3000', // 指定使用地址，默认localhost,0.0.0.0代表可以被外界访问
    port: 9625, // 访问端口
    https: false, // 编译失败时刷新页面
    hot: true, // 开启热加载
    hotOnly: false,
    // 设置代理
    proxy: { // 配置跨域
      '/api': {
        target: 'http://192.168.0.108:3000', // 代理地址，这里设置的地址会代替axios中设置的baseURL
        ws: true, // proxy websockets
        changOrigin: true, // 允许跨域
        // pathRewrite 方法重写 url
        pathRewrite: {
          '^/api': ''// 请求的时候使用这个api就可以
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
  pluginOptions: {
    /**
     * 引入style-resources-loader插件
     * less引入与sass引入方法不一样
     * 需要style-resources-loader 和 vue-cli-plugin-style-resources-loader两个插件才能引入成功
     * 注意这里引入less文件时不能用别名引入
     */
    // 'style-resources-loader': {
    //   preProcessor: 'less',
    //   patterns: [
    //     path.resolve(__dirname, './src/styles/index.less')
    //   ]
    // }
  }
}
