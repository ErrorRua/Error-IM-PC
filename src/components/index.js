import Avatar from "./Avatar"
import SendButton from "./SendButton"
import PreviewImg from "./PreviewImg"

export default {
  install(Vue) {
    Vue.component("Avatar", Avatar)
    Vue.component("SendButton", SendButton)
    Vue.component("PreviewImg", PreviewImg)
  },
}
