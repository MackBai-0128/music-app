/*
 * @Author: MackBai
 * @Date: 2020-03-14 16:34:46
 * @LastEditors: MackBai
 * @LastEditTime: 2020-03-18 21:21:47
 * @FilePath: /music-app/src/api/banner.js
 * @Description: banner
 */
import { musicAPI } from '@/utils/request'
// swiper
export const banner = () => musicAPI('/banner', 'GET')
