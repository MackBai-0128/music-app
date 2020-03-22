
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
// 登录token
export const musicToken = state => {
  return state.musicToken
}
