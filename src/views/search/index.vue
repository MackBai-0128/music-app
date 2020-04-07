<template>
  <div class="search">
    <!-- 搜索框 -->
    <form action="/" class="search-field">
      <van-search
        v-model="value"
        show-action
        shape="round"
        :autofocus="false"
        :placeholder="searchSug.showKeyword?searchSug.showKeyword:'搜索音乐 视频 电台'"
        @search="onSearch"
        @cancel="$router.replace('/')"
        @input="enterKeyword"
        ref="myInput"
      />
    </form>
    <!-- 搜索联想 -->
    <div class="search-keyword" v-if="value">
      <div class="search-value" @click="onSearch(value)">
        <button>搜索 “{{value}}”</button>
      </div>
      <div class="search-keyword-item">
        <ul class="search-keyword-container">
          <li @click="onSearch(item.name)" v-for="item in searchSuggest.artists" :key="item.id">
            <i class="icon-sousuo"></i>
            <div class="search-name">{{ item.name }}</div>
          </li>
          <li
            @click="onSearch(value+item.name)"
            v-for="item in searchSuggest.albums"
            :key="item.id"
          >
            <i class="icon-sousuo"></i>
            <div class="search-name">{{value}}{{ item.name }}</div>
          </li>
          <li @click="onSearch(value+item.name)" v-for="item in searchSuggest.songs" :key="item.id">
            <i class="icon-sousuo"></i>
            <div class="search-name">{{value}} {{ item.name }}</div>
          </li>
          <li @click="onSearch(value+item.name)" v-for="item in searchSuggest.mvs" :key="item.id">
            <i class="icon-sousuo"></i>
            <div class="search-name">{{ item.artistName + item.name }}</div>
          </li>
        </ul>
      </div>
    </div>
    <!-- default -->
    <template v-else>
      <!-- 广告 -->
      <div class="ad">
        <div>
          <img src alt />
        </div>
      </div>
      <!-- 历史 -->
      <div class="search-history" v-if="history.length">
        <div class="search-history-title">
          <span>搜索历史</span>
          <van-icon name="delete" @click="clearHistory" />
        </div>
        <div class="search-history-container">
          <div class="content">
            <span @click="onSearch(item)" v-for="(item,index) in history" :key="index">{{item}}</span>
          </div>
        </div>
      </div>
      <!-- 热搜 -->
      <div class="hot-search">
        <div class="hot-search-title">
          <span>热搜榜</span>
        </div>
        <div class="hot-search-container">
          <ul class="hot-container">
            <li v-for="(item,index) in hotList" :key="index" @click="onSearch(item.searchWord)">
              <div class="ranking">{{index+1}}</div>
              <div class="hot-item">
                <div class="hot-item-title">
                  {{item.searchWord}}
                  <i :class="index/1 == 1? 'new': ''">{{index/1==1? 'NEW':''}}</i>
                  <i :class="index/5 == 1? 'hot': ''">{{index/5 == 1? 'HOT':''}}</i>
                  <i :class="index/8 == 1? 'up': ''">{{index/8 == 1? '↑':''}}</i>
                  <i :class="index/9 == 1? 'drop': ''">{{index/9 == 1? '↓':''}}</i>
                </div>
                <div class="hot-item-synopsis">{{item.content}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { hotdetail, searchDefault, suggest } from '@/api/search'
import { setItem, getItem, remItem } from '@/utils/storage'
import eventBus from '@/utils/eventBus'
export default {
  name: 'search',
  props: {},
  data () {
    return {
      value: '',
      // 历史搜索
      history: getItem('search-history') ? getItem('search-history') : [],
      // 热搜榜
      hotList: [],
      // 默认搜索关键词
      searchSug: {},
      // 搜索建议
      searchSuggest: []
    }
  },
  components: {},
  watch: {},
  filters: {},
  methods: {
    // 清空历史
    clearHistory () {
      this.$dialog
        .confirm({
          message: '确认清空全部历史记录？'
        })
        .then(() => {
          remItem('search-history')
          this.history = []
        })
        .catch(() => {})
    },
    // 搜索
    async onSearch (name) {
      var value = ''
      this.value = name
      if (this.value.trim()) {
        this.value = this.value.trim()
        value = this.value.trim()
      } else {
        value = this.searchSug.realkeyword
      }
      if (value) {
        this.value = value
        const index = this.history.indexOf(value)
        if (index !== -1) this.history.splice(index, 1)
        this.history.unshift(value)
        setItem('search-history', this.history)
        this.$router.push(`/search-result/${value}`)
      }
    },
    // 搜索建议
    enterKeyword: debounce(async function () {
      if (!this.value.trim()) {
        this.searchSuggest = []
        return
      }
      const { data } = await suggest(this.value)
      this.searchSuggest = data.result
    }, 300),

    async getHotList () {
      const { data } = await hotdetail()
      this.hotList = data.data
    },

    async getSearchSug () {
      const { data } = await searchDefault()
      this.searchSug = data.data
    }
  },
  created () {
    eventBus.$on('onKeyword', item => {
      this.value = item
      this.onSearch(this.value)
    })
    this.getHotList()
    this.getSearchSug()
  },
  mounted () {
    // input 自动聚焦
    document.querySelector('.van-field__control').focus()
  },
  computed: {},

  beforeRouteEnter (to, from, next) {
    console.log('123', to, from)
    if (from.name === 'search-result') {
      console.log()
      next(mv => {
        // mv.$router.replace('/search')
        console.log(mv.$router)
      })
      // this.$router
    }

    if (from.params.name) {
      next(vm => {
        vm.value = from.params.name
        // 自动聚焦
        document.querySelector('.van-field__control').focus()
        vm.enterKeyword(from.params.name)
      })
    }
    if (to.params.name === 'clear') {
      next(vm => {
        vm.value = ''
      })
    }
    next()
  }
}
</script>

<style scoped lang="less">
.search {
  padding-top: 54px;
}
.search-field {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
}
.search-keyword {
  padding: 0 10px;
  .search-value {
    border-bottom: 1px solid #f7f8fa;
    font-size: 14px;
    padding: 8px 0;
    color: #0fbcf9;
  }
  .search-keyword-item {
    .search-keyword-container {
      font-size: 14px;
      li {
        display: flex;
        align-items: center;
        margin: 0 10px;
        i {
          color: #ccc;
        }
        .search-name {
          font-size: 12px;
          padding: 10px 0;
          padding-left: 10px;
          width: 100%;
          border-bottom: 1px solid #f7f8fa;
        }
      }
    }
  }
}
.ad {
  width: 100vw;
  height: 60px;
  box-sizing: border-box;
  padding: 0 10px;
  overflow: hidden;
  margin: 10px 0;
  img {
    background-color: #ccc;
    display: block;
    width: 100%;
    height: 100%;
  }
  & > div {
    overflow: hidden;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    background-color: #f2f2f2;
  }
}
.search-history {
  padding: 0 10px;
  .search-history-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    color: #3a3a3a;
    span {
      font-size: 14px;
    }
  }
  .search-history-container {
    margin: 10px 0;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;
    ::-webkit-scrollbar {
      display: none;
    }
    .content {
      display: flex;
      flex-wrap: nowrap;
      overflow-y: scroll;
      span {
        flex: 0 0 auto;
        font-size: 12px;
        color: #3a3a3a;
        padding: 3px 10px;
        background-color: #f8f8f8;
        margin: 0 10px;
        border-radius: 18px;
      }
    }
  }
}
.hot-search {
  padding: 0 10px;
  margin-top: 20px;
  .hot-search-title {
    font-size: 14px;
    margin-bottom: 10px;
  }
  .hot-search-container {
    .hot-container {
      display: flex;
      flex-wrap: wrap;
      li {
        flex: 0 0 50%;
        margin: 8px 0;
        display: flex;
        align-items: center;
        .ranking {
          font-size: 14px;
          font-weight: 400;
          color: #999999;
          text-align: center;
          flex: 15%;
        }
        .hot-item {
          flex: 85%;
          .hot-item-title {
            font-size: 13px;
          }
          .hot-item-synopsis {
            width: 40vw;
            font-size: 12px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .new {
            font-size: 12px;
            font-weight: 700;
            color: #56b357;
            font-style: italic;
          }
          .hot {
            font-size: 12px;
            font-weight: 700;
            color: #ef4a62;
            font-style: italic;
          }
          .drop {
            font-size: 12px;
            font-weight: 700;
            color: #56b357;
          }
          .up {
            font-size: 12px;
            font-weight: 700;
            color: #ef4a62;
          }
        }
        // &:nth-child(2n) {
        //   // margin-left: 10px;
        // }
        &:nth-child(-n + 4) {
          .ranking {
            color: #ff3f34;
          }
        }
      }
    }
  }
}
</style>
