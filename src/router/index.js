import Vue from 'vue'
import VueRouter from 'vue-router'
import tabBar from '../views/tabBar'

Vue.use(VueRouter)

// router.beforeEach((to, from, next) => {
//   getVersion()
//     .then(res => {
//       if (process.env.VUE_APP_VERSION.toString() !== res.data.version.toString()) {
//         iView.QhMessage.info({
//           duration: 100,
//           closable: true,
//           content: '系统版本有更新，可按【CTRL + F5】获取最新资源！'
//         })
//       }
//     })
//     .catch(err => {
//       console.log(err)
//     })
//   iView.LoadingBar.start()
//   next()
// })

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
