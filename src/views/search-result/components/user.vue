<template>
  <div class="user">
    <div class="loaders" v-if="isShow">
      <vue-loaders-line-scale name="ball-beat" color="#F94949" scale="0.7" />
      <span class="loads">正在加载...</span>
    </div>
    <!-- 用户 -->
    <div class="search-result-user">
      <ul class="user-container">
        <li class="user-item" v-for="item in userprofile" :key="item.userId">
          <div class="user-left">
            <div class="user-cover">
              <img :src="item.avatarUrl" />
            </div>
            <div class="user-name">
              <div class="username">{{item.nickname}}</div>
              <div class="user-jieshao">{{item.signature}}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { search } from '@/api/search'
export default {
  name: 'user',
  props: {
    name: {
      type: String,
      reuqired: true
    }
  },
  data () {
    return {
      userprofile: [],
      isShow: true
    }
  },
  components: {},
  watch: {},
  filters: {},
  methods: {
    async getUser () {
      const { data } = await search({ value: this.name, type: 1002 })
      this.userprofile = data.result.userprofiles
      this.isShow = false
    }
  },
  created () {
    this.getUser()
  },
  mounted () {},
  computed: {},
  beforeMount () {}
}
</script>

<style scoped lang="less">
.loaders {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  .loads {
    font-size: 12px;
    color: #666;
  }
}
// 歌手 用户
.user-container {
  padding: 0 10px;
  .user-item {
    margin: 5px 0;
    display: flex;
    justify-content: space-between;
    .user-left {
      display: flex;
      align-items: center;
      .user-cover {
        flex: 0 0 auto;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        img {
          min-width: 60px;
          min-height: 60px;
          object-fit: cover;
        }
      }
      .user-name {
        font-size: 14px;
        margin-left: 10px;
        .user-jieshao {
          font-size: 12px;
          color: #666;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      }
    }
    .artist-ruzhu {
      font-size: 12px;
      display: flex;
      align-items: center;
      margin-right: 10px;
      color: #b9b9b9;
    }
    .user-attention {
      font-size: 12px;
      display: flex;
      align-items: center;
      margin-right: 10px;
      color: #b9b9b9;
    }
  }
}
</style>
