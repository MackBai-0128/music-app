<template>
  <div class="search-list">
    <!-- 搜索框 -->
    <div class="search-field">
      <i class="icon-back" @click="$router.back()"></i>
      <van-field v-model="name" left-icon="search" @focus="onFocus(name)">
        <van-icon name="close" slot="right-icon" @click.prevent="clearValue" />
      </van-field>
    </div>
    <!-- 标签导航 -->
    <van-tabs v-model="active" :border="false">
      <van-tab title="综合">
        <keep-alive>
          <composite :songs="songs" :album="album" :artist="artist" />
        </keep-alive>
      </van-tab>
      <van-tab title="单曲">内容 2</van-tab>
      <van-tab title="云村">
        <div>开发中。。。{{active}}</div>
      </van-tab>
      <van-tab title="歌手">
        <div>开发中。。。{{active}}</div>
      </van-tab>
      <van-tab title="专辑">
        <div>开发中。。。{{active}}</div>
      </van-tab>
      <van-tab title="视频">
        <div>开发中。。。{{active}}</div>
      </van-tab>
      <van-tab title="歌词">
        <div>开发中。。。{{active}}</div>
      </van-tab>
      <van-tab title="主播电台">
        <div>开发中。。。{{active}}</div>
      </van-tab>
      <van-tab title="用户">
        <div>开发中。。。{{active}}</div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { search, searchMultimatch } from '@/api/search'
export default {
  name: 'searchList',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      songs: [],
      active: 0,
      // 专辑
      album: [],
      // 歌手
      artist: []
    }
  },
  components: {
    composite: () => import('./components/composite')
  },
  watch: {},
  filters: {},
  methods: {
    onFocus (value) {
      this.$router.push(`/search/${value}`)
    },
    clearValue () {
      this.$router.push('/search/clear')
    },
    async onSearch () {
      var songs = []
      var obj = {}
      var album = {} // 专辑
      var arr = []
      var artists = {} // 艺术家
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const { data } = await search({ value: this.name })
        data.result.songs.forEach(item => {
          obj.id = item.id
          obj.name = item.name
          // 专辑
          album.name = item.album.name
          album.id = item.album.id
          obj.album = album
          // 艺术家
          item.artists.forEach(item2 => {
            artists.id = item2.id
            artists.name = item2.name
            artists.img = item2.img1v1Url
            arr.push(artists)
            artists = {}
          })
          obj.artists = arr
          songs.push(obj)
          arr = []
          obj = {}
          album = {}
        })
        this.songs = songs
        this.$toast.success('加载成功')
      } catch (error) {
        this.$toast.fail('加载失败')
      }
    },
    async getSearchAll () {
      const { data } = await searchMultimatch(this.name)
      this.album = data.result.album
      this.artist = data.result.artist
    }
  },
  created () {
    this.onSearch()
    this.getSearchAll()
  },
  mounted () {},
  computed: {}
}
</script>

<style scoped lang="less">
.search-list {
  padding-top: 83px;
}
.search-field {
  position: fixed;
  background-color: #fff;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 46px;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  i {
    margin-right: 20px;
  }
  .field {
    height: 46px;
    box-sizing: border-box;
    padding: 10px 0;
  }
  /deep/ .van-field {
    background-color: #f7f7f7;
    border-radius: 40px;
    padding: 4px 10px;
  }
  /deep/ .van-field__right-icon {
    width: 16px;
  }
}
/deep/ .van-tabs__wrap {
  position: fixed;
  z-index: 999;
  top: 46px;
  left: 0;
  right: 0;
  border-bottom: 1px solid #f7f7f7;
}
/deep/ .van-tabs__wrap {
  height: 35px;
}
/deep/ .van-tab {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
