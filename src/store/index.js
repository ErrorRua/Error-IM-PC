import Vue from "vue"
import Vuex from "vuex"
import getters from "./getters"
import user from "./modules/user.js"
import contact from "./modules/contact.js"
import websocket from "./modules/websocket.js"
import chat from "./modules/chat.js"

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    contact,
    websocket,
    chat,
  },
  getters,
})

export default store
