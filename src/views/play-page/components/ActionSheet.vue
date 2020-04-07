<template>
  <div class="ActionSheet">
    <div class="content">
      <ul>
        <li
          class="item"
          :class="currentMusic.id === item.id ? 'currItem':''"
          v-for="(item,index) in playlist"
          :key="index"
          @click="goPlayAr(index)"
        >
          <div class="title">
            <div class="title-name">{{item.name}}</div>
            <div class="ar">
              <span v-for="(ar,index) in item.artists" :key="index">- {{ar.name}}</span>
            </div>
          </div>
          <div class="play-btn">
            <i class="icon-bofang1" v-if="currentMusic ? currentMusic.id !== item.id : true "></i>
            <img src="../../../svg-loaders/audio.svg" v-else />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import eventBus from '@/utils/eventBus'
export default {
  name: 'ActionSheet',
  props: {},
  data () {
    return {
      show: true
    }
  },
  components: {},
  watch: {},
  filters: {},
  methods: {
    goPlayAr (i) {
      eventBus.$emit('goPlayAr', i)
    }
  },
  created () {},
  mounted () {},
  computed: {
    ...mapGetters(['playlist', 'currentMusic'])
  }
}
</script>

<style scoped lang="less">
.content {
  height: 60vh;
  overflow: hidden;
  overflow-y: auto;
}
.item {
  height: 25px;
  display: flex;
  font-size: 14px;
  padding: 5px 0;
  margin: 0 20px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgb(233, 233, 233);
  .title {
    display: flex;
    align-items: center;
    width: 80vw;
    overflow: hidden;
    white-space: nowrap;
    .ar {
      font-size: 12px;
      margin-left: 5px;
      color: rgb(177, 177, 177);
    }
  }
  &:last-child {
    border-bottom: none;
  }
  .play-btn {
    i {
      color: #ccc;
    }
  }
}
.currItem {
  color: #ee3735;
  .title {
    .ar {
      color: #ee3735;
    }
  }
}
</style>
