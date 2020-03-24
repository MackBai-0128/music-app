import Vue from 'vue'
import Vuex from 'vuex'

import state from './states'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'
Vue.use(Vuex)

export default new Vuex.Store({
  state,
  actions,
  modules: {
  },
  mutations,
  getters
})
