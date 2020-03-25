<template>
  <div class="login">
    <van-icon name="cross" class="back" @click="$router.back()" />
    <div class="logo">
      <div class="pulse pulse0"></div>
      <div class="pulse pulse1"></div>
      <div class="pulse pulse2"></div>
      <div class="logo-1">
        <i class="icon-wangyiyunyinle"></i>
      </div>
    </div>
    <div class="form">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="手机号/网易邮箱"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
        />
        <div style="margin: 16px;">
          <van-button color="#fff" class="btn-text" round block type="info" native-type="submit">登录</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { phoneLogin, emailLogin } from '@/api/login'
import { setToken } from '@/utils/util'
import { mapMutations } from 'vuex'
export default {
  name: '',
  props: {},
  data () {
    return {
      username: '',
      password: ''
    }
  },
  components: {},
  watch: {},
  filters: {},
  methods: {
    async onSubmit (values) {
      if (/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.username)) {
        // 邮箱登录
        try {
          const { data } = await emailLogin({
            email: this.username,
            password: this.password
          })
          console.log('邮箱响应', data)
        } catch (error) {
          console.log('邮箱错误响应', error.response)
        }
      } else if (/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.username)) {
        try {
          // 手机登录
          const { data } = await phoneLogin({
            phone: this.username,
            password: this.password
          })
          if (data.code === 502) {
            this.$toast(data.message)
            return
          }
          setToken('music-token')
          this.setUserInfo(data.profile)
          this.$router.back()
        } catch (error) {
          this.$toast(error.response.data.message)
          console.log('手机错误响应', error.response)
        }
      } else {
        this.$toast('手机号或邮箱格式错误')
      }
    },
    ...mapMutations({
      setUserInfo: 'setUserInfo'
    })
  },
  created () {},
  mounted () {},
  computed: {}
}
</script>

<style scoped lang="less">
.login {
  height: 100vh;
  background-color: #d82f2b;
}
.back {
  margin: 10px;
  color: #fff;
}
.form{
  padding: 0 20px;
  box-sizing: border-box;
  width: 100vw;
  position: absolute;
  bottom: 30px;
  left: 0;
  /deep/ .van-cell{
    border-radius: 30px;
    margin-bottom: 10px;
  }
  .btn-text{
    color: #000!important;
    font-size: 18px;
    letter-spacing: 5px;
  }
}
.logo {
  position: relative;
  top: 20%;
  left: 50%;
  margin-left: -9vw;
  width: 18vw;
  height: 18vw;
  border-radius: 50%;
  // background-color: #ef2d2e;
  display: flex;
  justify-content: center;
  align-items: center;
  i {
    font-size: 38px;
    color: #ffffff;
  }
}
.logo-1 {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 18vw;
  height: 18vw;
  left: 15px;
  top: 0;
  left: 0;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  background-color: #ef2d2e;
  border-radius: 50%;
  z-index: 2;
}
/* 产生动画（向外扩散变大）的圆圈  */
.pulse {
  position: absolute;
  width: 18vw;
  height: 18vw;
  left: 0;
  top: 0;
  border: 1px solid #ed3036;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  z-index: 1;
  opacity: 0;
  -webkit-animation: warn 3s ease-out;
  -moz-animation: warn 3s ease-out;
  animation: warn 3s ease-out;
  -webkit-animation-iteration-count: infinite;
  -moz-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}
.pulse0 {
  animation-delay: 02s;
}
.pulse1 {
  animation-delay: 0.8s;
}
.pulse2 {
  animation-delay: 1.5s;
}
@keyframes warn {
  0% {
    transform: scale(1);
    opacity: 0;
  }
  25% {
    transform: scale(1.2);
    opacity: 0.1;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.3;
  }
  75% {
    transform: scale(2);
    opacity: 0.5;
  }
  100% {
    transform: scale(2.6);
    opacity: 0;
  }
}
</style>
