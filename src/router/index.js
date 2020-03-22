import Vue from 'vue'
import VueRouter from 'vue-router'
import tabBar from '../views/tabBar'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: tabBar,
    children: [
      {
        path: '',
        name: '',
        component: () => import('@/views/detection')
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my')
      },
      {
        path: 'group',
        name: 'group',
        component: () => import('@/views/group')
      },
      {
        path: 'account',
        name: 'account',
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
        component: () => import('@/views/search-result'),
        props: true
      },
      {
        path: '/songlist/:id',
        name: 'songlist',
        component: () => import('@/views/song-list'),
        props: true
      }
    ]
  },
  {
    path: '/play',
    name: 'play',
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

export default router
