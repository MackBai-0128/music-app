# music-app

**高仿网易云音乐app-web版**

+ 未做兼容处理、Chrome上体验更佳

### 实现的功能

1. 音乐播放、暂停、上一曲、下一曲、歌词
2. 每次播放的歌曲获取歌单、会记录到本地缓存、方便下一首自动播放
3. 搜索单曲、歌手
4. 热门搜索
5. 搜索历史记录
6. 排行榜
7. 歌词
8. 下载
9. 登录
10. 每日推荐MV

**正在进行的功能**

+ 删除播放列表、播放歌曲
+ 我喜欢
+ 电台
+ 巅峰榜单、新歌推荐
+ 拖拽进度条

## Build Setup
```bash
# 安装依赖
npm install
# 启动服务
npm run serve
# 打包发布
npm run build
```

## 服务端

> 感谢Binaryify提供的API
>
> [Node.js API service](https://github.com/Binaryify/NeteaseCloudMusicApi)

### 安装

```bash
# 安装服务
$ git clone https://github.com/Binaryify/NeteaseCloudMusicApi.git
# 安装依赖
$ npm install
# 运行
$ node app.js
```



## 项目截图
### 首屏加载

<img src="assets/%E9%A6%96%E5%B1%8F%E5%8A%A0%E8%BD%BD%E9%A1%B5.png" alt="首屏加载页" style="height: 400px;" />

### 播放页

> 实现功能

+ 暂停/播放
+ 切换歌曲
+ 下载歌曲
+ 歌词滚动
+ 音乐进度条

<img src="assets/%E6%92%AD%E6%94%BE%E4%B8%BB%E9%A1%B5.png" alt="播放主页" style="height: 400px;" />



<img src="assets/%E6%AD%8C%E8%AF%8D%E9%A1%B5%E9%9D%A2.png" alt="歌词页面" style="height: 400px;" />

### 发现页

> 目前只有推荐歌单可以用

<img src="assets/%E5%8F%91%E7%8E%B0%E9%A1%B5.png" alt="发现页" style="height: 400px;" />

<img src="assets/%E6%AD%8C%E5%8D%95%E8%AF%A6%E6%83%85.png" alt="歌单详情" style="height: 400px;" />

### 搜索页面

> 搜索功能
>
> + 热搜建议
> + 搜索建议
> + 热搜榜

<img src="assets/%E6%90%9C%E7%B4%A2%E9%A1%B5.png" alt="搜索页" style="height: 400px;" />

<img src="assets/%E6%90%9C%E7%B4%A2%E5%BB%BA%E8%AE%AE%E9%A1%B5.png" alt="搜索建议页" style="height: 400px;" />



<img src="assets/%E6%90%9C%E7%B4%A2%E7%BB%93%E6%9E%9C%E9%A1%B5.png" alt="搜索结果页" style="height: 400px;" />

<img src="assets/mv.png" alt="发现页" style="height: 400px;" />

<img src="assets/danqu.png" style="height: 400px;" />

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

