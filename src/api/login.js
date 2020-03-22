/*
 * @Author: MackBai
 * @Date: 2020-03-22 18:05:33
 * @LastEditors: MackBai
 * @LastEditTime: 2020-03-22 20:41:19
 * @FilePath: /music-app/src/api/login.js
 * @Description: 登录
 */
import { musicAPI } from '@/utils/request'
// 手机登录
export const phoneLogin = data => musicAPI(`/login/cellphone?phone=${data.phone}&password=${data.password}`, 'GET')
// 邮箱登录
export const emailLogin = data => musicAPI(`/login?email=${data.email}&password=${data.password}`, 'GET')
// 刷新登录
export const refresh = data => musicAPI('/login/refresh', 'GET')
// 发送验证码
export const captcha = data => musicAPI(`/captcha/sent?phone=${data.phone}`, 'GET')
// 验证验证码
export const verify = data => musicAPI(`/captcha/verify?phone=13xxx&captcha=${data.captcha}`, 'GET')
// 注册(修改密码)
export const registered = data => musicAPI(`/register/cellphone?phone=${data.phone}&password=${data.password}&captcha=${data.captcha}&nickname=${data.nickname}`)
// 登录状态
export const status = data => musicAPI('/login/status', 'GET')
// 退出登录
export const logout = data => musicAPI('/logout', 'GET')
