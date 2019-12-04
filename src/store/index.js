import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import residential from './modules/residential' // 居住管理
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    residential
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
})
