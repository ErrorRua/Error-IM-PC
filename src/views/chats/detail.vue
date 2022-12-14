<template>
  <div class="chat-detail-container">
    <header class="chat-header">{{ toUserInfo.username }}</header>
    <section class="chat-main">
      <message-win
        class="chat-message-win"
        :message-list="messageList"
        :chat-info="toUserInfo"
      ></message-win>
      <message-input
        class="chat-message-input"
        :to-user-id="userId"
      ></message-input>
    </section>
  </div>
</template>

<script>
import MessageInput from "./components/MessageInput.vue"
import MessageWin from "./components/MessageWin.vue"
export default {
  components: {
    MessageWin,
    MessageInput,
  },
  props: {
    userId: {
      type: String,
      default: "",
    },
  },
  data() {
    return {}
  },
  methods: {},
  computed: {
    toUserInfo() {
      return this.$store.getters.contacts.filter((item) => {
        return item.userId === this.userId
      })[0]
    },
    messageList() {
      return this.$store.state.chat.messageList[this.userId]
    },
  },
}
</script>

<style lang="scss" scoped>
.chat-detail-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  .chat-header {
    padding-left: 20px;
    height: 60px;
    line-height: 60px;
    // text-align: center;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ccc;
  }
  .chat-main {
    flex: 1;
    display: flex;
    flex-direction: column;

    .chat-message-win {
      max-height: 380px;
      flex: 0.7;
      // overflow-y: auto;
    }
    .chat-message-input {
      flex: 0.3;
      // height: 60px;
      border-top: 1px solid #ccc;
    }
  }
}
</style>
