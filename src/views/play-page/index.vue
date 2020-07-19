<template>
  <div class="play-page">
    <div class="bg-img">
      <img :src="artists.picUrl" />
    </div>
    <div class="play-container">
      <!-- nav -->
      <div class="nav-bar">
        <i class="icon-back" @click="$router.back()"></i>

        <div class="title">
          <p class="song-title">{{currentMusic?currentMusic.name:''}}</p>
          <p class="author" @click="onArtists">
            {{currentMusic?currentMusic.artists[0].name:''}}
            <i
              class="icon-tiaozhuanqianwangyoujiantouxiangyouxiayibuxianxing"
            ></i>
          </p>
        </div>
        <i class="icon-fenxiang fenxiang" @click="onShare"></i>
      </div>
      <!-- logo -->
      <div
        @click="isLogoLyric = false"
        v-if="isLogoLyric"
        class="cover animation"
        :class="isPlay?'running':'paused'"
      >
        <img :src="artists.picUrl" />
      </div>
      <!-- 歌词 -->
      <div @click="isLogoLyric = true" v-else>
        <v-lyric class="v-lyric" :lyric="lyRic" :lyricIndex="lyricIndex" :nolyric="nolyric" />
      </div>
      <!-- 操作区 -->
      <div class="features">
        <div class="operate">
          <i :class="isLike?'icon-xihuan-wangyiicon':'icon-xihuan1'" @click="onLike"></i>
          <i class="icon-xiazaipt-wangyiicon" @click="onDownload"></i>
          <i class="icon-shezhilingsheng"></i>
          <i class="icon-pinglunpt"></i>
          <i class="icon-caidan-dian"></i>
        </div>
        <div class="progress">
          <span class="time">{{currentTime | time}}</span>
          <mu-slider
            disabled
            @change="onPlaySchedule"
            track-color="rgba(255, 255, 255, 0.1);"
            thumb-color="#fff"
            color="#ccc"
            class="demo-slider"
            v-model="currentTime"
            :min="0"
            :max="maxTime?maxTime:1"
          ></mu-slider>
          <span class="time">{{maxTime | time}}</span>
        </div>
        <div class="mode">
          <i v-if="cycle===1" class="icon-xunhuanbofang" @click="isCycle"></i>
          <i v-else-if="cycle===2" class="icon-danquxunhuan" @click="isCycle"></i>
          <i v-else-if="cycle===3" class="icon-suijibofang" @click="isCycle"></i>
          <i class="icon-shangyiqu" @click="upSong"></i>
          <i :class="isPlay ? 'icon-bofang3': 'icon-zanting'" @click="isPlayOnPause"></i>
          <i class="icon-xiayiqu1" @click="unSong"></i>
          <i class="icon-caidan" @click="onSongsList"></i>
        </div>
      </div>
    </div>
    <van-action-sheet title="播放列表" v-model="playListShow">
      <ActionSheet />
    </van-action-sheet>
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import eventBus from '@/utils/eventBus'
import { parseLyric } from '@/filter'
import { songURL, songdetail, lyric, artists } from '@/api/song'
import axios from 'axios'
import vLyric from '@/components/lyric/lyric'
import ActionSheet from './components/ActionSheet'
export default {
  name: 'playPage',
  props: {},
  data () {
    return {
      playListShow: false,
      defaultImg: require('@/assets/img/timg.jpeg'),
      cycle: 1,
      isLike: false,
      duration: 0,
      du: 30,
      artists: {},
      lyRic: null, // 歌词
      nolyric: false, // 是否有歌词
      lyricIndex: 0, // 当前播放歌词下标
      isLogoLyric: true,
      mp3: {},
      showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' }
      ]
    }
  },
  components: {
    vLyric,
    ActionSheet
  },
  watch: {
    currentTime (val) {
      if (this.nolyric) {
        return
      }
      var lyricIndex = 0
      for (var i = 0; i < this.lyRic.length; i++) {
        if (val >= this.lyRic[i].time) {
          lyricIndex = i
        }
        this.lyricIndex = lyricIndex
      }
    },
    audio: {
      handler () {
        this.du = parseInt((this.audio.currentTime / this.duration) * 100)
      },
      deep: true
    }
  },
  filters: {
    // 时间处理
    time (val) {
      var secondType = typeof val
      if (secondType === 'number' || secondType === 'string') {
        val = parseInt(val)
        var mimute = Math.floor(val / 60)
        val = val - mimute * 60
        return ('0' + mimute).slice(-2) + ':' + ('0' + val).slice(-2)
      } else {
        return '00:00'
      }
    }
  },
  methods: {
    onSelect (option) {
      console.log(option)
      if (option.name === '微信') {
        window.location.href = 'weixin://'
        // var aLink = document.createElement('a')
        // var body = document.body
        // aLink.href = 'weixin://'
        // body.appendChild(aLink)
        // aLink.click()
      } else if (option.name === '微博') {
        window.location.href = 'weibo://'
      }
    },
    // 分享
    onShare () {
      this.showShare = true
    },
    // test歌手信息
    async onArtists () {
      const { data } = await artists({ id: this.currentMusic.artists[0].id })
      console.log(data)
    },
    // 获取歌词
    async getlyric (id) {
      this.nolyric = true
      try {
        const { data } = await lyric(id)
        // this.lyRic = new Lyric(data.lrc.lyric).lines
        this.lyRic = parseLyric(data.lrc.lyric)
        this.nolyric = false
      } catch (error) {
        this.nolyric = true
      }
    },
    // 获取歌曲详情
    async getSongDetail (id) {
      const { data } = await songdetail({ id })
      this.artists = data.songs[0].al
    },
    // 下载
    async onDownload () {
      this.$toast.loading({
        message: '加载资源中...',
        forbidClick: true,
        duration: 0
      })
      await this.getUrl(this.currentMusic.id)
      // 下载需要跨域，非源无法获取cookie，这里禁止携带cookie
      axios.defaults.withCredentials = false
      axios({
        method: 'get',
        url: this.mp3.url,
        responseType: 'blob'
      }).then(res => {
        this.$toast.clear()
        if (!res) {
          return
        }
        const url = window.URL.createObjectURL(res.data)
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute(
          'download',
          this.currentMusic.name + '.' + this.mp3.type
        )
        document.body.appendChild(link)
        link.click()
        // 下载完毕后删除节点
        document.body.removeChild(link)
      })
    },
    // 滑动条
    onPlaySchedule () {
      // eventBus.$emit('currentTime', this.du)
    },
    // 喜欢
    onLike () {
      this.isLike = !this.isLike
      if (this.isLike) {
        console.log('喜欢')
      } else {
        console.log('取消喜欢')
      }
    },
    // 循环模式
    isCycle () {
      this.cycle++
      if (this.cycle === 4) {
        this.cycle = 1
      }
      if (this.cycle === 2) {
        console.log('单曲循环')
        this.$refs.audio.loop = true
      } else if (this.cycle === 1) {
        this.$refs.audio.loop = false
        console.log('列表循环')
      } else if (this.cycle === 3) {
        this.$refs.audio.loop = false
        console.log('随机循环')
      }
    },
    // 上一曲
    upSong () {
      eventBus.$emit('upSong')
    },
    // 下一曲
    unSong () {
      eventBus.$emit('unSong')
    },
    // 播放控制
    isPlayOnPause () {
      eventBus.$emit('isPlayOnPause')
    },
    // 打开播放列表
    onSongsList () {
      this.playListShow = true
    },
    // 测试获取歌曲url
    async getUrl (id) {
      const { data } = await songURL({ url: id })
      this.mp3 = data.data[0]
    }
  },

  created () {
    // 获取新歌词
  },
  mounted () {
    eventBus.$on('onLyric', id => {
      this.getlyric(id)
      this.getSongDetail(id)
    })
    if (this.currentMusic) {
      this.getSongDetail(this.currentMusic.id)
      this.getlyric(this.currentMusic.id)
    }
    eventBus.$on('waiting', id => {
      this.getSongDetail(id)
      this.getlyric(id)
    })
    eventBus.$on('onPlaySong', item => {
      this.getUrl(item.id)
    })
  },
  computed: {
    ...mapGetters(['currentMusic', 'flie', 'isPlay', 'currentTime', 'maxTime'])
  }
}
</script>

<style scoped lang="less">
.play-page {
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
.play-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.is-bg-color {
  background: linear-gradient(to top, #ff6a28, #fe2f57);
}
.bg-img {
  width: 120vw;
  height: 120vh;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -60vh;
  margin-left: -60vw;
  z-index: -1;
  filter: brightness(0.8);
  img {
    height: 100%;
    width: 100%;
    // 毛玻璃
    -webkit-filter: blur(50px);
    filter: blur(50px);
  }
}
.nav-bar {
  width: 100vw;
  color: #fff;
  height: 46px;
  box-sizing: border-box;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    .author {
      font-size: 12px;
      i {
        font-size: 12px;
      }
    }
    .song-title {
      width: 40vw;
      overflow: hidden;
      overflow-y: scroll;
      white-space: nowrap;
      text-align: center;
    }
  }
  .fenxiang {
    font-size: 20px;
  }
}
// 封面
.cover {
  position: absolute;
  top: 20vh;
  box-sizing: border-box;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #fafafa;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.on-lyric {
  height: 20px;
  color: #fff;
}

.features {
  position: fixed;
  bottom: 0;
  background-color: rgba(65, 65, 65, 0.377);
  i {
    color: #ece4e5 !important;
  }
  .operate {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
    i {
      font-size: 20px;
    }
  }
  .progress {
    display: flex;
    padding: 0 10px;
    box-sizing: border-box;
    width: 100vw;
    justify-content: space-between;
    align-items: center;
    .time {
      font-size: 14px;
      color: #ebe4e5;
    }
    /deep/ .van-progress {
      width: 70vw;
    }
    /deep/ .van-progress__pivot {
      background: none !important;
      border-radius: 50%;
    }
    .demo-slider {
      margin: 0 13px;
    }
  }
  .mode {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
    i {
      font-size: 20px;
    }
    & > i:nth-child(3) {
      font-size: 50px;
    }
  }
}
.paused {
  animation-play-state: paused;
}
.running {
  animation-play-state: running;
}
</style>
