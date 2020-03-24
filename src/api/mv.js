/*
 * @Author: MackBai
 * @Date: 2020-03-23 11:43:46
 * @LastEditors: MackBai
 * @LastEditTime: 2020-03-23 20:01:37
 * @FilePath: /music-app/src/api/mv.js
 * @Description: mv视频
 */
import { musicAPI } from '@/utils/request'

// 全部mv
export const allMv = data => musicAPI(`/mv/all?area=${data.area}&order=${data.order}&limit=${data.limit ? data.limit : 30}&offset=${data.offset ? data.offset : 0}`, 'GET')
// 最新mv
export const newMv = data => musicAPI(`/mv/first?limit=${data.limit ? data.limit : 30}`, 'GET')
// 网易出品mv
export const NetEaseMv = data => musicAPI(`/mv/exclusive/rcmd?limit=${data.limit ? data.limit : 30}&offset=${data.offset ? data.offset : 0}`, 'GET')
// 推荐mv
export const recommendMv = () => musicAPI('/personalized/mv', 'GET')
// mv 地址
export const mvUrl = data => musicAPI(`/mv/url?id=${data.id}`, 'GET')
