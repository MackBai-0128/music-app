import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { changeNumber, timeFilter, transformTime } from './filter'
import './utils/loaders'
import './styles/index.less'
import './utils/register-vant'
import './utils/muse-ui'
import './utils/swiper'
import 'amfe-flexible'
import './fonts/font.css'
Vue.filter('changeNumber', changeNumber)
Vue.filter('timeFilter', timeFilter)
Vue.filter('transformTime', transformTime)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
