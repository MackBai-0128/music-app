/*
 * @Author: MackBai
 * @Date: 2020-03-20 22:42:30
 * @LastEditors: MackBai
 * @LastEditTime: 2020-03-22 14:22:23
 * @FilePath: /music-app/src/store/states.js
 * @Description: 保存应用的状态值
 */
import { getItem } from '@/utils/storage'
const state = {
  currentSong: getItem('current') ? getItem('current') : null, // 正在播放
  playlist: getItem('playlist') ? getItem('playlist') : [], // 播放列表
  artists: getItem('currently') ? getItem('currently') : {}, // 专辑信息
  flie: {}, // 提供下载文件资料的容器
  isPlay: false, // 播放状态
  currentTime: 0, // 当前播放时间
  maxTime: 0 // 歌曲长度
}

export default state
