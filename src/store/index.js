import Vue from 'vue'
import Vuex from 'vuex'
import {getUserName, getToken, getUserId, setUserToken, clearUserToken} from '@/plugins/cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // username:Vue.cookie.get("username")  // 去浏览器的cookie中去读username，如果没有，返回的就是空
    username: getUserName(),
    token: getToken(),
    user_id: getUserId(),
  },
  mutations: {
    login:function (state, {username, token, uid}){
      state.username = username;
      state.token = token;
      state.user_id = uid;
      // Vue.cookie.set("username", username);
      // Vue.cookie.set("token", token)
      setUserToken(username, token, uid)   // 把username和token设置到cookie里
    },
    logout:function (state){
      state.username = "";
      state.token = "";
      state.user_id = "";
      clearUserToken()
    },
  },
  actions: {
  },
  modules: {
  }
})
