import axios from "axios"
import { Message } from "element-ui"
import store from "@/store"
import { getToken } from "@/util/auth"
import router from "@/router"

const service = axios.create({
  baseURL: "/api",
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000,
})

service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      config.headers["Authorization"] = getToken()
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    console.log(response)
    // axios默认加了一层data
    const { msg, data, code } = response.data
    //   要根据success的成功与否决定下面的操作
    if (code === 200) {
      return data
    } else {
      if (code === 401) {
        store.dispatch("user/logout")
        router.push("/login")
      }
      // 业务已经错误了 还能进then ? 不能 ！ 应该进catch
      Message.error(msg) // 提示错误消息
      return Promise.reject(new Error(msg))
    }
  },
  (error) => {
    console.log(error)
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 10002
    ) {
      // 当等于10002的时候 表示 后端告诉我token超时了
      store.dispatch("user/logout") // 登出action 删除token
      router.push("/login")
    } else {
      Message.error(error.message) // 提示错误信息
    }
    return Promise.reject(error) // 返回执行错误 让当前的执行链跳出成功 直接进入 catch
  }
)

export default service
