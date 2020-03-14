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
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
