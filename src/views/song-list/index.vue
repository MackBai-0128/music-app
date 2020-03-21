<template>
  <div class="song-list">
    <van-nav-bar :border="false" :title="title" @click-left="$router.back()">
      <i class="icon-back" slot="left"></i>
      <!-- right -->
      <div
        v-if="$store.state.currentSong.id"
        slot="right"
        class="slot-right"
        @click="$router.push('/play')"
      >
        <van-circle
          layer-color="#ebedf0"
          color="#F23832"
          v-model="currentRate"
          :rate="rate"
          :stroke-width="60"
        >
          <div slot="default" class="now-playing animation" v-if="JSON.stringify($store.state.currentSong) !== '{}'">
            <img :src="$store.state.artists.picUrl"/>
          </div>
        </van-circle>
      </div>
    </van-nav-bar>
    <div class="banner-bg">
      <div class="banner" :style="{backgroundImage: 'url(' + cover + ')'}"></div>
    </div>
    <!-- banner -->
    <div class="songlist-details">
      <div class="cover">
        <img :src="cover" />
      </div>
      <div class="playlist-information">
        <div class="playlist-information-top">
          <div class="cover-img">
            <img :src="cover" />
            <div class="play-amount">
              <i class="icon-bofang"></i>
              <span>
                {{'123'}}
                <span>万</span>
              </span>
            </div>
          </div>
          <div class="cover-title">
            <p class="cover-title-name">{{playlist.name}}</p>
            <div class="cover-author">
              <div class="author-img">
                <img :src="creator.avatarUrl" />
              </div>
              <div class="author-title">
                <span>{{creator.nickname}}</span>
              </div>
            </div>
            <!-- 简介 -->
            <div class="jianjie">
              <div class="text">{{playlist.description}}</div>
              <i class="icon-right"></i>
            </div>
          </div>
        </div>
        <div class="cover-icon">
          <div>
            <i class="icon-pinglunpt-wangyiicon"></i>
            <span>1213</span>
          </div>
          <div>
            <i class="icon-fenxiang"></i>
            <span>1213</span>
          </div>
          <div>
            <i class="icon-xiazaipt-wangyiicon"></i>
            <span>1213</span>
          </div>
          <div>
            <i class="icon-duoxuanpt"></i>
            <span>1213</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 列表 -->
    <div class="list">
      <div class="playlist-nav">
        <div class="left">
          <i class="icon-bofang2"></i>
          <div class="play-all" @click="onPlayAll">
            播放全部
            <span>(共{{tracks.length}}首)</span>
          </div>
        </div>
        <div class="right">
          <van-icon name="plus" class="icon" />
          <div class="favorite">
            收藏
            <span>({{Favorite}})</span>
          </div>
        </div>
      </div>
      <div class="playlist-container">
        <ul class="playlist-content">
          <li @click="onPlay(index)" class="list-item" v-for="(item,index) in tracks" :key="item.id">
            <div class="play-serial">{{index+1}}</div>
            <div class="play-title">
              <div class="title">
                <p class="song-name">{{item.name}}</p>
                <p class="singer-name">{{item.ar[0].name}} - {{item.al.name}}</p>
              </div>
              <div class="operating">
                <i class="icon-shipin1" @click.stop="onMv(item)"></i>
                <i class="icon-caidan-dian" @click.stop="onOperating(item)"></i>
              </div>
            </div>
          </li>
          <!-- 底部收藏者 -->
          <li class="collector">
            <div class="left">
              <div class="avatar">
                <img src="../../assets/img/jujingyi.jpg" alt />
              </div>
              <div class="avatar">
                <img src="../../assets/img/jujingyi.jpg" alt />
              </div>
              <div class="avatar">
                <img src="../../assets/img/jujingyi.jpg" alt />
              </div>
            </div>
            <div class="right">
              <p>19234人收藏</p>
              <i class="icon-right"></i>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from '@/utils/eventBus'
import { playlist } from '@/api/song'
export default {
  name: 'songList',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      title: '歌单',
      currentRate: 60,
      rate: '50%',
      tracks: [],
      songs: [],
      Favorite: 0,
      cover: '',
      playlist: {},
      creator: ''
    }
  },
  components: {},
  watch: {
    playlist: {
      handler (val, oldVal) {
        this.creator = val.creator
      },
      deep: true
    }
  },
  filters: {},
  methods: {
    onOperating (item) {
      console.log('onOperating', item)
    },
    onMv (item) {
      console.log('MV开发中。。。', item)
    },
    onPlay (index) {
      this.$store.commit('setPlayList', [this.songs[index]])
      eventBus.$emit('play', this.songs[index].id)
      this.$router.push('/play')
    },
    onPlayAll () {
      this.$store.commit('setPlayList', this.songs)
      this.$router.push('/play')
      eventBus.$emit('play')
    },
    async getSongList (id) {
      var songs = []
      var obj = {}
      var album = {} // 专辑
      var arr = []
      var artists = {} // 艺术家
      // 专辑 ： al
      // 艺术家：ar
      const { data } = await playlist({ id })
      data.playlist.tracks.forEach(item => {
        obj.id = item.id
        obj.name = item.name
        // 专辑
        album.name = item.al.name
        album.id = item.al.id
        album.img = item.al.picUrl
        // 专辑
        obj.album = album
        // 艺术家
        item.ar.forEach(item2 => {
          artists.id = item2.id
          artists.name = item2.name
          arr.push(artists)
          artists = {}
        })
        obj.artists = arr
        songs.push(obj)
        arr = []
        obj = {}
        album = {}
      })
      this.songs = songs
      this.tracks = data.playlist.tracks
      this.Favorite = data.playlist.subscribedCount
      this.cover = data.playlist.coverImgUrl
      this.playlist = data.playlist
    }
  },
  created () {
    this.getSongList(this.id)
  },
  mounted () {},
  computed: {}
}
</script>

<style scoped lang="less">
.song-list {
  height: 100vh;
  background-color: #fff;
}
/deep/ .van-nav-bar {
  z-index: 4;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.3);
  .van-nav-bar__title {
    color: #fff;
    position: relative;
    z-index: 999;
  }
  /deep/ .icon-back {
    color: #fff;
    position: relative;
    z-index: 999;
  }
}
.banner-bg {
  z-index: 3;
  width: 100vw;
  height: 46px;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  .banner {
    width: 100vw;
    height: 100%;
    background-size: 100%;
    filter: blur(0px) brightness(90%);
    background-size: 100%;
    background-position: center;
    background-position-y: top;
  }
}
// 详情
.songlist-details {
  height: 44vh;
  overflow: hidden;
  position: relative;
  .cover {
    position: absolute;
    z-index: 1;
    top: 0;
    width: 100vw;
    height: 100%;
    background-color: #999999;
    img {
      filter: blur(30px);
      width: 100vw;
      height: 100%;
    }
  }
  .playlist-information {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: 2;
    box-sizing: border-box;
    padding-top: 46px;
    height: 100%;
    background: none;
    .cover-icon {
      flex: 1;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding-bottom: 15px;
      & > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        i {
          font-size: 22px;
          color: #fff;
        }
        span {
          font-weight: 200;
          color: #fff;
          font-size: 14px;
        }
      }
    }
  }
}
// 封面
.playlist-information-top {
  padding: 10px 0 10px 10px;
  display: flex;
  .cover-img {
    margin-right: 15px;
    width: 120px;
    height: 120px;
    box-sizing: border-box;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    .play-amount {
      font-size: 12px;
      color: #fff;
      position: absolute;
      top: 2px;
      right: 10px;
      z-index: 40;
      display: flex;
      align-items: center;
      i {
        font-size: 13px;
      }
    }
  }
  .cover-title {
    width: 60vw;
    display: flex;
    align-items: stretch;
    flex-direction: column;
    .cover-title-name {
      font-size: 16px;
      color: #fff;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      /* autoprefixer: off */
      -webkit-box-orient: vertical;
      /* autoprefixer: on */
      -webkit-line-clamp: 2;
    }
    .cover-author {
      color: #fff;
      margin-top: 10px;
      font-size: 14;
      display: flex;
      align-items: center;
      .author-img {
        width: 23px;
        height: 23px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 5px;
      }
      .author-title {
        font-size: 12px;
      }
    }
    .jianjie {
      flex: 1;
      color: #ccc;
      width: 60vw;
      display: flex;
      align-items: center;
      .text {
        width: 55vw;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        /* autoprefixer: off */
        -webkit-box-orient: vertical;
        /* autoprefixer: on */
        -webkit-line-clamp: 2;
        font-size: 12px;
      }
    }
  }
}
// 列表
.list {
  box-sizing: border-box;
  margin-top: 46px;
  z-index: 1;
  position: absolute;
  margin-top: -20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: #fff;
  width: 100vw;
  height: calc(100vh - 46px);
  overflow: hidden;
  .playlist-nav {
    background-color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 6px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      .play-all {
        font-size: 15px;
        display: flex;
        align-items: center;
        span {
          margin-left: 4px;
          font-size: 12px;
          color: #666;
        }
      }
      i {
        margin-right: 5px;
        font-size: 15px;
      }
    }
    .right {
      display: flex;
      align-items: center;
      border-radius: 20px;
      background-color: #ccc;
      padding: 8px 6px;
      color: #fff;
      background: linear-gradient(to right, #f95c52, #fc2625);
      .icon {
        font-size: 12px;
      }
      .favorite {
        font-size: 12px;
        span {
          font-size: 12px;
        }
      }
    }
  }
  .playlist-container {
    overflow-y: scroll;
    margin-top: 48px;
    padding-bottom: 100px;
    box-sizing: border-box;
    height: 100%;
    &::-webkit-scrollbar {
      width: 0 !important;
    }
    .playlist-content {
      .list-item {
        padding: 8px 0;
        display: flex;
        align-items: center;
        .play-serial {
          flex: 1;
          font-size: 13px;
          text-align: center;
          color: #666;
        }
        .play-title {
          flex: 9;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .title {
            font-size: 12px;
            .singer-name {
              width: 70vw;
              color: #999;
              font-size: 12px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .song-name {
              width: 70vw;
              font-size: 12px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .operating {
            color: #666;
            display: flex;
            justify-content: space-around;
            align-items: center;
            i:nth-child(2) {
              margin: 0 15px;
            }
          }
        }
      }
      .collector {
        padding: 8px 2px;
        display: flex;
        justify-content: space-between;
        .left {
          display: flex;
          align-items: center;
          .avatar {
            margin: 0 3px;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            overflow: hidden;
          }
        }
        .right {
          font-size: 12px;
          color: #666;
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
// 正在播放旋转
.slot-right {
  position: relative;
  z-index: 99;
  width: 28px;
  height: 46px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  /deep/ .van-circle {
    width: 24px !important;
    height: 24px !important;
  }
  .now-playing {
    overflow: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -10px;
    margin-left: -10px;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.animation {
  animation: myRotate 20s linear infinite;
}
</style>
