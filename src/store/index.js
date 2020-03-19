import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentSong: getItem('current') ? getItem('current') : 0, // 正在播放
    playlist: getItem('playlist') ? getItem('playlist') : [], // 播放列表
    flie: {},
    isPlay: false,
    currentTime: 0,
    maxTime: 0
  },
  mutations: {
    // 播放列表 接收数组
    setPlayList (state, data) {
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
    setCurrentSong (state, data) {
      state.currentSong = data
      setItem('current', state.currentSong)
    },
    // 是否在播放
    isPlay (state, data) {
      state.isPlay = data
    },
    // 获取播放当前进度
    getTime (state, data) {
      state.currentTime = data
    },
    // 总进度
    getmaxTime (state, data) {
      state.maxTime = data
    },
    setFile (state, data) {
      state.flie = data
    }
  },
  actions: {
  },
  modules: {
  }
})
