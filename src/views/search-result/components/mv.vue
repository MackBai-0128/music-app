<template>
  <div class="mv">
    <div class="loaders" v-if="isShow">
      <vue-loaders-line-scale name="ball-beat" color="#F94949" scale="0.7" />
      <span class="loads">正在加载...</span>
    </div>

    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getMv">
      <li class="mv-item" v-for="(item,index) in mvList" :key="index">
        <div class="mv-video" @click="onShow(index)">
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
    </van-list>
  </div>
</template>

<script>
import { search } from '@/api/search'
import { mvUrl } from '@/api/mv'
import { mapGetters } from 'vuex'
import eventBus from '@/utils/eventBus'
export default {
  name: 'mv',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      finished: false,
      isShow: true,
      mvList: [],
      showIndex: null,
      video: 'video',
      pauseBtn: true,
      time: null,
      offset: 0
    }
  },
  components: {},
  watch: {},
  filters: {},
  methods: {
    async getMv () {
      try {
        const { data } = await search({
          value: this.name,
          amount: 6,
          offset: this.offset++,
          type: 1004
        })
        this.mvList.push(...data.result.mvs)
        this.isShow = false
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.mvList.length >= data.result.mvCount) {
          this.finished = true
        }
      } catch (error) {
        this.isShow = false
        this.finished = true
      }
    },
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
    // 获取mv地址
    async getMvUrl (id) {
      const { data } = await mvUrl({ id })
      console.log(data)
    }
  },
  created () {
    this.getMv()
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
  },
  beforeMount () {}
}
</script>

<style scoped lang="less">
.mv {
  background-color: rgb(247, 247, 247);
}

// .recommend-list {
//   .new-mv {
//     padding: 0 10px;
//     background-color: #fff;
//     font-size: 18px;
//   }
//   .mv-container {
.mv-item {
  list-style: none;
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
// }
// }
</style>
