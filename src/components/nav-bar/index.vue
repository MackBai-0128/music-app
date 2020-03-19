<template>
   <div class="nav-bar">
     <van-nav-bar :border="false" left-arrow @click-left="$router.back()">
       <slot name="title" slot="title"></slot>
       <slot name="right" slot="right"></slot>
    </van-nav-bar>
   </div>
</template>

<script>
export default {
  name: 'navBar',
  props: {},
  data () {
    return {}
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
