<template>
  <div id="app">
    <firstLoad v-if="isShow"/>
    <v-audio />
    <keep-alive >
      <router-view v-if="!isShow"/>
    </keep-alive>
  </div>
</template>
<script>
import firstLoad from './views/first-load'
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
    timeOut () {
      this.isShow = true
      this.timer = setTimeout(() => {
        this.isShow = false
      }, 5000)
    }
  },
  created () {
    // 浏览器刷新后去首页
    if (this.$router.path !== '/') {
      this.$router.replace('/')
    }
    // 页面首次加载显示页
    if (window.performance.navigation.type !== 1) {
      console.log('首次加载页面')
      this.$router.replace('/')
      this.timeOut()
    }
  },

  beforeDestroy () {
    clearInterval(this.timer)
    this.timer = null
  },
  mounted () {
    // window.onbeforeunload = function (e) {
    //   console.log(e)
    //   var dialogText = 'Dialog text here'
    //   e.returnValue = dialogText
    //   return dialogText
    // }
  }
}
</script>

<style lang="less">
@import './styles/animate.less';
</style>
