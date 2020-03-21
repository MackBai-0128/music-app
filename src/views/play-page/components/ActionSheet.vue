<template>
  <div class="ActionSheet">
    <van-action-sheet v-model="show" title="播放列表">
      <div class="content">内容</div>
    </van-action-sheet>
  </div>
</template>

<script>
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
  methods: {},
  created () {},
  mounted () {},
  computed: {}
}
</script>

<style scoped>
</style>
