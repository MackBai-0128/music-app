<template>
  <div class="tabBar">
    <router-view />
    <van-tabbar route active-color="#FA2A2F" v-model="active" :border="false" class="tabbar">
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
      active: 0
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
.tabBar{
  padding-bottom: 56px;
}
.active {
  color: #fff !important;
  box-sizing: border-box;
  border-radius: 50%;
  padding: 4px;
  background: linear-gradient(to right, #ff5150, #f23121);
}
.tabbar{
  padding-top: 5px;
  box-sizing: border-box;
  position: fixed;
  bottom: -1px;
  background-color: rgba(247, 247, 247, 0.98);
  /deep/ .van-tabbar-item{
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  /deep/ .van-tabbar-item__icon{
    width: 20px;
    height: 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
