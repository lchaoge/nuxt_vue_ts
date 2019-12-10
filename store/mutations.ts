/*
 * Description: vuex-mutation.js
 * User: zhaoyiming
 * Date: 2017/9/17
 */

export default {
  // 更改用户状态信息
  userStatus(state, user) {
    if (user) {
      state.currentUser = user
      state.isLogin = true
    } else {
      state.currentUser = null
      state.isLogin = false
    }
  },

  // 修改loading状态
  updateLoadingStatus(state, payload) {
    state.isLoading = payload.isLoading
  },
  // 修改模板
  currentEditRow(state, currentEditRow) {
    if (currentEditRow) {
      state.currentEditRow = currentEditRow
    } else {
      state.currentEditRow = null
    }
  }
}
