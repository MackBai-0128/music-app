module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [ // 按需引入
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }]
  ]
}
