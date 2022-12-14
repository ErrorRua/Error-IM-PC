// TODO: 聊天记录保存到本地的方法可能需要优化
// TODO: 未读消息数的处理可能需要优化

import store2 from "store2"
import router from "@/router"
import { ackUnreadMessage } from "@/api/chat"
import Vue from "vue"

const currentUser = store2.get("userId")
const MESSAGE_LIST_KEY = "messageList:" + currentUser
const UNREAD_CNT_LIST_KEY = "unreadCntList:" + currentUser

const state = {
  // key: userId, value: messageList
  messageList: store2.get(MESSAGE_LIST_KEY) || {},
  // messageList: {},
  // key: userId, value: unreadCount
  unreadCntList: store2.get(UNREAD_CNT_LIST_KEY) || {},
}

const mutations = {
  createMessage(state, userId) {
    if (!state.messageList[userId]) {
      Vue.set(state.messageList, userId, [])
    }
  },
  addMessage(state, payload) {
    if (!payload.send) {
      const { fromUserId } = payload.message
      if (!state.messageList[fromUserId]) {
        Vue.set(state.messageList, fromUserId, [])
      }
      state.messageList[fromUserId].push(payload.message)
      store2.set(MESSAGE_LIST_KEY, state.messageList)

      if (router.currentRoute.params.userId !== fromUserId) {
        this.commit("chat/addUnreadCnt", fromUserId)
      }
    } else {
      const { toUserId } = payload.message
      if (!state.messageList[toUserId]) {
        Vue.set(state.messageList, toUserId, [])
      }
      state.messageList[toUserId].push(payload.message)
      store2.set(MESSAGE_LIST_KEY, state.messageList)
    }
  },
  removeMessage(state, fromUserId) {
    delete state.messageList[fromUserId]
    store2.set(MESSAGE_LIST_KEY, state.messageList)
  },
  removeMessageList(state) {
    state.messageList = {}
    store2.remove(MESSAGE_LIST_KEY)
  },
  addUnreadCnt(state, userId) {
    if (!state.unreadCntList[userId]) {
      Vue.set(state.unreadCntList, userId, 0)
    }
    state.unreadCntList[userId]++

    store2.set(UNREAD_CNT_LIST_KEY, state.unreadCntList)
  },
  removeUnreadCnt(state, userId) {
    delete state.unreadCntList[userId]
    store2.set(UNREAD_CNT_LIST_KEY, state.unreadCntList)
  },
}

const actions = {
  addMessage({ commit }, payload) {
    commit("addMessage", payload)
  },
  removeMessage({ commit }, from) {
    commit("removeMessage", from)
  },
  removeMessageList({ commit }) {
    commit("removeMessageList")
  },
  addUnreadCnt({ commit }, userId) {
    commit("addUnreadCnt", userId)
  },
  removeUnreadCnt({ commit }, userId) {
    commit("removeUnreadCnt", userId)
  },
  async ackUnreadMessage({ commit }, userId) {
    try {
      await ackUnreadMessage(userId)
      commit("removeUnreadCnt", userId)
    } catch (error) {}
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
