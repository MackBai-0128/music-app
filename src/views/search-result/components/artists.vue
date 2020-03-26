<template>
  <div class="artists">
    <div class="loaders" v-if="isShow">
      <vue-loaders-line-scale name="ball-beat" color="#F94949" scale="0.7"/>
      <span class="loads">正在加载...</span>
    </div>
    <div class="search-result-artist">
      <ul class="artist-container">
        <li class="artist-item" v-for="item in artists" :key="item.id">
          <div class="artist-left">
            <div class="artist-cover">
              <img :src="item.picUrl" />
            </div>
            <div class="artist-name">{{item.name}}</div>
          </div>
          <div class="artist-ruzhu">已入驻</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { search } from '@/api/search'
export default {
  name: 'artists',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      artists: [],
      isShow: true
    }
  },
  components: {},
  watch: {},
  filters: {},
  methods: {
    async getArtist () {
      const { data } = await search({ value: this.name, type: 100 })
      this.artists = data.result.artists
      this.isShow = false
    }
  },
  created () {},
  mounted () {},
  computed: {},
  beforeMount () {
    // 每次进入都会执行
    this.getArtist()
  },
  activated () {
  },
  deactivated () {
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
.artist-container,
.user-container {
  padding: 0 10px;
  .artist-item,
  .user-item {
    margin: 5px 0;
    display: flex;
    justify-content: space-between;
    .artist-left,
    .user-left {
      display: flex;
      align-items: center;
      .artist-cover,
      .user-cover {
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
      .artist-name,
      .user-name {
        font-size: 14px;
        margin-left: 10px;
        .user-jieshao {
          font-size: 12px;
          color: #666;
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
