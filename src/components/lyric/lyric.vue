<template>
  <div>
    <!--歌词-->
    <div ref="musicLyric" class="music-lyric">
      <div class="music-lyric-items" :style="lyricTop">
        <p v-if="nolyric">暂无歌词！</p>
        <template v-else-if="lyric.length>0">
          <p
            v-for="(item,index) in lyric"
            :key="index"
            :class="{on:lyricIndex===index}"
          >{{ item.txt }}</p>
        </template>
        <p v-else>歌词加载失败！</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Lyric',
  props: {
    // 歌词数据
    lyric: {
      type: Array,
      default: () => []
    },
    // 是否无歌词
    nolyric: {
      type: Boolean,
      default: false
    },
    // 当前歌词下标
    lyricIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      top: 0 // 歌词居中
    }
  },
  computed: {
    lyricTop () {
      return `transform :translate3d(0, ${-34 *
        (this.lyricIndex - this.top)}px, 0)`
    }
  },
  mounted () {
    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimer)
      this.resizeTimer = setTimeout(() => this.clacTop(), 60)
    })
    this.$nextTick(() => this.clacTop())
  },
  methods: {
    // 计算歌词居中的 top值
    clacTop () {
      const dom = this.$refs.musicLyric
      const { display = '' } = window.getComputedStyle(dom)
      if (display === 'none') {
        return
      }
      const height = dom.offsetHeight
      this.top = Math.floor(height / 34 / 2)
    }
  }
}
</script>

<style lang="less" scoped>
.music-lyric {
  height: 62vh;
  position: absolute;
  top: 46px;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  text-align: center;
  color: rgb(238, 238, 238);
  -webkit-mask-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.6) 15%,
    rgba(255, 255, 255, 1) 25%,
    rgba(255, 255, 255, 1) 75%,
    rgba(255, 255, 255, 0.6) 85%,
    rgba(255, 255, 255, 0) 100%
  );
  .music-lyric-items {
    text-align: center;
    line-height: 34px;
    font-size: 13px;
    transform: translate3d(0, 0, 0);
    transition: transform 0.6s ease-out;
    .on {
      color: rgb(255, 217, 0);
    }
  }
}
</style>
