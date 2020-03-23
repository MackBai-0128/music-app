<template>
  <div class="song-list-square">
    <van-nav-bar :border="false">
      <i slot="left" class="icon-back" @click="$router.back()"></i>
      <div slot="title" class="search-btn"></div>
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'songListSquare',
  props: {},
  data () {
    return {}
  },
  components: {},
  watch: {},
  filters: {},
  methods: {},
  created () {},
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
.song-list-square{
  height: 100vh;
  padding: 46px 0;
  box-sizing: border-box;
  background-color: #ccc;
}
/deep/ .van-nav-bar {
  opacity: 0.8;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  border: none;
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
// 正在播放logo旋转
.animation {
  animation: myRotate 20s linear infinite;
}
</style>
