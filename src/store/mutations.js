
import { setItem } from '@/utils/storage'
import * as types from './mutations-types'

const mutations = {
  // navBar
  [types.setActiveIndex] (state, i) {
    state.activeIndex = i
  },
  // token
  [types.setLoginStatus] (state, data) {
    state.loginStatus = data
  },
  // 用户信息
  [types.setUserInfo] (state, data) {
    state.profile = data
    setItem('profile', state.profile)
  },
  // 播放列表 接收数组
  [types.setPlayList] (state, data) {
    const result = []
    state.playlist.unshift(...data)
    // 去除重复歌曲
    for (const item of state.playlist) {
      var flag = true
      for (const item1 of result) {
        if (item.id === item1.id) {
          flag = false
        }
      }
      if (flag) {
        result.push(item)
      }
    }
    state.playlist = result
    setItem('playlist', state.playlist)
  },
  // 设置正在播放的歌曲
  [types.setCurrentSong] (state, data) {
    state.currentSong = data
    setItem('current', state.currentSong)
  },
  // 播放状态
  [types.setPlay] (state, data) {
    state.isPlay = data
  },
  // 获取播放当前进度
  [types.getcurrentTime] (state, data) {
    state.currentTime = data
  },
  // 总进度
  [types.getmaxTime] (state, data) {
    state.maxTime = data
  },
  // 提供下在的资源
  [types.setFile] (state, data) {
    state.flie = data
  },
  // 歌曲详情
  [types.setArtists] (state, data) {
    state.artists = data
    setItem('currently', state.artists)
  }
}
export default mutations
