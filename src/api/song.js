/*
 * @Author: MackBai
 * @Date: 2020-03-15 16:02:20
 * @LastEditors: MackBai
 * @LastEditTime: 2020-03-23 14:50:10
 * @FilePath: /music-app/src/api/song.js
 * @Description: 歌曲
 */

import { musicAPI } from '@/utils/request'
// 歌手热门50首歌曲
export const artist = () => musicAPI('/artist/top/song?id=6452', 'GET')
// 推荐新音乐
export const newSong = () => musicAPI('/personalized/newsong', 'GET')
// 热搜
export const searchHot = () => musicAPI('/search/hot/detail', 'GET')
// 获取歌曲url
export const songURL = data => musicAPI(`/song/url?id=${data.url}`, 'GET')
// 推荐新音乐
export const newSongs = () => musicAPI('/personalized/newsong', 'GET')
// 热门歌单分类
export const hotPlaylist = () => musicAPI('/playlist/hot', 'GET')
// 获取歌单详情
export const playlist = data => musicAPI(`/playlist/detail?id=${data.id}`, 'GET')
// 相关歌单推荐
export const related = data => musicAPI(`/related/playlist?id=${data.id}`, 'GET')
// 获取歌曲详情
export const songdetail = data => musicAPI(`/song/detail?ids=${data.id}`, 'GET')
// 音乐是否可用
// 传入歌曲 id, 可获取音乐是否可用,返回 { success: true, message: 'ok' } 或者 { success: false, message: '亲爱的,暂无版权' }
export const check = data => musicAPI(`/check/music?id=${data.id}`, 'GET')
// 每日推荐歌单（需登录）
export const resource = () => musicAPI('/recommend/resource', 'GET')
// 推荐歌单
export const personalized = (data) => musicAPI(`/personalized?limit=${data}`, 'GET')
// 获取歌词
export const lyric = id => musicAPI(`/lyric?id=${id}`, 'GET')
// 收藏/取消收藏歌单
/**
 * @description: 数字+id
 * @param {type} Number（1，2）
 * @return: 1收藏/2取消收藏
 */
export const songlist = data => musicAPI(`/playlist/subscribe?t=${data.type}&id=${data.id}`, 'GET')
// 删除歌单
export const detSonglist = data => musicAPI(`/playlist/delete?id=${data.id}`, 'GET')
// 新建歌单
export const addSonglist = data => musicAPI(`/playlist/create?name=${data.name}`, 'GET')
// 歌单收藏者
/**
 * @description: id, amount
 * @param {type} Number
 * @return: 收藏者信息
 */
export const collector = data => musicAPI(`/playlist/subscribers?id=${data.id}&limit=${data.amount}`, 'GET')
/**
 * @description: 获取歌手单曲
 * @param {type} Number
 * @return: 歌手部分信息和热门歌曲
 */
export const artists = data => musicAPI(`/artists?id=${data.id}`, 'GET')
