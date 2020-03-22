/*
 * @Author: MackBai
 * @Date: 2020-03-20 22:39:39
 * @LastEditors: MackBai
 * @LastEditTime: 2020-03-22 14:32:18
 * @FilePath: /music-app/src/store/getters.js
 * @Description: 在states中定义的值暴露在store.getters对象中，
 *               便于我们在组件中可以通过store.getters.bookList访问数据
 */
// 专辑信息
export const artists = state => {
  return state.artists
}
// 正在播放
export const currentMusic = state => {
  return JSON.stringify(state.currentSong) !== '{}' ? state.currentSong : null
}
// 下载信息
export const flie = state => {
  return state.flie
}
// 播放状态
export const isPlay = state => {
  return state.isPlay
}
// 播放列表
export const playlist = state => {
  return state.playlist
}
// 当前播放时间
export const currentTime = state => {
  return state.currentTime
}
// 歌曲长度
export const maxTime = state => {
  return state.maxTime
}
