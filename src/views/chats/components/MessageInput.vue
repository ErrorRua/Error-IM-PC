<template>
  <div class="input-container">
    <div class="tool-bar"></div>
    <el-input
      class="message-input"
      type="textarea"
      placeholder="请输入内容"
      v-model="content"
      :autosize="{ minRows: 5, maxRows: 5 }"
      resize="none"
    ></el-input>
    <div class="operate-bar">
      <el-button type="success" size="small" @click="sendMessage">
        发送
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex"

export default {
  props: {
    toUserId: {
      type: String,
      default: "",
    },
  },
  components: {},
  data() {
    return {
      content: "",
    }
  },
  methods: {
    ...mapActions("websocket", {
      sendMsg: "WEBSOCKET_SEND",
    }),
    sendMessage() {
      if (this.content.trim() === "") {
        return this.$message.error("不能发送空消息")
      }
      this.sendMsg({
        fromUserId: this.$store.getters.userId,
        toUserId: this.toUserId,
        content: this.content,
        type: 0,
        sendTime: new Date(),
      })
      this.content = ""
    },
  },
}
</script>

<style lang="scss" scoped>
.input-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  .tool-bar {
    height: 35px;
    // background-color: #f5f5f5;
  }
  .message-input {
    flex: 1;
    // background-color: #f5f5f5;
  }
  .operate-bar {
    height: 35px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 10px;
    // background-color: #f5f5f5;
  }
}
</style>
