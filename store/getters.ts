/*
 * Description: vuex-getters.js
 * User: chaoge
 * Date: 2018/04/16
 */

export default {
  currentUser(state) {
    return state.currentUser
  },
  isLogin(state) {
    return state.isLogin
  },
  isLoading(state) {
    return state.isLoading
  },
  currentEditRow(state) {
    return state.currentEditRow
  }
}
