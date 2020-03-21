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
import { songURL, songdetail } from '@/api/song'
import eventBus from '@/utils/eventBus'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'audioPage',
  props: {},
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
      current: getItem('currentIndex') ? getItem('currentIndex') : 0,
      artists: {}
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
      this.$store.commit(
        'setCurrentSong',
        this.$store.state.playlist[this.current]
      )
      this.$refs.audio
        .play()
        .then(() => {
          eventBus.$emit('onPlay', true)
          this.$store.commit('isPlay', true)
        })
        .catch(err => {
          console.dir('没有权限，播放下一首', err)
          this.current++
          this.getSong(this.$store.state.playlist[this.current].id)
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
      // console.log(this.$refs.audio.duration * 1000)
      this.$store.commit('getmaxTime', ~~this.$refs.audio.duration)
    },
    // 获取播放进度
    onTimeupdate (e) {
      this.audio.currentTime = ~~e.target.currentTime
      eventBus.$emit('getLyric', e.target.currentTime)
      eventBus.$emit('bu')
    },
    // 错误回调
    onError () {
      console.log('onError歌曲播放错误')
    },
    // 播放帧
    async onWaiting () {
      console.log('waiting')
      const { data } = await songdetail({ id: this.$store.state.currentSong.id })
      this.artists = data.songs[0].al
      this.$store.commit('setArtists', data.songs[0].al)
      eventBus.$emit('onLyric', this.$store.state.currentSong.id)
    },
    // 暂停
    onPause () {
      eventBus.$emit('onPlay', false)
    }
  },

  created () {
    eventBus.$on('Currently', () => {
      this.onWaiting()
    })
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
