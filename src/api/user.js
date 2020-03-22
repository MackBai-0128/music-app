/*
 * @Author: MackBai
 * @Date: 2020-03-22 20:41:38
 * @LastEditors: MackBai
 * @LastEditTime: 2020-03-22 20:46:13
 * @FilePath: /music-app/src/api/user.js
 * @Description: user信息
 * 登录成功后可以获取
 */
import { musicAPI } from '@/utils/request'
// 获取用户详情(需登录)
export const detail = data => musicAPI(`/user/detail?uid=${data.id}`, 'GET')
// 获取用户信息 , 歌单，收藏，mv, dj 数量
export const subcount = data => musicAPI('/user/subcount', 'GET')
