import Vue from "vue"
import App from "./App.vue"

Vue.config.productionTip = false

import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"

Vue.use(ElementUI)

import "@/style/index.scss"

// vue-router
import router from "@/router"

// 注册全局组件
import Component from "@/components"
Vue.use(Component)

// 注册自定义指令
import * as directives from "@/directives"
Object.keys(directives).forEach((key) => {
  Vue.directive(key, directives[key])
})

// vuex
import store from "./store"

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app")
