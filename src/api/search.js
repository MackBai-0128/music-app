/*
 * @Author: MackBai
 * @Date: 2020-03-16 17:03:50
 * @LastEditors: MackBai
 * @LastEditTime: 2020-03-25 20:23:26
 * @FilePath: /music-app/src/api/search.js
 * @Description: 搜索
 */
import { musicAPI } from '@/utils/request'

// 热搜列表(详细)
export const hotdetail = () => musicAPI('/search/hot/detail', 'GET')
// 热搜列表(简略)
export const hot = () => musicAPI('/search/hot', 'GET')
// 默认搜索关键词 获取默认搜索关键词
export const searchDefault = () => musicAPI('/search/default', 'GET')
// 搜索
// 可选参数 : limit : 返回数量 , 默认为 30 offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
// type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
export const search = data => musicAPI(`/search?keywords=${data.value}&limit=${data.amount ? data.amount : 30}&offset=${data.offset ? data.offset : 0}&type=${data.type ? data.type : 1}`, 'GET')
// 搜索建议
export const suggest = name => musicAPI(`/search/suggest?keywords=${name}`, 'GET')
// 搜索多重匹配
export const searchMultimatch = name => musicAPI(`/search/multimatch?keywords=${name}`, 'GET')
