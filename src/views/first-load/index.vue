<template>
  <div class="first-load">
    <div class="logo">
      <span class="name">MackBai-制作</span>
      <img :src="img" class="logo" />
      <img :src="icon" class="icon" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FirstLoad',
  props: {},
  data () {
    return {
      img: require('@/assets/img/music.png'),
      icon: require('@/assets/img/icon-logo.png')
    }
  },
  components: {},
  watch: {},
  filters: {},
  methods: {},
  created () {},
  mounted () {},
  computed: {}
}
</script>

<style scoped lang="less">
.first-load {
  width: 100vw;
  height: 100vh;
  background-color: #d82d28;
  position: relative;
  .logo {
    width: 100vw;
    height: 100vh;
    .name {
        font-size: 12px;
        font-weight: 200;
        color: #fff;
        position: absolute;
        left: 50%;
        transform: translateX(-40%);
        bottom: 30px;
    }
    .logo {
      width: 64vw;
      height: auto;
      position: absolute;
      top: 30%;
      left: 50%;
      margin-left: -32vw;
    }
    .icon {
      width: 100px;
      height: auto;
      position: absolute;
      bottom: 5px;
      left: 50%;
      margin-left: -50px;
    }
  }
}
</style>
