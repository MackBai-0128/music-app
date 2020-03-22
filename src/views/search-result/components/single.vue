<template>
  <div class="single">
    <div class="search-result" v-if="songsList.length">
      <div class="single-nav">
        <div>单曲</div>
        <van-button type="default" size="mini" @click="onPlayAll">播放全部</van-button>
      </div>
      <van-list
        class="search-result-container"
        v-model="loading"
        :finished="finished"
        finished-text="已加载全部单曲"
        @load="onLoad"
      >
        <li v-for="(item,index) in songsList" :key="index" @click="goPlay(item)">
          <div class="left">
            <div class="title">{{item.name}}</div>
            <div class="singer">
              <i class="icon-sq"></i>
              <span>{{item.artists[0].name}}</span>
              <span>-</span>
              <span>{{item.album.name}}</span>
            </div>
          </div>
          <div class="right">
            <i class="icon-shipin1 shipin"></i>
            <i class="icon-caidan-dian"></i>
          </div>
        </li>
      </van-list>
    </div>
  </div>
</template>

<script>
import { search } from '@/api/search'
import eventBus from '@/utils/eventBus'
import { mapMutations } from 'vuex'
export default {
  name: 'single',
  props: {
    name: {
      type: [String],
      required: true
    }
  },
  data () {
    return {
      value: 0,
      songsList: [],
      loading: false,
      finished: false,
      offset: 0
    }
  },
  components: {},
  watch: {},
  filters: {},
  methods: {
    ...mapMutations({
      setPlayList: 'setPlayList'
    }),
    async onLoad () {
      var songs = []
      var obj = {}
      var album = {} // 专辑
      var arr = []
      var artists = {} // 艺术家
      // try {
      const { data } = await search({ value: this.name, offset: this.offset })
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
      this.songsList.push(...data.result.songs)
      this.loading = false
      this.offset++
      if (this.songsList.length >= data.result.songCount) {
        this.finished = true
      }
    },
    onPlayAll () {
      this.setPlayList(this.songsList)
      this.$router.push('/play')
      eventBus.$emit('play')
    },
    // 播放单曲
    goPlay (item) {
      this.$router.push('/play')
      this.setPlayList([item])
      eventBus.$emit('play', item.id)
    }
  },
  created () {
    this.onLoad()
    eventBus.$on('onSingleAll', () => {
      this.value++
    })
    // this.onSearch()
  },
  mounted () {

  },
  computed: {}
}
</script>

<style scoped lang="less">
.search-result {
  margin-top: 10px;
  .single-nav {
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    /deep/ .van-button {
      font-weight: 300;
      padding: 0 8px;
      border-radius: 10px;
    }
  }
  .search-result-container {
    padding: 10px 0;
    li {
      width: 98vw;
      box-sizing: border-box;
      padding: 5px 10px;
      border-top: 1px solid #f7f7f7;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        .title {
          font-size: 14px;
          width: 80vw;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .singer {
          display: flex;
          align-items: center;
          i {
            margin-right: 3px;
          }
          span {
            font-size: 12px;
            margin-right: 3px;
          }
        }
      }
      .right {
        padding-right: 5px;
        display: flex;
        align-items: center;
        .shipin {
          font-stretch: expanded;
          margin-right: 18px;
        }
      }
    }
    .songs-all {
      padding: 10px 0;
      border-bottom: none;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      color: #666;
      i {
        color: #666;
        font-size: 13px;
        margin-left: 5px;
      }
    }
  }
}
</style>
