import Vue from 'vue'
import VueCookie from 'vue-cookie'

Vue.use(VueCookie)


export const getToken = () => {
    return Vue.cookie.get("token");
}

export const getUserName = () => {
    return Vue.cookie.get("username");
}

export const getUserId = () => {
    return Vue.cookie.get("user_id");
}


export const setUserToken = (username, token, user_id) => {
    // 把username和token和uer_id设置到cookie里, 7天有效期
    Vue.cookie.set("username", username, {expires: '7D'});
    Vue.cookie.set("token", token, {expires: '7D'});
    Vue.cookie.set("user_id", user_id, {expires: '7D'});
}


export const clearUserToken = () => {
    Vue.cookie.delete('username');
    Vue.cookie.delete('token');
    Vue.cookie.delete('user_id');
}