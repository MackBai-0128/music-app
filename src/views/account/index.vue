<template>
  <div class="account">
    <van-nav-bar :border="false">
      <i slot="left" class="icon-saoyisao1"></i>
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
    <div class="vip">
      <div class="kt-vip">开通黑胶VIP</div>
      <div class="sy-five-money">首页仅5元</div>
    </div>
    <div class="login">
      <div class="login-btn" v-if="!loginStatus">
        <p>手机电脑多端同步，尽享海量高品质音乐</p>
        <van-button
          size="small"
          round
          type="info"
          color="#FA2F26"
          @click="$router.push('/login')"
        >立即登录</van-button>
      </div>
      <div class="logged" v-else>
        <div class="user-info">
          <div class="user-cover">
            <img :src="profile.avatarUrl" alt />
          </div>
          <p>{{profile.nickname}}</p>
        </div>
        <div class="sign-out">
          <van-button size="small" type="default" color="#F13832" @click="onSignOut">退出登录</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { logout } from '@/api/login'
import { removeToken } from '@/utils/util'

export default {
  name: 'account',
  props: {},
  data () {
    return {}
  },
  components: {},
  watch: {},
  filters: {},
  methods: {
    // 退出登录
    async onSignOut () {
      await this.$dialog.confirm({
        message: '您确定要退出登录吗？'
      })
      const { data } = await logout()
      console.log(data)
      if (data.code === 200) {
        this.$toast('退出成功')
        removeToken('music-token')
      }
    },
    ...mapMutations({
      setMusicToken: 'setMusicToken'
    })
  },
  created () {},
  mounted () {},
  computed: {
    ...mapGetters(['loginStatus', 'artists', 'currentMusic', 'maxTime', 'currentTime', 'profile']),
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
.account {
  height: 91vh;
  box-sizing: border-box;
  overflow: hidden;
  background: linear-gradient(to left, #6f6f6f, #959394);
}
.van-nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to left, #6f6f6f, #959394);
}

.hot-list {
  padding: 0 10px;
}

.vip {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin: 0 auto;
  margin-top: 49px;
  width: 80vw;
  height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-sizing: border-box;
  background: linear-gradient(to left, #797979, #9f9d9e);
  .kt-vip {
    display: flex;
    align-items: center;
    font-weight: bold;
    background-image: -webkit-linear-gradient(left, #fcebe4, #f4dfdb, #d6bab2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    padding: 0 10px;
    flex: 1;
    border-bottom: 1px solid #9e9c9d;
  }
  .sy-five-money {
    display: flex;
    align-items: center;
    font-size: 18px;
    color: #d6bab2;
    padding: 0 10px;
    flex: 1;
  }
}
.login {
  background-color: #fff;
  height: 65vh;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  .logged {
    height: 100%;
    display: flex;
    flex-direction: column;
    // justify-content: space-around;
    justify-content: space-between;
    // 信息
    .user-info {
      width: 100vw;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 20px;
      .user-cover {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        background-color: #ccc;
        img {
          min-width: 50px;
          min-height: 50px;
          object-fit: cover;
        }
      }
      p {
        font-size: 14px;
        margin-left: 10px;
        font-weight: bold;
      }
    }
    // 退出登录
    .sign-out {
      padding-bottom: 30px;
      display: flex;
      justify-content: center;
      /deep/ .van-button {
        width: 100%;
        font-size: 14px;
      }
    }
  }
  .login-btn {
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      text-align: center;
      margin: 10px 0;
      font-size: 14px;
      color: #444;
    }
    .van-button {
      width: 150px;
      padding: 0 30px;
    }
  }
}
</style>
