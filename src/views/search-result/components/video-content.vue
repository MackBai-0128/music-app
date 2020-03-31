<template>
  <div class="video-content">
    <div class="loaders" v-if="isShow">
      <vue-loaders-line-scale name="ball-beat" color="#F94949" scale="0.7" />
      <span class="loads">正在加载...</span>
    </div>
    <!-- 视频 -->
    <div class="search-result-video">
      <ul class="video-container">
        <li class="video-item" v-for="item in videos" :key="item.vid">
          <div class="video-cover">
            <div class="amount">
              <i class="icon-bofang"></i>
              <span>{{item.playTime | changeNumber}}</span>
            </div>
            <img :src="item.coverUrl" alt />
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
      </ul>
    </div>
  </div>
</template>

<script>
import { search } from '@/api/search'
export default {
  name: 'VideoContent',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      videos: [],
      isShow: false
    }
  },
  components: {},
  watch: {},
  filters: {},
  methods: {
    async getVideo () {
      this.isShow = true
      const { data } = await search({ value: this.name, type: 1014 })
      this.videos = data.result.videos
      this.isShow = false
    }
  },
  created () {
    this.getVideo()
  },
  mounted () {},
  computed: {},
  beforeMount () {},
  activated () {},
  deactivated () {}
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
</style>
