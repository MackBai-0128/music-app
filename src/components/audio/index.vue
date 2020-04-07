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
import { mapGetters, mapMutations } from 'vuex'
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
        this.getcurrentTime(this.audio.currentTime)
      },
      deep: true
    }
  },
  filters: {},
  methods: {
    ...mapMutations({
      setPlay: 'setPlay',
      setFile: 'setFile',
      getmaxTime: 'getmaxTime',
      getcurrentTime: 'getcurrentTime',
      setArtists: 'setArtists',
      setCurrentSong: 'setCurrentSong'
    }),
    // 获取src地址
    async getSong (id) {
      const { data } = await songURL({ url: id })
      this.$refs.audio.src = data.data[0].url
      setItem('currentIndex', this.current)
      this.setFile(data.data[0])
      this.setCurrentSong(this.playlist[this.current])
      this.$refs.audio
        .play()
        .then(() => {
          this.setPlay(true)
        })
        .catch(err => {
          console.dir('没有权限，播放下一首', err)
          this.current++
          this.setPlay(false)
          this.getSong(this.playlist[this.current].id)
        })
    },
    // 当前歌曲播放结束触发
    onStop () {
      this.current++
      if (this.current > this.playlist.length - 1) {
        this.current = 0
      }
      this.getSong(this.playlist[this.current].id)
    },
    onAbort () {
      console.log('onAbort')
    },
    // 获取总时长
    getDuration () {
      this.getmaxTime(~~this.$refs.audio.duration)
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
    async onWaiting () {
      console.log('触发waiting')
      const { data } = await songdetail({ id: this.currentMusic.id })
      this.artists = data.songs[0].al
      this.setArtists(data.songs[0].al)
      eventBus.$emit('onLyric', this.currentMusic.id)
    },
    // 暂停
    onPause () {
      this.setPlay(false)
    }
  },

  created () {},
  mounted () {
    // 播放/暂停
    this.$nextTick().then(() => {
      eventBus.$on('isPlayOnPause', () => {
        if (!this.$refs.audio.src) {
          this.getSong(this.currentMusic.id)
          this.setPlay(true)
        } else {
          if (this.$refs.audio.paused) {
            this.$refs.audio.play()
            this.setPlay(true)
          } else {
            this.$refs.audio.pause()
            this.setPlay(false)
          }
        }
      })
      // 播放视频暂停音乐
      eventBus.$on('onVideo', () => {
        this.$refs.audio.pause()
      })
      eventBus.$on('goPlayAr', i => {
        this.current = i
        this.getSong(this.playlist[this.current].id)
      })
    })
    // 上一曲
    eventBus.$on('upSong', () => {
      this.current--
      if (this.current < 0) {
        this.current = this.playlist.length - 1
      }
      if (this.playlist[this.current].id !== undefined) {
        this.getSong(this.playlist[this.current].id)
      }
    })
    // 下一曲
    eventBus.$on('unSong', () => {
      this.current++
      if (this.playlist.length - 1 < this.current) {
        this.current = 0
      }
      if (this.playlist[this.current].id !== undefined) {
        this.getSong(this.playlist[this.current].id)
      }
    })
    // 拖拽进度条**未实现**
    eventBus.$on('currentTime', item => {
      this.audio.currentTime = item
      this.$refs.audio.currentTime = item
    })
    // 传值播放
    eventBus.$on('play', id => {
      this.current = 0
      if (!id) {
        this.getSong(this.playlist[this.current].id)
      } else {
        this.getSong(id)
      }
    })
  },
  updated () {},

  computed: {
    ...mapGetters(['currentMusic', 'playlist'])
  }
}
</script>

<style scoped lang="less">
.audio{
  display: none;
}
</style>
