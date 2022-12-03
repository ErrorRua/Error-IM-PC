import Vue from "vue"
import Vuex from "vuex"
import getters from "./getters"
import user from "./modules/user.js"
import contact from "./modules/contact.js"

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    contact,
  },
  getters,
})

export default store
