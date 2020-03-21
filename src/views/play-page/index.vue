<template>
  <div class="play-page">
    <div class="bg-img">
      <img
        :src="JSON.stringify($store.state.currentSong) !== '{}'?$store.state.artists.picUrl:defaultImg"
      />
    </div>
    <div class="play-container">
      <!-- nav -->
      <div class="nav-bar">
        <i class="icon-back" @click="$router.back()"></i>
        <div class="title">
          <p class="song-title">{{$store.state.currentSong?$store.state.currentSong.name:'未选择'}}</p>
          <p class="author">
            {{$store.state.currentSong?$store.state.currentSong.artists[0].name:''}}
            <i
              class="icon-tiaozhuanqianwangyoujiantouxiangyouxiayibuxianxing"
            ></i>
          </p>
        </div>
        <i class="icon-fenxiang fenxiang"></i>
      </div>
      <!-- logo -->
      <div
        @click="isLogoLyric = false"
        v-if="isLogoLyric"
        class="cover animation"
        :class="isPlay?'running':'paused'"
      >
        <img
          :src="JSON.stringify($store.state.currentSong) !== '{}'?$store.state.artists.picUrl:defaultImg"
        />
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
          <span class="time">{{$store.state.currentTime | time}}</span>
          <mu-slider
            @change="onPlaySchedule(du)"
            track-color="rgba(255, 255, 255, 0.1);"
            thumb-color="#fff"
            color="#ccc"
            class="demo-slider"
            v-model="$store.state.currentTime"
            :min="0"
            :max="$store.state.maxTime?$store.state.maxTime:1"
          ></mu-slider>
          <span class="time">{{$store.state.maxTime | time}}</span>
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
  </div>
</template>

<script>
import Lyric from 'lyric-parser'
import eventBus from '@/utils/eventBus'
import { songURL, songdetail, lyric } from '@/api/song'
import axios from 'axios'
import vLyric from '@/components/lyric/lyric'
export default {
  name: 'playPage',
  props: {},
  data () {
    return {
      defaultImg: require('@/assets/img/timg.jpeg'),
      cycle: 1,
      isPlay: false,
      isLike: false,
      duration: 0,
      du: 30,
      artists: {},
      lyRic: [], // 歌词
      nolyric: false, // 是否有歌词
      lyricIndex: 0, // 当前播放歌词下标
      isLogoLyric: true,
      currentTime: 0
    }
  },
  components: {
    vLyric
    // betterScroll
  },
  watch: {
    currentTime (val) {
      if (this.nolyric) {
        return
      }
      var lyricIndex = 0
      for (var i = 0; i < this.lyRic.length; i++) {
        if (val * 1000 >= (this.lyRic[i].time)) {
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
    // 获取歌词
    async getlyric (id) {
      try {
        const { data } = await lyric(id)
        this.lyRic = new Lyric(data.lrc.lyric).lines
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
    onDownload () {
      axios({
        method: 'get',
        url: this.$store.state.flie.url,
        responseType: 'blob'
      }).then(res => {
        console.log(res)
        if (!res) {
          return
        }
        const url = window.URL.createObjectURL(res.data)
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute(
          'download',
          this.$store.state.currentSong.name + '.' + this.$store.state.flie.type
        )
        document.body.appendChild(link)
        link.click()
        // 下载完毕后删除节点
        document.body.removeChild(link)
      })
    },
    // 滑动条
    onPlaySchedule (e) {
      console.log(e)
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
      console.log('onSongsList')
    },
    // 测试获取歌曲url
    async getUrl (id) {
      const { data } = await songURL({ url: id })
      console.log(data.data)
    }
  },

  created () {
    // 获取新歌词
    eventBus.$on('onLyric', id => {
      console.log(id)
      this.getlyric(id)
    })
    eventBus.$on('getLyric', item => {
      this.currentTime = item
    })
    this.getSongDetail(this.$store.state.currentSong.id)
    this.getlyric(this.$store.state.currentSong.id)
    this.isPlay = this.$store.state.isPlay
  },
  mounted () {
    // console.log(document.getElementById('wrapper'))
    eventBus.$on('waiting', id => {
      this.getSongDetail(id)
      this.getlyric(id)
    })
    eventBus.$on('onPlaySonglist', item => {
      console.log(item)
      // this.getUrl(item.id)
    })
    eventBus.$on('onPlaySong', item => {
      console.log(item)
      this.getUrl(item.id)
    })
    eventBus.$on('onPlay', type => {
      this.$store.state.isPlay = type
      this.isPlay = type
    })
  },
  computed: {
    isCurrent () {
      if (this.$store.state.currentSong) {
        if (this.$store.state.currentSong.artists[0].img) {
          return this.$store.state.currentSong.artists[0].img
        } else if (this.$store.state.currentSong.album.img) {
          return this.$store.state.currentSong.album.img
        }
      }
      return this.defaultImg
    }
  }
}
</script>

<style scoped lang="less">
.play-page {
  height: 100vh;
  overflow: hidden;
}
.play-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.bg-img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  overflow: hidden;
  // background: linear-gradient(to bottom, #fff, #000);
  img {
    height: 120vh;
    filter: blur(40px);
    width: 100vw;
    height: 100vh;
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

.animation {
  animation: myRotate 20s linear infinite;
}

.v-lyric {
  // height: 20px;
}

.features {
  height: 190px;
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
