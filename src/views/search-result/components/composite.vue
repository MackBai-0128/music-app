<template>
  <div class="composite">
    <!-- 你可能感兴趣 -->
    <div class="interest" v-if="albumList.length || artistList.length">
      <!--  -->
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
    <!-- 搜索结果 -->
    <div class="search-result">
      <div class="single-nav">
        <div>单曲</div>
        <van-button type="default" size="mini" @click="onPlayAll">播放全部</van-button>
      </div>
      <ul class="search-result-container">
        <li v-for="item in songsList" :key="item.id" @click="goPlay(item)">
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
        <li class="songs-all" @click="viewAllSongs">
          查看全部单曲
          <i class="icon-right"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import eventBus from '@/utils/eventBus'
export default {
  name: 'composite',
  props: {
    songs: {
      type: Array,
      required: true
    },
    album: {
      type: Array
    },
    artist: {
      type: Array
    }
  },
  data () {
    return {
      songsList: [],
      albumList: [],
      artistList: []
    }
  },
  components: {},
  watch: {
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
  filters: {
    changeNumber (val) {
      if (!val) {
        return
      }
      var newVal = val.toString()
      if (val > 9999) {
        newVal = newVal
          .split('')
          .reverse()
          .slice(4)
          .reverse()
          .join('')
        newVal = newVal + '万'
      }
      return newVal
    }
  },
  methods: {
    // 查看全部歌曲
    viewAllSongs () {
      console.log('viewAllSongs')
    },
    // 播放全部
    onPlayAll () {
      this.$store.commit('setPlayList', this.songsList)
      this.$router.push('/play')
      eventBus.$emit('play')
    },
    // 播放单曲
    goPlay (item) {
      this.$router.push('/play')
      this.$store.commit('setPlayList', [item])
      eventBus.$emit('play', item.id)
    },
    getSongs () {}
  },
  created () {},
  mounted () {
  },
  computed: {}
}
</script>

<style scoped lang="less">
.interest {
  font-size: 13px;
  padding: 5px;
  & > p {
    padding: 5px;
  }
}
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
  }
}
</style>
