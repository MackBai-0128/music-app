/*
 * @Author: MackBai
 * @Date: 2020-03-20 22:39:39
 * @LastEditors: MackBai
 * @LastEditTime: 2020-03-20 22:44:18
 * @FilePath: /music-app/src/store/getters.js
 * @Description: 在states中定义的值暴露在store.getters对象中，
 *               便于我们在组件中可以通过store.getters.bookList访问数据
 */
// 当前音乐
export const currentMusic = state => {
  return state.playlist[state.currentIndex] || {}
}
