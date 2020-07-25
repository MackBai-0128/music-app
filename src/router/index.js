import Vue from 'vue'
import VueRouter from 'vue-router'
// function loadView(view) {
//   return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
// }
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    component: () => import('@/views/tabBar'),
    children: [
      {
        path: '',
        name: 'detection',
        meta: { keepAlive: true },
        component: () => import(/* webpackChunkName: "detection" */ '@/views/detection')
      },
      {
        path: 'video',
        name: 'video',
        meta: { keepAlive: true },
        component: () => import(/* webpackChunkName: "video" */ '@/views/video')
      },
      {
        path: 'my',
        name: 'my',
        meta: { keepAlive: true },
        component: () => import(/* webpackChunkName: "my" */ '@/views/my')
      },
      {
        path: 'group',
        name: 'group',
        meta: { keepAlive: true },
        component: () => import(/* webpackChunkName: "group" */ '@/views/group')
      },
      {
        path: 'account',
        name: 'account',
        meta: { keepAlive: true },
        component: () => import(/* webpackChunkName: "account" */ '@/views/account')
      },
      {
        path: '/search/:name?',
        name: 'search',
        component: () => import(/* webpackChunkName: "search" */ '@/views/search')
      },
      {
        path: '/search-result/:name',
        name: 'search-result',
        meta: { keepAlive: true },
        component: () => import(/* webpackChunkName: "search-result" */ '@/views/search-result'),
        props: true
      },
      {
        path: '/songlist/:id',
        name: 'songlist',
        component: () => import(/* webpackChunkName: "song-list" */ '@/views/song-list'),
        props: true
      },
      {
        path: '/songslistsquare',
        name: 'songslistsquare',
        component: () => import(/* webpackChunkName: "song-list-square" */ '@/views/song-list-square')
      }
    ]
  },
  {
    path: '/play',
    name: 'play',
    meta: {
      transfrom: true
    },
    component: () => import('@/views/play-page')
  },
  {
    path: '/load',
    name: 'load',
    component: () => import(/* webpackChunkName: "first-load" */ '@/views/first-load')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to)
  next()
})

export default router
