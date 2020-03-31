<template>
  <div class="composite">
    <div class="loaders" v-if="isShow">
      <vue-loaders-line-scale name="ball-beat" color="#F94949" scale="0.7" />
      <span class="loads">正在加载...</span>
    </div>
    <template v-else>
      <!-- 你可能感兴趣 -->
      <div class="interest" v-if="albumList.length || artistList.length">
        <p>你可能感兴趣</p>
        <div class="interest-item">
          <!-- 歌手 -->
          <template v-if="artistList.length">
            <div class="singer" v-for="item in artistList" :key="item.id">
              <div class="left">
                <div class="singer-img">
                  <img :src="item.img1v1Url" />
                </div>
                <div class="singer-info">
                  <div class="singer-name">
                    歌手：
                    <span class="singer-xingmign">{{item.name}}</span>
                  </div>
                  <div class="singer-xinxi">
                    <span>粉丝:{{item.fansSize | changeNumber}}</span>
                    <span>歌曲:{{item.musicSize}}</span>
                    <span>专辑:{{item.albumSize}}</span>
                  </div>
                </div>
              </div>
              <i class="icon-right"></i>
            </div>
          </template>
          <!-- 专辑 -->
          <template v-if="albumList.length">
            <div class="album" v-for="item in albumList" :key="item.id">
              <div class="left">
                <div class="album-img">
                  <img :src="item.blurPicUrl" />
                  <div class="album-bg"></div>
                </div>

                <div class="album-info">
                  <div class="album-name">专辑：{{item.name}}</div>
                  <div class="album-xinxi">
                    <span>
                      <i class="icon-"></i>
                      <span class="singer-xingmign">{{item.artists[0].name}}</span>
                    </span>
                  </div>
                </div>
              </div>
              <i class="icon-right"></i>
            </div>
          </template>
        </div>
      </div>
      <!-- 单曲 -->
      <div class="search-result">
        <div class="single-nav">
          <div>单曲</div>
          <van-button type="default" size="mini" @click="onPlayAll">播放全部</van-button>
        </div>
        <ul class="search-result-container">
          <li v-for="item in songs" :key="item.id" @click="goPlay(item)">
            <div class="left">
              <div class="title">{{item.name}}</div>
              <div class="singer">
                <i class="icon-sq"></i>
                <span>{{item.artists[0].name}}</span>
                <span>-</span>
                <span>{{item.album.name}}</span>
              </div>
            </div>
            <div class="right">
              <i class="icon-shipin1 shipin"></i>
              <i class="icon-caidan-dian"></i>
            </div>
          </li>
          <li class="songs-all" @click="onClick(1)" v-if="song.moreText">
            {{song.moreText}}
            <i class="icon-right"></i>
          </li>
          <li class="songs-all" v-else>暂无更多</li>
        </ul>
      </div>
      <!-- 视频 -->
      <div class="search-result-video" v-if="videos.videos">
        <div class="se-title">视频</div>
        <ul class="video-container">
          <li class="video-item" v-for="item in videos.videos" :key="item.vid">
            <div class="video-cover">
              <div class="amount">
                <i class="icon-bofang"></i>
                <span>{{item.playTime | changeNumber}}</span>
              </div>
              <img :src="item.coverUrl" />
            </div>
            <div class="video-title">
              <div class="video-name">
                <i class="icon-MV" v-if="item.type===0"></i>
                {{item.title}}
              </div>
              <div class="video-xinxi">
                <span>{{item.durationms | timeFilter}},</span>
                <span v-for="creator in item.creator" :key="creator.userId">{{creator.userName}}</span>
              </div>
            </div>
          </li>
          <li class="more" v-if="videos.moreText">
            <span @click="onClick(4)">{{videos.moreText}}</span>
            <i class="icon-right"></i>
          </li>
          <li class="more" v-else>暂无更多</li>
        </ul>
      </div>
      <!-- 相关搜索 -->
      <div class="search-result-query" v-if="simQuery.sim_querys">
        <div class="se-title">相关搜索</div>
        <div class="query-container">
          <span
            @click="onKeyword(item.keyword)"
            v-for="(item,index) in simQuery.sim_querys"
            :key="index"
          >{{item.keyword}}</span>
        </div>
      </div>
      <!-- 歌手 -->
      <div class="search-result-artist" v-if="artists.artists">
        <div class="se-title">歌手</div>
        <ul class="artist-container">
          <li class="artist-item" v-for="item in artists.artists" :key="item.id">
            <div class="artist-left">
              <div class="artist-cover">
                <img :src="item.picUrl" />
              </div>
              <div class="artist-name">{{item.name}}</div>
            </div>
            <div class="artist-ruzhu">已入驻</div>
          </li>
          <li class="more" v-if="artists.moreText">
            <span @click="onClick(2)">{{artists.moreText}}</span>
            <i class="icon-right"></i>
          </li>
          <li class="more" v-else>暂无更多</li>
        </ul>
      </div>
      <!-- 专辑 -->
      <div class="search-result-albums" v-if="albums.albums">
        <div class="se-title">专辑</div>
        <ul class="albums-container">
          <li class="albums-item" v-for="item in albums.albums" :key="item.id">
            <div class="albums-cover">
              <div class="album-bg"></div>
              <img :src="item.picUrl" alt />
            </div>
            <div class="albums-title">
              <div class="albums-name">
                {{item.name}}
                <span>{{item.alias[0]}}</span>
              </div>
              <div class="albums-time">
                <span>{{item.artist.name}}</span>
                <span class="time">{{item.publishTime | transformTime}}</span>
              </div>
            </div>
          </li>
          <li class="more" v-if="albums.moreText">
            <span @click="onClick(3)">{{albums.moreText}}</span>
            <i class="icon-right"></i>
          </li>
          <li class="more" v-else>暂无更多</li>
        </ul>
      </div>
      <!-- 主题电台 -->
      <div class="search-result-dj" v-if="djRadio.djRadios">
        <div class="se-title">电台</div>
        <ul class="dj-container">
          <li class="dj-item" v-for="item in djRadio.djRadios" :key="item.id">
            <div class="dj-cover">
              <img :src="item.picUrl" alt />
            </div>
            <div class="dj-title">
              <div class="dj-name">{{item.name}}</div>
              <div class="dj-time">
                <span>{{item.dj.nickname}}</span>
              </div>
            </div>
          </li>
          <li class="more" v-if="djRadio.moreText">
            <span @click="onClick(6)">{{djRadio.moreText}}</span>
            <i class="icon-right"></i>
          </li>
          <li class="more" v-else>暂无更多</li>
        </ul>
      </div>
      <!-- 用户 -->
      <div class="search-result-user" v-if="userprofile.users">
        <div class="se-title">用户</div>
        <ul class="user-container">
          <li class="user-item" v-for="item in userprofile.users" :key="item.userId">
            <div class="user-left">
              <div class="user-cover">
                <img :src="item.avatarUrl" alt />
              </div>
              <div class="user-name">
                <div class="username">{{item.nickname}}</div>
                <div class="user-jieshao">{{item.signature}}</div>
              </div>
            </div>
          </li>
          <li class="more" v-if="userprofile.moreText">
            <span @click="onClick(7)">{{userprofile.moreText}}</span>
            <i class="icon-right"></i>
          </li>
          <li class="more" v-else>暂无更多</li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { search, searchMultimatch } from '@/api/search'
import eventBus from '@/utils/eventBus'
export default {
  name: 'composite',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isShow: true,
      albumList: [],
      artistList: [],
      // 搜索结果
      songs: [], // 单曲
      artists: {}, // 歌手
      albums: {}, // 专辑
      videos: {}, // 视频
      mvs: {}, // MV
      djRadio: {}, // 主播电台
      userprofile: {}, // 用户
      simQuery: {}, // 相关搜索
      song: {},
      // 多重匹配
      album: [], // 专辑
      artist: [] // 歌手
    }
  },
  components: {},
  watch: {
    name (val) {
      this.onSearch()
      this.getSearchAll()
    },
    // 动态组件传参不能及时更新数据，会获取动空值
    // 在watch监听传过来的数据，并且赋值到data中
    songs (val, oldVal) {
      this.songsList = val
    },
    album (val) {
      if (!val) {
        this.albumList = []
        return
      }
      this.albumList = val
    },
    artist (val) {
      if (!val) {
        this.artistList = []
        return
      }
      this.artistList = val
    }
  },
  filters: {},
  methods: {
    onKeyword (item) {
      this.$emit('onKeyword', item)
      this.onSearch()
    },
    onClick (i) {
      this.$emit('onClick', i)
    },
    ...mapMutations({
      setPlayList: 'setPlayList'
    }),
    // 播放全部
    onPlayAll () {
      this.setPlayList(this.songs)
      this.$router.push('/play')
      eventBus.$emit('play')
    },
    // 播放单曲
    goPlay (item) {
      this.$router.push('/play')
      this.setPlayList([item])
      eventBus.$emit('play', item.id)
    },
    // 搜索
    async onSearch () {
      this.isShow = true
      var songs = []
      var obj = {}
      var album = {} // 专辑
      var arr = []
      var artists = {} // 艺术家
      try {
        const { data } = await search({ value: this.name, type: 1018 })
        this.videos = data.result.video ? data.result.video : {}
        this.artists = data.result.artist ? data.result.artist : {}
        this.albums = data.result.album ? data.result.album : {}
        this.djRadio = data.result.djRadio ? data.result.djRadio : {}
        this.simQuery = data.result.sim_query ? data.result.sim_query : {}
        this.userprofile = data.result.user ? data.result.user : {}
        this.song = data.result.song ? data.result.song : {}
        data.result.song.songs.forEach(item => {
          obj.id = item.id
          obj.name = item.name
          // 专辑
          album.name = item.al.name
          album.id = item.al.id
          obj.album = album
          // 艺术家
          item.ar.forEach(item2 => {
            artists.id = item2.id
            artists.name = item2.name
            artists.img = item2.picUrl
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
        this.isShow = false
      } catch (error) {
        this.$toast.fail('加载失败')
      }
    },
    // 多重匹配
    async getSearchAll () {
      const { data } = await searchMultimatch(this.name)
      this.album = data.result.album
      this.artist = data.result.artist
    }
  },
  created () {
    this.onSearch()
    this.getSearchAll()
  },
  mounted () {},
  computed: {},
  beforeMount () {
    // 每次进入都会执行
  },
  activated () {},
  beforeCreate () {
    console.log('渲染')
  }
}
</script>

<style scoped lang="less">
.loaders {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  .loads {
    font-size: 12px;
    color: #666;
  }
}
.interest {
  font-size: 13px;
  padding: 5px;
  & > p {
    padding: 5px;
  }
}
.se-title {
  padding: 10px;
  font-size: 16px;
  font-weight: 600;
}
// 视频
.video-container {
  padding: 0 10px;
  .video-item {
    margin: 8px 0;
    display: flex;
    align-items: center;
    .video-cover {
      position: relative;
      border-radius: 8px;
      overflow: hidden;
      flex: 0 0 auto;
      width: 120px;
      height: 70px;
      img {
        min-width: 120px;
        min-height: 70px;
        object-fit: cover;
      }
      .amount {
        color: #fff;
        display: flex;
        align-items: center;
        font-size: 12px;
        position: absolute;
        top: 5px;
        right: 10px;
        i {
          font-size: 12px;
        }
      }
      img {
        width: 100%;
      }
    }
    .video-title {
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      .video-name {
        font-size: 14px;
        padding: 2px 0;
        i {
          color: red;
        }
      }
      .video-xinxi {
        padding: 2px 0;
        font-weight: 200;
        font-size: 12px;
        color: rgb(161, 161, 161);
      }
    }
  }
}
// 相关搜索
.query-container {
  display: flex;
  flex-wrap: wrap;
  span {
    flex: 0 0 auto;
    border-radius: 20px;
    font-size: 12px;
    background-color: #f2f2f2;
    padding: 5px 8px;
    margin: 10px;
  }
}
// 歌手 用户
.artist-container,
.user-container {
  padding: 0 10px;
  .artist-item,
  .user-item {
    margin: 5px 0;
    display: flex;
    justify-content: space-between;
    .artist-left,
    .user-left {
      display: flex;
      align-items: center;
      .artist-cover,
      .user-cover {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        img {
          min-width: 60px;
          min-height: 60px;
          object-fit: cover;
        }
      }
      .artist-name,
      .user-name {
        font-size: 14px;
        margin-left: 10px;
        .user-jieshao {
          font-size: 12px;
          color: #666;
        }
      }
    }
    .artist-ruzhu {
      font-size: 12px;
      display: flex;
      align-items: center;
      margin-right: 10px;
      color: #b9b9b9;
    }
    .user-attention {
      font-size: 12px;
      display: flex;
      align-items: center;
      margin-right: 10px;
      color: #b9b9b9;
    }
  }
}
// 专辑 电台
.albums-container,
.dj-container {
  padding: 0 10px;
  .albums-item,
  .dj-item {
    margin: 5px 0;
    display: flex;
    align-items: center;
    .albums-cover,
    .dj-cover {
      width: 60px;
      height: 60px;
      position: relative;
      img {
        border-radius: 5px;
        overflow: hidden;
        min-width: 60px;
        min-height: 60px;
        object-fit: cover;
      }
    }
    .albums-title,
    .dj-title {
      margin-left: 15px;
      .albums-name,
      .dj-name {
        font-size: 16px;
        span {
          color: #999;
        }
      }
      .albums-time,
      .dj-time {
        padding: 3px 0;
        font-size: 12px;
        color: #666;
        .time {
          margin-left: 8px;
        }
      }
    }
  }
}
// 单曲
.search-result {
  margin-top: 10px;
  .single-nav {
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    /deep/ .van-button {
      font-weight: 300;
      padding: 0 8px;
      border-radius: 10px;
    }
  }
  .search-result-container {
    padding: 10px 0;
    li {
      width: 98vw;
      box-sizing: border-box;
      padding: 5px 10px;
      border-top: 1px solid #f7f7f7;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        .title {
          font-size: 14px;
          width: 80vw;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .singer {
          display: flex;
          align-items: center;
          i {
            margin-right: 3px;
          }
          span {
            font-size: 12px;
            margin-right: 3px;
          }
        }
      }
      .right {
        padding-right: 5px;
        display: flex;
        align-items: center;
        .shipin {
          font-stretch: expanded;
          margin-right: 18px;
        }
      }
    }
    .songs-all {
      padding: 10px 0;
      border-bottom: none;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      color: #666;
      i {
        color: #666;
        font-size: 13px;
        margin-left: 5px;
      }
    }
  }
}
.interest-item {
  .singer,
  .album {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
    }
  }
  .singer-img,
  .album-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin: 5px 10px;
  }
  .album-info,
  .singer-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .singer-name,
    .album-name {
      font-size: 14px;
    }
    .singer-xingmign {
      color: #0fbcf9;
    }
    .singer-xinxi,
    .album-xinxi {
      font-size: 12px;
      color: #666;
      span {
        margin-right: 5px;
      }
    }
  }
  .album-img {
    overflow: unset;
    border-radius: 10px;
    position: relative;
    img {
      border-radius: 8px;
    }
  }
}
.album-bg {
  width: 26px;
  height: 26px;
  background-color: #000;
  background: linear-gradient(to top, #000, #414141);
  border-radius: 50%;
  position: absolute;
  z-index: -1;
  top: 50%;
  margin-top: -13px;
  right: -6px;
}
.more {
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  padding: 10px;
  span {
    color: #666;
    font-size: 12px;
  }
  i {
    font-size: 12px;
  }
}
</style>
