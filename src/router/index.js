import Vue from "vue"
import VueRouter from "vue-router"

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

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
        children: [
          {
            path: "/contacts/detail/:userId?",
            name: "detail",
            component: () => import("@/views/contacts/detail"),
            props: true,
          },
          {
            path: "/contacts/search",
            name: "search",
            component: () => import("@/views/contacts/search"),
          },
          {
            path: "/contacts/new-friend",
            name: "newFriend",
            component: () => import("@/views/contacts/new-friend"),
          },
        ],
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
