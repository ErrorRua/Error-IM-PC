const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  contacts: (state) => state.contact.contacts,
}
export default getters
