import Avatar from "./Avatar"
import SendButton from "./SendButton"
import PreviewImg from "./PreviewImg"
import Search from "./Search"
import UserList from "./UserList"
import { HappyScroll } from "vue-happy-scroll"
import "vue-happy-scroll/docs/happy-scroll.css"
import InfoCard from "./InfoCard"

export default {
  install(Vue) {
    Vue.component("Avatar", Avatar)
    Vue.component("SendButton", SendButton)
    Vue.component("PreviewImg", PreviewImg)
    Vue.component("Search", Search)
    Vue.component("UserList", UserList)
    Vue.component("HappyScroll", HappyScroll)
    Vue.component("InfoCard", InfoCard)
  },
}
