import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/register"),
  },
  {
    path: "/",
    name: "layout",
    component: () => import("@/layout"),
    redirect: "/chats",
    children: [
      {
        path: "/chats", // 默认子路由
        name: "chats",
        component: () => import("@/views/chats"),
      },
      {
        path: "/contacts",
        name: "contacts",
        component: () => import("@/views/contacts"),
      },
      {
        path: "/me",
        name: "me",
        component: () => import("@/views/me"),
      },
    ],
  },
]

const router = new VueRouter({
  routes,
  // mode: "history",
})

export default router
