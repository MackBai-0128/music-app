<template>
  <div id="app">
    <firstLoad v-if="isShow" />
    <v-audio />
    <keep-alive>
      <router-view v-if="!isShow" />
    </keep-alive>
  </div>
</template>
<script>
import firstLoad from './views/first-load'
import { status } from '@/api/login'
export default {
  data () {
    return {
      isShow: false,
      timer: null
    }
  },
  components: {
    firstLoad,
    vAudio: () => import('./components/audio')
  },
  methods: {
    async getstatus () {
      try {
        const res = await status()
        console.log('登录状态', res)
      } catch (error) {
        console.log('未登录', error.response)
      }
    },
    timeOut () {
      this.isShow = true
      this.timer = setTimeout(() => {
        this.isShow = false
      }, 5000)
    }
  },
  created () {
    this.getstatus()
    // 浏览器刷新后去首页
    if (this.$router.path !== '/') {
      this.$toast('刷新页面了')
      this.$router.replace('/')
    }
    // 页面首次加载显示页
    if (window.performance.navigation.type !== 1) {
      console.log('首次加载页面')
      this.$router.replace('/')
      this.timeOut()
    }
  },
  mounted () {
    // 阻止浏览器刷新
    // window.onbeforeunload = (e) => {
    //   var dialogText = '刷新页面'
    //   e.returnValue = dialogText
    //   return dialogText
    // }
  },
  beforeDestroy () {
    clearInterval(this.timer)
    this.timer = null
  }
}
</script>

<style lang="less">
@import "./styles/animate.less";
</style>
