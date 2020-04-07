<template>
  <div class="my">
    <van-nav-bar :border="false">
      <i slot="left" class="icon-jingyunyinxiaopt"></i>
      <div slot="title" class="search-btn">
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'my',
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
.van-nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to left, #6f6f6f, #959394);
}
.icon-jingyunyinxiaopt {
  color: #fff;
}

.hot-list {
  padding: 0 10px;
}
</style>
