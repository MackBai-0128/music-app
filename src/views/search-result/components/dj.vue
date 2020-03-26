<template>
   <div class="dj">
     <div class="loaders" v-if="isShow">
      <vue-loaders-line-scale name="ball-beat" color="#F94949" scale="0.7"/>
      <span class="loads">正在加载...</span>
    </div>
     <div class="search-result-dj">
      <ul class="dj-container">
        <li class="dj-item" v-for="item in djRadios" :key="item.id">
          <div class="dj-cover">
            <img :src="item.picUrl" alt />
          </div>
          <div class="dj-title">
            <div class="dj-name"> {{item.name}}</div>
            <div class="dj-time">
              <span>{{item.dj.nickname}}</span>
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
  name: 'dj',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      djRadios: [],
      isShow: true
    }
  },
  components: {},
  watch: {},
  filters: {},
  methods: {
    async getDj () {
      const { data } = await search({ value: this.name, type: 1009 })
      this.djRadios = data.result.djRadios
      this.isShow = false
    }
  },
  created () {},
  mounted () {},
  computed: {},
  beforeMount () {
    this.getDj()
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
.dj-container {
  padding: 0 10px;
  .dj-item {
    margin: 10px 0;
    display: flex;
    align-items: center;
    .albums-cover,
    .dj-cover {
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
    .dj-title {
      margin-left: 15px;
      .dj-name {
        font-size: 16px;
        span{
          color: #999;
        }
      }
      .dj-time {
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
