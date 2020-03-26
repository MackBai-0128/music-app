<template>
   <div class="albums">
     <div class="loaders" v-if="isShow">
      <vue-loaders-line-scale name="ball-beat" color="#F94949" scale="0.7"/>
      <span class="loads">正在加载...</span>
    </div>
     <div class="search-result-albums">
      <ul class="albums-container">
        <li class="albums-item" v-for="item in albums" :key="item.id">
          <div class="albums-cover">
            <div class="album-bg"></div>
            <img :src="item.picUrl" alt />
          </div>
          <div class="albums-title">
            <div class="albums-name">{{item.name}} <span>{{item.alias[0]}}</span> </div>
            <div class="albums-time">
              <span>{{item.artist.name}}</span>
              <span class="time">{{item.publishTime | transformTime}}</span>
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
  name: 'albums',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      albums: [],
      isShow: true
    }
  },
  components: {},
  watch: {},
  filters: {},
  methods: {
    async getAibums () {
      const { data } = await search({ value: this.name, type: 10 })
      this.albums = data.result.albums
      this.isShow = false
    }
  },
  created () {},
  mounted () {},
  computed: {},
  beforeMount () {
    this.getAibums()
  }
}
</script>

<style scoped lang="less">
.loaders{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  .loads{
    font-size: 12px;
    color: #666;
  }
}
// 专辑 电台
.albums-container {
  padding: 0 10px;
  .albums-item {
    margin: 5px 0;
    display: flex;
    align-items: center;
    .albums-cover {
      width: 60px;
      height: 60px;
      position: relative;
      img {
        border-radius: 5px;
        overflow: hidden;
        min-width: 60px;
        min-height: 60px;
        object-fit: cover;
      }
    }
    .albums-title {
      margin-left: 15px;
      .albums-name,
      .dj-name {
        font-size: 16px;
        span{
          color: #999;
        }
      }
      .albums-time {
        padding: 3px 0;
        font-size: 12px;
        color: #666;
        .time{
          margin-left: 8px;
        }
      }
    }
  }
}
</style>
