<template>
  <div class="detection">
    <van-nav-bar :border="false">
      <i slot="left" class="icon-tinggeshiqu40x40"></i>
      <div slot="title" class="search-btn">
        <div class="content" @click="$router.push('/search')">
          <i class="icon-fangdajing01 text"></i>大家都在搜 怎么能忘了
        </div>
      </div>
      <div v-if="currentMusic" slot="right" class="slot-right" @click="$router.push('/play')">
        <van-circle
          layer-color="#ebedf0"
          color="#F23832"
          v-model="currentRate"
          :rate="maxTime"
          :stroke-width="60"
        >
          <div slot="default" class="now-playing animation">
            <img :src="artists.picUrl" />
          </div>
        </van-circle>
      </div>
    </van-nav-bar>
    <!-- weiper -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in banners" :key="index" @click="onBanner(item)">
        <img :src="item.imageUrl" />
      </van-swipe-item>
    </van-swipe>
    <!-- nav -->
    <van-grid :border="false" column-num="5">
      <van-grid-item @click="onNavs(1)" icon="photo-o" text="每日推荐">
        <div slot="icon" class="slot-icon">
          <div class="slot-icon-item icon-rili"></div>
        </div>
      </van-grid-item>
      <van-grid-item @click="onNavs(2)" icon="photo-o" text="歌单">
        <div slot="icon" class="slot-icon">
          <div class="slot-icon-item icon-gedan1"></div>
        </div>
      </van-grid-item>
      <van-grid-item @click="onNavs(3)" icon="photo-o" text="排行榜">
        <div slot="icon" class="slot-icon">
          <div class="slot-icon-item icon-paihang"></div>
        </div>
      </van-grid-item>
      <van-grid-item @click="onNavs(4)" icon="photo-o" text="电台">
        <div slot="icon" class="slot-icon">
          <div class="slot-icon-item icon-diantai"></div>
        </div>
      </van-grid-item>
      <van-grid-item @click="onNavs(5)" icon="photo-o" text="直播">
        <div slot="icon" class="slot-icon">
          <div class="slot-icon-item icon-zhibo1"></div>
        </div>
      </van-grid-item>
    </van-grid>
    <!-- -----=================------------------------------- -->
    <!-- 为你精挑细选 -->
    <div class="recommend">
      <p>推荐歌单</p>
      <div class="recommend-2">
        <span>为你精挑细选</span>
        <van-button size="mini" class="btn-more" @click="onSongsSquare">查看更多</van-button>
      </div>
    </div>
    <!-- 内容 -->
    <div class="wrapper">
      <ul class="content">
        <li v-for="item in recommend" :key="item.id" @click="onSongList(item)">
          <div class="logo">
            <div class="play-count">
              <i class="icon-bofang">{{item.playCount | changeNumber}}</i>
            </div>
            <img :src="item.picUrl" alt />
          </div>
          <div class="title">
            <p>{{item.name}}</p>
          </div>
        </li>
      </ul>
    </div>
    <!-- /推荐歌单 -->
    <!-- -----=================------------------------------- -->
    <!-- 英语推荐 -->
    <div class="recommend">
      <p>风格推荐</p>
      <div class="recommend-2">
        <span>英语精选</span>
        <van-button size="mini" class="btn-more">
          <i class="icon-bofang1"></i> 播放全部
        </van-button>
      </div>
    </div>
    <!-- 内容 -->
    <van-swipe class="my-swipe1" :show-indicators="false" :loop="false">
      <van-swipe-item v-for="item in 5" :key="item">
        <ul class="content-item">
          <li v-for="item in 3" :key="item" class="item">
            <div class="logo">
              <img src="../../assets/img/logo.png" alt />
            </div>
            <div class="title">
              <div class="title-name">
                123
                <span>abc</span>
              </div>
              <div class="title-legend">
                <i class="icon-sq"></i> 12341
              </div>
            </div>
            <div class="play-btn">
              <i class="icon-bofang1"></i>
            </div>
          </li>
        </ul>
      </van-swipe-item>
    </van-swipe>
    <!-- /风格推荐 -->
    <!-- -----=================------------------------------- -->
    <!-- 每日推荐 -->
    <template>
      <div class="recommend">
        <p>每日精选</p>
        <div class="recommend-2">
          <span>今日热点</span>
          <!-- <van-button size="mini" class="btn-more">
          <i class="icon-bofang1"></i> 播放全部
          </van-button>-->
        </div>
      </div>
      <!-- 列表 -->
      <div class="hot-list">
        <ul class="content-item">
          <li class="item" v-for="item in dailyList" :key="item.id">
            <div class="logo">
              <img :src="item.album.picUrl" alt />
            </div>
            <div class="title">
              <div class="title-name">
                {{item.name}}
                <span>- {{item.artists[0].name}}</span>
              </div>
              <div class="title-legend">
                <i class="icon-sq"></i>
                {{item.album.company}}
              </div>
            </div>
            <div class="play-btn">
              <i class="icon-bofang1" @click="onPlay(item)"></i>
            </div>
          </li>
        </ul>
      </div>
    </template>
    <!-- /热门歌曲 -->
    <!-- -----=================------------------------------- -->
  </div>
</template>

<script>
import { banner } from '@/api/banner'
import {
  newSongs,
  personalized,
  topSong,
  topList,
  recommend
} from '@/api/song'
// import { djprogram, djUrl } from '@/api/dj'
import eventBus from '@/utils/eventBus'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'detection',
  props: {},
  data () {
    return {
      banners: [1, 2],
      recommend: [],
      dailyList: [],
      alImg: ''
    }
  },
  components: {},
  watch: {},
  filters: {},
  methods: {
    ...mapMutations({
      setPlayList: 'setPlayList'
    }),
    // 播放
    onPlay (item) {
      console.log(item)
      // this.$router.push('/play')
      this.setPlayList([item])
      eventBus.$emit('play', item.id)
    },
    // 每日推荐(需要登录)
    async getResource () {
      const { data } = await recommend()
      this.dailyList = data.data.dailySongs
    },
    // 排行榜
    async getTopList () {
      const { data } = await topList({ idx: 1 })
      console.log('排行榜', data)
    },
    // 新歌速递
    async getTopSong () {
      const { data } = await topSong({ type: 7 })
      console.log('新歌速递', data)
    },
    // // 获取电台地址
    // async getDjUrl (id) {
    //   const { data } = await djUrl({ id })
    //   console.log(data)
    // },
    // // 获取推荐电台
    // async getDjprogram () {
    //   const { data } = await djprogram()
    //   console.log(data.result)
    //   this.getDjUrl(data.result[0].id)
    // },
    // 歌单广告
    onSongsSquare () {
      console.log('歌单广场')
      this.$router.push('/songslistsquare')
    },
    onSongList (item) {
      this.$router.push(`/songlist/${item.id}`)
    },
    // 轮播图
    onBanner (item) {
      console.log(item.targetId)
    },
    // 导航
    onNavs (id) {
      if (id === 1) {
        console.log('每日推荐')
      } else if (id === 2) {
        console.log('歌单广场')
      } else if (id === 3) {
        console.log('排行')
      } else if (id === 4) {
        console.log('电台')
      } else if (id === 5) {
        console.log('直播')
      }
    },
    // banner轮播
    async getBanner () {
      const { data } = await banner()
      this.banners = data.banners
    },
    // 推荐歌单-为你精挑细选
    async getPersonalized () {
      const { data } = await personalized(30)
      this.recommend = data.result
    },
    async getNewSong () {
      const { data } = await newSongs()
      console.log('推荐新音乐', data)
    }
  },
  created () {
    this.getBanner()
    this.getPersonalized()
    this.getNewSong()
    this.getTopSong()
    this.getTopList()
    this.getResource()
    // this.getDjprogram()
  },
  mounted () {},
  computed: {
    ...mapGetters(['artists', 'currentMusic', 'maxTime', 'currentTime']),
    currentRate: {
      get () {
        return (this.currentTime / this.maxTime) * 100
      },
      set (val) {}
    }
  }
}
</script>

<style scoped lang="less">
.detection {
  // background-color: #ccc;
  padding-top: 46px;
}
/deep/ .van-nav-bar {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  border: none;
}
.van-swipe {
  margin: 8px;
  border-radius: 4px;
}
.slot-icon {
  padding-bottom: 5px;
  .slot-icon-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background: linear-gradient(to right, #ff5150, #f23121);
    color: #fff;
    padding: 8px;
    border-radius: 50%;
    font-size: 20px;
  }
}
// 阴雨推荐
.my-swipe1 {
  // width: 90vw;
  /deep/ .van-swipe-item {
    // width: 350px !important;
  }
}

.recommend {
  padding: 0 10px;
  & > p {
    font-size: 12px;
    color: #c2c2c2;
  }
  .recommend-2 {
    display: flex;
    justify-content: space-between;
    & > span {
      font-size: 16px;
      font-weight: 600;
    }
    .btn-more {
      box-sizing: border-box;
      height: 24px;
      line-height: 24px;
      font-size: 12px;
      border-radius: 20px;
      padding: 0px 8px;
      i {
        font-size: 12px;
      }
    }
  }
}

.wrapper {
  display: flex;
  margin-top: 10px;
  margin-bottom: 20px;
  box-sizing: border-box;
  padding: 0 10px;
  width: 100%;
  overflow: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
  .content {
    display: flex;
    flex-wrap: nowrap;
    overflow-y: scroll;
    // flex-shrink: 1;
    & > li {
      flex: 0 0 auto;
      width: 100px;
      // height: ;
      margin-right: 10px;
      .logo {
        border-radius: 5px;
        overflow: hidden;
        position: relative;
        img {
          width: 300px;
        }
        .play-count {
          position: absolute;
          top: 3px;
          right: 5px;
          display: flex;
          i {
            font-size: 12px;
            color: #f2f2f2;
          }
        }
      }
      .title {
        & > p {
          font-size: 12px;
          color: #646566;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      }
    }
  }
}
//
.item {
  margin: 5px 0;
  width: 90vw;
  display: flex;
  align-items: center;
  padding-right: 20px;
  .logo {
    margin-right: 5px;
    img {
      width: 50px;
    }
  }
  .title {
    font-size: 12px;
    flex: 80;
    .title-name {
      font-size: 13px;
      span {
        color: #666;
      }
    }
    .title-legend {
      display: flex;
      align-items: center;
      i {
        margin-right: 5px;
      }
    }
  }
  .play-btn {
    font-size: 12px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid #f3f3f3;
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      font-size: 12px;
      color: #f23121;
    }
  }
}
// nav-bar搜索
.search-btn {
  width: 100%;
  height: 46px;
  display: flex;
  align-items: center;
  .content {
    width: 100%;
    height: 30px;
    line-height: 30px;
    background-color: #f7f7f7;
    border-radius: 30px;
    font-size: 14px;
    color: #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    .text {
      margin-right: 5px;
      font-size: 16px;
      color: #888;
      font-weight: 600;
    }
  }
}
// 正在播放
.slot-right {
  position: relative;
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
.hot-list {
  padding: 0 10px;
  .content-item {
    .logo {
      border-radius: 5px;
      overflow: hidden;
      img {
      }
    }
  }
}
// 正在播放logo旋转
.animation {
  animation: myRotate 20s linear infinite;
}
</style>
