import SockJS from "sockjs-client"
import Stomp from "stompjs"

const state = {
  url: "http://localhost:8081/websocket",
  stompClient: null,
  connected: false,
  checkInterval: null, //断线重连时 检测连接是否建立成功
  websocket: null,
  listenerList: [], //监听器列表，断线重连时 用于重新注册监听
}

const mutations = {
  WEBSOCKET_INIT(state, userId) {
    if (state.stompClient == null || !state.stompClient.connected) {
      if (
        state.stompClient != null &&
        state.websocket.readyState === SockJS.OPEN
      ) {
        state.stompClient.disconnect(() => {
          this.commit("websocket/WEBSOCKET_CONNECT", userId)
        })
      } else if (
        state.stompClient != null &&
        state.websocket.readyState === SockJS.CONNECTING
      ) {
        console.log("连接正在建立")
        return
      } else {
        this.commit("websocket/WEBSOCKET_CONNECT", userId)
      }
      if (!state.checkInterval) {
        const interval = setInterval(() => {
          console.log("检测连接：" + state.websocket.readyState)
          if (state.stompClient != null && state.stompClient.connected) {
            clearInterval(state.checkInterval)
            state.checkInterval = null
            console.log("重连成功")
          } else if (
            state.stompClient != null &&
            state.websocket.readyState != SockJS.CONNECTING
          ) {
            //经常会遇到websocket的状态为open 但是stompClient的状态却是未连接状态，故此处需要把连接断掉 然后重连
            state.stompClient.disconnect(() => {
              this.commit("websocket/WEBSOCKET_CONNECT", userId)
            })
          }
        }, 1000)
        state.checkInterval = interval
      }
    } else {
      console.log("连接已建立成功，不再执行")
    }
  },
  WEBSOCKET_CONNECT(state, userId) {
    const _this = this
    const websock = new SockJS(state.url)
    state.websocket = websock
    // 获取STOMP子协议的客户端对象
    const stompClient = Stomp.over(websock)
    stompClient.debug = null //关闭控制台打印
    stompClient.heartbeat.outgoing = 20000
    stompClient.heartbeat.incoming = 0 //客户端不从服务端接收心跳包
    // 向服务器发起websocket连接
    stompClient.connect(
      { userId }, //此处注意更换自己的用户名，最好以参数形式带入
      (frame) => {
        console.log("链接成功！")
        state.stompClient.subscribe(
          `/websocket/chat/contact/${userId}`,
          (frame) => {
            this.dispatch("chat/addMessage", {
              message: JSON.parse(frame.body),
            })
            console.log(JSON.parse(frame.body))
          }
        )
      },
      (err) => {
        //第一次连接失败和连接后断开连接都会调用这个函数 此处调用重连
        setTimeout(() => {
          _this.commit("websocket/WEBSOCKET_INIT", state.url)
        }, 1000)
      }
    )
    state.stompClient = stompClient
  },
  WEBSOCKET_SEND(state, message) {
    state.stompClient.send("/sendMsg", {}, JSON.stringify(message))
    this.dispatch("chat/addMessage", {
      message,
      send: true,
    })
  },
  WEBSOCKET_DISCONNECT(state) {
    if (state.stompClient != null) {
      state.stompClient.disconnect()
    }
    state.stompClient = null
    state.checkInterval = null
    state.connected = false
  },
}

const actions = {
  WEBSOCKET_INIT({ commit, rootGetters }) {
    commit("WEBSOCKET_INIT", rootGetters.userId)
  },
  WEBSOCKET_SEND({ commit, dispatch }, message) {
    commit("WEBSOCKET_SEND", message)
    dispatch("chat/addMessage", { message }, { root: true })
  },
  WEBSOCKET_DISCONNECT({ commit }) {
    commit("WEBSOCKET_DISCONNECT")
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
