/*
 * @Author: MackBai
 * @Date: 2020-03-23 16:04:50
 * @LastEditors: MackBai
 * @LastEditTime: 2020-03-23 16:30:35
 * @FilePath: /music-app/src/api/dj.js
 * @Description: 电台
 */
import { musicAPI } from '@/utils/request'
// 电台banner
export const djbanner = () => musicAPI('/dj/banner', 'GET')
// 推荐电台
export const djprogram = () => musicAPI('/personalized/djprogram', 'GET')
// 热门电台
export const hotdj = data => musicAPI(`/dj/hot&limit=${data.limit ? data.limit : 30}&offset=${data.offset ? data.offset : 0}`, 'GET')
// 电台 - 节目url
export const djUrl = data => musicAPI(`/dj/program?rid=${data.id}&limit=${data.limit ? data.limit : 30}`)
