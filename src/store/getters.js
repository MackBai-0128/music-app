
// 专辑信息
export const artists = state => state.artists
// 正在播放
export const currentMusic = state => {
  return JSON.stringify(state.currentSong) !== '{}' ? state.currentSong : null
}
// 下载信息
export const flie = state => state.flie
// 播放状态
export const isPlay = state => state.isPlay
// 播放列表
export const playlist = state => state.playlist
// 当前播放时间
export const currentTime = state => state.currentTime
// 歌曲长度
export const maxTime = state => state.maxTime
// 登录token
export const loginStatus = state => state.loginStatus
// 用户信息
export const profile = state => state.profile
