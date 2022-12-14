<template>
  <div class="chat-container">
    <section class="left">
      <search @search="search" :keyword.sync="keyword"></search>
      <user-list :userList="chatList"></user-list>
    </section>
    <section class="right">
      <router-view />
    </section>
  </div>
</template>

<script>
import router from "@/router"
export default {
  components: {},
  data() {
    return {
      keyword: "",
    }
  },
  methods: {
    search() {},
  },
  mounted() {
    console.log(Object.keys(this.$store.getters.messageList))
  },
  created() {},
  computed: {
    messageList() {
      return this.$store.state.chat.messageList["1595419368528044034"]
    },
    chatList() {
      return this.$store.getters.contacts.filter((item) => {
        return Object.keys(this.$store.getters.messageList).includes(
          item.userId
        )
      })
    },
  },
  watch: {},
}
</script>

<style lang="scss" scoped>
.chat-container {
  display: flex;
  height: 100%;

  .left {
    flex: 1;
    border-right: 1px solid #ccc;
  }
  .right {
    flex: 2.7;
    // background-color: #ccc;
    // overflow: auto;
  }
}
</style>
