<template>
  <div class="videoPage">
    <van-nav-bar left-arrow></van-nav-bar>
     <swiper class="swiper" :options="swiperOption">
      <swiper-slide>Slide 1</swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
      <swiper-slide>Slide 4</swiper-slide>
      <swiper-slide>Slide 5</swiper-slide>
      <swiper-slide>Slide 6</swiper-slide>
      <swiper-slide>Slide 7</swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'videoPage',
  props: {},
  data () {
    return {
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
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  watch: {},
  filters: {},
  methods: {},
  created () {},
  mounted () {},
  computed: {}
}
</script>

<style scoped lang="less">
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
      background-color: #2C8DFB;
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
</style>
