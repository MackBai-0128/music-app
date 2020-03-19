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
// import vAudio from ''
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
      }, 2000)
    }
  },
  created () {
    if (window.performance.navigation.type !== 1) {
      console.log('首次加载页面')
      this.$router.replace('/')
      this.timeOut()
    }
  },

  beforeDestroy () {
    clearInterval(this.timer)
    this.timer = null
  }
}
</script>

<style lang="less">
@import './styles/animate.less';
</style>
