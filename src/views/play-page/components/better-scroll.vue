<template>
  <div class>
    <div class="wrapper" ref="wrapper">
      <ul class="content">
        <li
          v-for="(item,index) in lrc"
          :key="index"
          :style="{'color':$store.state.currentTime*1000>item.time?'#fff':'#ccc'}"
        >{{item.txt}}</li>
      </ul>
      <!-- 这里可以放一些其它的 DOM，但不会影响滚动 -->
    </div>
  </div>
</template>

<script>
// import lyrics from './better-scroll'
// import BScroll from '@better-scroll/core'
export default {
  name: '',
  props: {
    lrc: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      lrcs: [],
      goods: [],
      listHeight: [],
      scrollY: 0
    }
  },
  components: {},
  watch: {
    lrc (val) {
      console.log(val)
      this.lrcs = val
    }
  },
  filters: {},
  methods: {
    // scroll () {
    //   const dom = document.querySelector('.wrapper')
    //   lyrics.lyticsEnd(dom)
    //   lyrics.parse(this.lrcs, dom) // 解析歌词  this.lyrics 代表歌词数据
    //   lyrics.addcontent(dom) // 向元素容器中添加歌词内容
    //   lyrics.gundong(dom) // 歌词滚动函数
    // }
    // _lrcScroll () {
    //   // const dom = this.$refs.wrapper
    //   // const options = {
    //   //   click: true,
    //   //   scrollY: true,
    //   //   snap: {
    //   //     loop: true, // 开启循环播放
    //   //     stepX: 200, // 每页宽度为 200px
    //   //     stepY: 100, // 每页高度为 100px
    //   //     threshold: 0.3, // 滚动距离超过宽度/高度的 30% 时切换图片
    //   //     speed: 400 // 切换动画时长 400ms
    //   //   }
    //   // }
    //   this.menuScroll = new BScroll(this.$refs.wrapper, {
    //     click: true
    //   })
    //   this.foodsScroll = new BScroll(this.$refs.wrapper, {
    //     probeType: 3,
    //     click: true
    //   })
    //   this.foodsScroll.on('scroll', (pos) => {
    //     this.scrollY = Math.abs(Math.round(pos.y))
    //   })
    //   // this.lrcScroll = new BScroll(dom, options)
    // },
    // calculateHeight () {
    //   const goodsList = this.$refs.wrapper.getElementsByClassName('content')
    //   let height = 0
    //   this.listHeight.push(height)
    //   for (let i = 0; i < goodsList.length; i++) {
    //     const item = goodsList[i]
    //     height += item.clientHeight
    //     this.listHeight.push(height)
    //   }
    // }
  },
  created () {
    // this.$nextTick(() => {
    //   this._lrcScroll()
    //   this.calculateHeight()
    // })
  },
  mounted () {
    // this.scroll()
    // this._lrcScroll()
  },
  computed: {
    // currentIndex () {
    //   for (let i = 0; i < this.listHeight.length; i++) {
    //     const height1 = this.listHeight[i]
    //     const height2 = this.listHeight[i + 1]
    //     if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
    //       return i
    //     }
    //   }
    //   return 0
    // }
  }
}
</script>

<style scoped lang="less">
// 歌词
.wrapper {
  z-index: 999;
  position: absolute;
  left: 50%;
  top: 56vh;
  margin-left: -45vw;
  width: 90vw;
  height: 10vh;
  background-color: rgba(255, 0, 0, 0.24);
  overflow: hidden;
  // p {
  //   // width: 80vw;
  //   // font-size: 12px;
  //   // color: #ccc;
  // }
  .content {
    height: 100%;
    li {
      text-align: center;
      font-size: 14px;
    }
  }
}
</style>
