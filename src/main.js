import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Mixin from './mixins/TabBarIndex'
import * as filters from './filter'
import './utils/loaders'
import './styles/index.less'
import './utils/register-vant'
import './utils/muse-ui'
import './utils/swiper'
import 'amfe-flexible'
import './fonts/font.css'
Vue.mixin(Mixin)
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
