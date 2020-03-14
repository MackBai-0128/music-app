<template>
  <div class="tabBar">
    <router-view />
    <van-tabbar route active-color="#FA2A2F" v-model="active">
      <van-tabbar-item to="/">
        <i slot="icon" class="icon-wangyiyunyinlezizhi-copy" :class="active===0?'active':''"></i>发现
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon" class="icon-shipin" :class="active===1?'active': ''"></i>视频
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i slot="icon" class="icon-yinyue" :class="active===2?'active': ''"></i>我的
      </van-tabbar-item>
      <van-tabbar-item to="/group">
        <i slot="icon" class="icon-qun" :class="active===3?'active': ''"></i>云村
      </van-tabbar-item>
      <van-tabbar-item to="/account">
        <i slot="icon" class="icon-zhanghao" :class="active===4?'active': ''"></i>账号
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'tabBar',
  props: {},
  data () {
    return {
      active: ''
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
.active {
  color: #fff;
  box-sizing: border-box;
  border-radius: 50%;
  padding: 4px;
  background: linear-gradient(to right, #ff5150, #f23121);
}
</style>
