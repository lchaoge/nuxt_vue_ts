import { Commit } from 'vuex';

const state: any = () => ({
  currentUser: null,
  isLogin: false
});
const mutations: any = {
  saveUserInfo(state: { currentUser: null; isLogin: boolean }, userInfo: any) {
    if (userInfo) {
      state.currentUser = userInfo;
      state.isLogin = true;
    } else {
      state.currentUser = null;
      state.isLogin = false;
    }
  }
};
const actions: any = {
  saveUserInfo(context: { commit: Commit }, userInfo: any) {
    context.commit('saveMenuList', userInfo);
  }
};

export default {
  namespaced: false, // namespaced为false的时候，state,mutations,actions全局可以调用，为true，生成作用域，引用时要声明模块名称
  state,
  mutations,
  actions
};
