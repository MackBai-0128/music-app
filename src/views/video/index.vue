<template>
  <div class="videoPage">
    <van-nav-bar :border="false">
      <i slot="left" class="icon-zhibo"></i>
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
    <!-- <swiper class="swiper" :options="swiperOption">
      <swiper-slide>Slide 1</swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
      <swiper-slide>Slide 4</swiper-slide>
      <swiper-slide>Slide 5</swiper-slide>
      <swiper-slide>Slide 6</swiper-slide>
      <swiper-slide>Slide 7</swiper-slide>
    </swiper>-->
    <div class="recommend-list">
      <!-- <div class>推荐</div> -->
      <!-- <ul class="mv-container">
        <li class="mv-item" v-for="(item,index) in mvList" :key="item.id" @click="onShow(index)">
          <div class="mv-video">
            <div class="icon">
              <i
                v-show="pauseBtn"
                class="icon-bofang-bar"
                v-if="showIndex === index"
                @click.stop="onPause(index)"
              ></i>
              <i class="icon-bofang1" v-else @click.stop="onPlayMv(item.id,index)"></i>
            </div>
            <video style="display:neno" class="videoElm" @ended="onEnded(item.id,index)"></video>
            <img :src="item.picUrl" />
          </div>
          <div class="mv-text">
            <div class="text">{{item.name}}</div>
            <div class="user-info">
              <div class="artist-name">
                <div class="cover">
                  <img :src="item.picUrl" alt />
                </div>
                <p>{{item.artistName}}</p>
              </div>
              <div class="playCount">{{item.playCount+' 次观看'}}</div>
            </div>
          </div>
        </li>
      </ul>-->
      <div class="new-mv">最新MV</div>
      <ul class="mv-container">
        <li class="mv-item" v-for="(item,index) in newMvList" :key="item.id" @click="onShow(index)">
          <div class="mv-video">
            <div class="icon">
              <i
                v-show="pauseBtn"
                class="icon-bofang-bar"
                v-if="showIndex === index"
                @click.stop="onPause(index)"
              ></i>
              <i class="icon-bofang1" v-else @click.stop="onPlayMv(item.id,index)"></i>
            </div>
            <video style="display:neno" class="videoElm" @ended="onEnded(item.id,index)"></video>
            <img :src="item.cover" />
          </div>
          <div class="mv-text">
            <div class="text">{{item.name}}</div>
            <div class="user-info">
              <div class="artist-name">
                <div class="cover">
                  <img :src="item.cover" alt />
                </div>
                <p>{{item.artistName}}</p>
              </div>
              <div class="playCount">{{item.playCount+' 次观看'}}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import eventBus from '@/utils/eventBus'
import { recommendMv, mvUrl, newMv } from '@/api/mv'
// import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'videoPage',
  props: {},
  data () {
    return {
      // 轮播图配置项
      swiperOption: {
        loop: true,
        effect: 'coverflow',
        grabCursor: false,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        },
        pagination: {
          el: '.swiper-pagination'
        }
      },
      mvList: [],
      newMvList: [],
      showIndex: null,
      video: 'video',
      pauseBtn: true,
      time: null
    }
  },
  components: {
    // swiper,
    // swiperSlide
  },
  watch: {},
  filters: {},
  methods: {
    // 暂停按钮隐藏
    onShow (index) {
      clearTimeout(this.time)
      this.pauseBtn = true
      this.time = setTimeout(() => {
        this.pauseBtn = false
      }, 3000)
    },
    // 暂停
    onPause (i) {
      var vio = document.querySelectorAll('.videoElm')
      vio[i].pause()
      this.showIndex = null
    },
    // 播放结束
    onEnded (index) {
      console.log('播放结束', index)
      this.showIndex = null
    },
    // 播放/暂停
    async onPlayMv (id, i) {
      eventBus.$emit('onVideo')
      clearTimeout(this.time)
      this.pauseBtn = true
      this.showIndex = i
      var vio = document.querySelectorAll('.videoElm')
      // 判断播放状态
      if (!vio[i].src) {
        const { data } = await mvUrl({ id })
        vio[i].setAttribute('src', data.data.url)
        vio[i].play()
      } else {
        if (vio[i].paused) {
          vio[i].play()
        } else {
          vio[i].pause()
        }
      }
      // 播放当前暂停其他
      for (let j = 0; j < vio.length; j++) {
        if (i !== j) {
          vio[j].pause()
        }
      }
      this.time = setTimeout(() => {
        this.pauseBtn = false
      }, 3000)
    },
    // 获取推荐mv列表
    async getrecommendMv () {
      const { data } = await recommendMv()
      this.mvList = data.result
    },
    // 获取最新mv
    async getNewMv () {
      const { data } = await newMv({ limit: 30 })
      this.newMvList = data.data
    },
    // 获取mv地址
    async getMvUrl (id) {
      const { data } = await mvUrl({ id })
      console.log(data)
    }
  },
  created () {
    this.getrecommendMv()
    this.getNewMv()
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
  },
  beforeRouteLeave (to, from, next) {
    this.pauseBtn = true
    this.showIndex = null
    next()
  }
}
</script>

<style scoped lang="less">
.videoPage {
  padding-top: 46px;
  height: 100vh;
  overflow: scroll;
  background-color: #f5f5f1;
}
.recommend-list {
  .new-mv {
    padding: 0 10px;
    background-color: #fff;
    font-size: 18px;
  }
  .mv-container {
    .mv-item {
      position: relative;
      padding: 10px;
      box-sizing: border-box;
      width: 100vw;
      margin-bottom: 8px;
      background-color: #fff;
      .mv-video {
        height: 200px;
        overflow: hidden;
        position: relative;
        border-radius: 10px;
        overflow: hidden;
        .icon {
          position: absolute;
          z-index: 1;
          top: 50%;
          left: 50%;
          width: 50px;
          height: 50px;
          margin-left: -25px;
          margin-top: -25px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          i {
            font-size: 26px;
            color: #fff;
          }
        }
        .videoElm {
          width: 100%;
          height: 100%;
          z-index: 0;
          position: absolute;
        }
      }
      .mv-text {
        color: #666;
        font-size: 14px;
        .text {
          font-weight: bold;
          padding: 5px 0;
        }
        .user-info {
          padding-top: 5px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid #f1f1f1;
          .artist-name {
            display: flex;
            align-items: center;
            .cover {
              border-radius: 50%;
              overflow: hidden;
              width: 30px;
              height: 30px;
              margin-right: 8px;
              img {
                min-width: 30px;
                min-height: 30px;
                object-fit: cover;
              }
            }
          }
          .playCount {
            font-size: 12px;
            color: #ccc;
          }
        }
      }
    }
  }
}
.swiper {
  height: 100%;
  width: 100%;
  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 200px;
    text-align: center;
    font-weight: bold;
    background-color: #2c8dfb;
    background-position: center;
    background-size: cover;
    color: white;
  }
  // .swiper-pagination {
  //   /deep/ .swiper-pagination-bullet.swiper-pagination-bullet-active {
  //     background-color: white;
  //     display: none;
  //   }
  // }
}
/deep/ .van-nav-bar {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  border: none;
  z-index: 999;
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
// 正在播放logo旋转
.animation {
  animation: myRotate 20s linear infinite;
}
</style>
