const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  userId: (state) => state.user.userInfo.userId,
  contacts: (state) => state.contact.contacts,
  messageList: (state) => state.chat.messageList,
  userMessageList: (state) => (userId) => state.chat.messageList[userId],
  lastMessage: (state) => (userId) => {
    const list = state.chat.messageList[userId]
    if (list) {
      return {
        ...list[list.length - 1],
        unreadCnt: state.chat.unreadCntList[userId] || 0,
      }
    }
  },
  stompClient: (state) => state.websocket.stompClient,
}
export default getters
