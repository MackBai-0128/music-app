<template>
  <div id="app">
    <firstLoad v-if="isShow" />
    <v-audio />
    <keep-alive>
      <transition :name="transitionName">
        <router-view v-if="!isShow" />
      </transition>
    </keep-alive>
  </div>
</template>
<script>
import firstLoad from './views/first-load'
import { status, refresh } from '@/api/login'
import { mapMutations } from 'vuex'
import { removeToken } from '@/utils/util'
export default {
  data () {
    return {
      isShow: false,
      timer: null,
      transitionName: ''
    }
  },
  watch: {
    $route (to, from) {
      if (!to.meta.transfrom) {
        this.transitionName = 'leave'
      } else {
        this.transitionName = ''
      }
    }
  },
  components: {
    firstLoad,
    vAudio: () => import('./components/audio')
  },
  methods: {
    ...mapMutations({
      setUserInfo: 'setUserInfo'
    }),
    // 刷新登录
    async loginRefresh () {
      await refresh()
    },
    // 登录状态
    async getstatus () {
      try {
        const res = await status()
        if (res.statusText === 'OK') {
          this.setUserInfo(res.data.profile)
        } else {
          this.setUserInfo(null)
        }
      } catch (error) {
        console.log('未登录', error.response)
        removeToken('music-token')
        this.setUserInfo(null)
      }
    },
    timeOut () {
      this.isShow = true
      return new Promise((resolve, reject) => {
        this.timer = setTimeout(() => {
          this.isShow = false
        }, 5000)
      })
    }
  },
  created () {
    this.getstatus()
    // 页面首次加载显示页
    if (window.performance.navigation.type !== 1) {
      this.timeOut()
      if (!this.isShow) {
        this.$router.replace('/')
      }
    } else {
      this.$router.replace('/')
      this.$toast('刷新页面了~')
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
#app {
  width: 100vw;
  height: 100vh;
}
.leave-leave-active {
  transition: all 0.3s ease;
}
.leave-leave-active {
  z-index: 999999;
  position: absolute;
  transform: translateX(100%);
}
</style>
