import store2 from "store2"
import { getContactList } from "@/api/contact"

const state = {
  contacts: store2.get("contactList") || [],
}

const mutations = {
  setContacts(state, contacts) {
    state.contacts = contacts
    store2.set("contactList", contacts)
  },
  removeContacts(state) {
    state.contacts = []
    store2.remove("contactList")
  },
}

const actions = {
  async getContactList({ commit }) {
    const contacts = await getContactList()
    commit("setContacts", contacts)
    return contacts
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
