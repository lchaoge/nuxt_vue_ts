/*
 * Description: 应用
 * User: chaoge
 * Date: 2018/04/16
 */

export default {
  // 设置user
  setUser({ commit }, user) {
    commit('userStatus', user)
  },
  // 设置loading状态
  setLoadingStatus({ commit }, payload) {
    commit('updateLoadingStatus', payload)
  },
  // 后台类编辑
  setCurrentEditRow({ commit }, currentEditRow) {
    commit('currentEditRow', currentEditRow)
  }
}
