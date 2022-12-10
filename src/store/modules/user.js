import { getToken, setToken, removeToken } from "@/util/auth"
import { login, getInfo, logout } from "@/api/user"
import router from "@/router"

import { Message } from "element-ui"

const state = {
  token: getToken() || null,
  userInfo: {},
}

const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  removeToken(state) {
    state.token = null
    removeToken()
  },
  setInfo(state, info) {
    state.userInfo = info
  },
  removeInfo(state) {
    state.userInfo = {}
  },
}

const actions = {
  async login({ commit, dispatch }, data) {
    const result = await login(data)
    commit("setToken", result.token)
    await dispatch("getUserInfo")
  },
  async logout({ commit }) {
    try {
      await logout()
      Message.success("退出成功")
      commit("removeToken")
      commit("removeInfo")
      router.push("/login")
    } catch (error) {}
  },
  async getUserInfo({ commit }) {
    const info = await getInfo()
    commit("setInfo", info)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
