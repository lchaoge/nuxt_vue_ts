/*
 * Description: vuex-index.js
 * User: chaoge
 * Date: 2018/04/16
 */

import Vue from 'vue'
import VueX from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import state from './state'

Vue.use(VueX)

const store = () => {
  return new VueX.Store({
    actions,
    mutations,
    getters,
    state
  })
}

export default store
