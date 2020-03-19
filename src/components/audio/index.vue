<template>
  <div class="audio">
    <audio
      ref="audio"
      class="dn"
      @error="onError"
      @waiting="onWaiting"
      @pause="onPause"
      @timeupdate="onTimeupdate"
      @canplay="getDuration"
      @ended="onStop"
      @abort="onAbort"
    ></audio>
  </div>
</template>

<script>
import { songURL } from '@/api/song'
import eventBus from '@/utils/eventBus'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'audioPage',
  props: {
  },
  data () {
    return {
      audio: {
        currentTime: 0, // 播放进度（时间）
        maxTime: 0, // 总时长
        playing: false, // 是否自动播放
        muted: false, // 是否静音
        speed: 1,
        waiting: true,
        preload: 'auto'
      },
      controlList: {
        // 不显示下载
        noDownload: false,
        // 不显示静音
        noMuted: false,
        // 不显示音量条
        noVolume: false,
        // 不显示进度条
        noProcess: false,
        // 只能播放一个
        onlyOnePlaying: false,
        // 不要快进按钮
        noSpeed: false
      },
      current: getItem('currentIndex') ? getItem('currentIndex') : 0
    }
  },
  components: {},
  watch: {
    audio: {
      handler (val) {
        this.$store.commit('getTime', this.audio.currentTime)
      },
      deep: true
    }
  },
  filters: {},
  methods: {
    // 获取src地址
    async getSong (id) {
      const { data } = await songURL({ url: id })
      this.$refs.audio.src = data.data[0].url
      setItem('currentIndex', this.current)
      this.$store.commit('setFile', data.data[0])
      this.$store.commit('setCurrentSong', this.$store.state.playlist[this.current])
      this.$refs.audio
        .play()
        .then(() => {
          eventBus.$emit('onPlay', true)
          this.$store.commit('isPlay', true)
        })
        .catch(err => {
          console.dir('报错了', err)
          eventBus.$emit('onPlay', false)
          this.$store.commit('isPlay', false)
        })
    },
    // 当前歌曲播放结束触发
    onStop () {
      this.current++
      if (this.current > this.$store.state.playlist.length - 1) {
        this.current = 0
      }
      this.getSong(this.$store.state.playlist[this.current].id)
    },
    onAbort () {
      console.log('onAbort')
    },
    // 获取总时长
    getDuration () {
      // 此时可以获取到duration
      // this.duration = ~~this.$refs.audio.duration
      this.$store.commit('getmaxTime', ~~this.$refs.audio.duration)
    },
    // 获取播放进度
    onTimeupdate (e) {
      this.audio.currentTime = ~~e.target.currentTime
    },
    // 错误回调
    onError () {
      console.log('onError歌曲播放错误')
    },
    // 播放帧
    onWaiting () {
      console.log('waiting')
    },
    // 暂停
    onPause () {
      console.log('暂停onPause')
      eventBus.$emit('onPlay', false)
    }
  },

  created () {
    this.$nextTick().then(() => {
      eventBus.$on('isPlayOnPause', () => {
        if (!this.$refs.audio.src) {
          this.getSong(this.$store.state.currentSong.id)
        } else {
          if (this.$refs.audio.paused) {
            this.$refs.audio.play()
            eventBus.$emit('onPlay', true)
          } else {
            this.$refs.audio.pause()
            eventBus.$emit('onPlay', false)
          }
        }
      })
    })
    // 上一曲
    eventBus.$on('upSong', () => {
      this.current--
      if (this.current < 0) {
        this.current = this.$store.state.playlist.length - 1
      }
      if (this.$store.state.playlist[this.current].id !== undefined) {
        this.getSong(this.$store.state.playlist[this.current].id)
      }
    })
    // 下一曲
    eventBus.$on('unSong', () => {
      this.current++
      if (this.$store.state.playlist.length - 1 < this.current) {
        this.current = 0
      }
      if (this.$store.state.playlist[this.current].id !== undefined) {
        this.getSong(this.$store.state.playlist[this.current].id)
      }
    })
  },
  mounted () {
    // 下载
    // eventBus.$on('download', () => {
    //   console.log('下载')
    //   console.log(this.$refs.audio.src)

    //   this.$refs.audio.download = true
    // })
    // 传值播放
    eventBus.$on('play', id => {
      this.current = 0
      if (!id) {
        this.getSong(this.$store.state.playlist[this.current].id)
      } else {
        this.getSong(id)
      }
    })
  },
  updated () {},

  computed: {}
}
</script>

<style scoped lang="less">
</style>
