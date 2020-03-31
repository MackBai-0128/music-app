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
        <composite v-if="componentIsShow.compositeShow" @onKeyword="onKeyword" @onClick="onClick" :name="newName" />
      </van-tab>
      <van-tab title="单曲">
        <single v-if="componentIsShow.singleShow" :name="newName" />
      </van-tab>
      <van-tab title="歌手">
        <artist v-if="componentIsShow.artistShow" :name="newName" />
      </van-tab>
      <van-tab title="专辑">
        <aibums v-if="componentIsShow.aibumsShow" :name="newName" />
      </van-tab>
      <van-tab title="视频">
        <video-content v-if="componentIsShow.videoShow" :name="newName" />
      </van-tab>
      <van-tab title="MV">
        <mv v-if="componentIsShow.myShow" :name="newName" />
      </van-tab>
      <van-tab title="主播电台">
        <dj-radios v-if="componentIsShow.djShow" :name="newName" />
      </van-tab>
      <van-tab title="用户">
        <userprofile v-if="componentIsShow.userprofileShow" :name="newName" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
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
      active: 0,
      type: 1018,
      keepAlive: false,
      componentIsShow: {
        compositeShow: true,
        singleShow: true,
        artistShow: true,
        aibumsShow: true,
        videoShow: true,
        myShow: true,
        djShow: true,
        userprofileShow: true
      }
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
      Object.keys(this.componentIsShow).forEach((key) => {
        this.componentIsShow[key] = false
      })
      this.newName = val
      this.componentIsShow.compositeShow = true
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
    onChange (index) {
      switch (this.active) {
        case 0:
          this.componentIsShow.compositeShow = true
          break
        case 1:
          this.componentIsShow.singleShow = true
          break
        case 2:
          this.componentIsShow.artistShow = true
          break
        case 3:
          this.componentIsShow.aibumsShow = true
          break
        case 4:
          this.componentIsShow.videoShow = true
          break
        case 5:
          this.componentIsShow.myShow = true
          break
        case 6:
          this.componentIsShow.djShow = true
          break
        case 7:
          this.componentIsShow.userprofileShow = true
          break
        default:
          break
      }
    },
    onFocus (value) {
      this.$router.push(`/search/${value}`)
    },
    clearValue () {
      this.$router.push('/search/clear')
    }
  },
  created () {},
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
