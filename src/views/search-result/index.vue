<template>
  <div class="search-list">
    <!-- 搜索框 -->
    <div class="search-field">
      <i class="icon-back" @click="$router.back()"></i>
      <van-field v-model="newName" left-icon="search" @focus="onFocus(newName)">
        <van-icon name="close" slot="right-icon" @click.prevent="clearValue" />
      </van-field>
    </div>
    <!-- 标签导航 -->
    <van-tabs v-model="active" :border="false" @change="onChange">
      <van-tab title="综合">
        <keep-alive>
          <composite @onKeyword="onKeyword" @onClick="onClick" :name="newName" />
        </keep-alive>
      </van-tab>
      <van-tab title="单曲">
        <keep-alive>
          <single :name="newName" />
        </keep-alive>
      </van-tab>
      <van-tab title="歌手">
        <keep-alive>
          <artist :name="newName" />
        </keep-alive>
      </van-tab>
      <van-tab title="专辑">
        <keep-alive>
          <aibums :name="newName" />
        </keep-alive>
      </van-tab>
      <van-tab title="视频">
        <keep-alive>
          <video-content :name="newName" />
        </keep-alive>
      </van-tab>
      <van-tab title="MV">
        <keep-alive>
          <mv :name="newName" />
        </keep-alive>
      </van-tab>
      <van-tab title="主播电台">
        <keep-alive>
          <dj-radios :name="newName" />
        </keep-alive>
      </van-tab>
      <van-tab title="用户">
        <keep-alive>
          <userprofile :name="newName" />
        </keep-alive>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { searchMultimatch } from '@/api/search'
import eventBus from '@/utils/eventBus'
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
      newName: this.name,
      view: ['single'],
      active: 0,
      type: 1018,
      keepAlive: false
    }
  },
  components: {
    composite: () => import('./components/composite'),
    single: () => import('./components/single'),
    artist: () => import('./components/artists'),
    videoContent: () => import('./components/video-content'),
    aibums: () => import('./components/albums'),
    djRadios: () => import('./components/dj'),
    userprofile: () => import('./components/user'),
    mv: () => import('./components/mv')
  },
  watch: {
    name (val, oldval) {
      this.newName = val
    }
  },
  filters: {},
  methods: {
    onKeyword (item) {
      this.$router.push('/search')
      eventBus.$emit('onKeyword', item)
    },
    onClick (i) {
      this.active = i
    },
    onChange () {
    },
    onFocus (value) {
      this.$router.push(`/search/${value}`)
    },
    clearValue () {
      this.$router.push('/search/clear')
    },
    // 搜索
    // async onSearch (type = 1018) {
    //   var songs = []
    //   var obj = {}
    //   var album = {} // 专辑
    //   var arr = []
    //   var artists = {} // 艺术家
    //   this.$toast.loading({
    //     message: '加载中...',
    //     forbidClick: true
    //   })
    //   try {
    //     const { data } = await search({ value: this.name, type })
    //     // console.log('搜索结果', data.result.song.songs)
    //     data.result.song.songs.forEach(item => {
    //       obj.id = item.id
    //       obj.name = item.name
    //       // 专辑
    //       // album.name = item.album.name
    //       // album.id = item.album.id
    //       album.name = item.al.name
    //       album.id = item.al.id
    //       obj.album = album
    //       // 艺术家
    //       item.ar.forEach(item2 => {
    //         artists.id = item2.id
    //         artists.name = item2.name
    //         artists.img = item2.picUrl
    //         arr.push(artists)
    //         artists = {}
    //       })
    //       obj.artists = arr
    //       songs.push(obj)
    //       arr = []
    //       obj = {}
    //       album = {}
    //     })
    //     if (this.type === 1018) {
    //       this.songs = songs
    //     } else if (this.type) {
    //     }
    //     this.$toast.success('加载成功')
    //   } catch (error) {
    //     this.$toast.fail('加载失败')
    //   }
    // },
    // 多重匹配
    async getSearchAll () {
      const { data } = await searchMultimatch(this.name)
      this.album = data.result.album
      this.artist = data.result.artist
    }
  },
  created () {
    this.getSearchAll()
  },
  mounted () {
    eventBus.$on('onSingleAll', () => {
      this.active = 1
    })
  },
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
