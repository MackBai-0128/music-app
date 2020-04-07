import Vue from 'vue'
import VueRouter from 'vue-router'

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
        component: () => import('@/views/detection')
      },
      {
        path: 'video',
        name: 'video',
        meta: { keepAlive: true },
        component: () => import('@/views/video')
      },
      {
        path: 'my',
        name: 'my',
        meta: { keepAlive: true },
        component: () => import('@/views/my')
      },
      {
        path: 'group',
        name: 'group',
        meta: { keepAlive: true },
        component: () => import('@/views/group')
      },
      {
        path: 'account',
        name: 'account',
        meta: { keepAlive: true },
        component: () => import('@/views/account')
      },
      {
        path: '/search/:name?',
        name: 'search',
        component: () => import('@/views/search')
      },
      {
        path: '/search-result/:name',
        name: 'search-result',
        meta: { keepAlive: true },
        component: () => import('@/views/search-result'),
        props: true
      },
      {
        path: '/songlist/:id',
        name: 'songlist',
        component: () => import('@/views/song-list'),
        props: true
      },
      {
        path: '/songslistsquare',
        name: 'songslistsquare',
        component: () => import('@/views/song-list-square')
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
    component: () => import('@/views/first-load')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
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
