<template>
  <div class="sidebar-container" ref="test">
    <el-menu
      background-color="#2e2e2e"
      text-color="#fff"
      active-text-color="#fca311"
      :default-active="active"
      :collapse="true"
      class="sidebar"
      :router="true"
    >
      <Avatar class="avatar"></Avatar>
      <el-menu-item index="/chats">
        <i class="el-icon-chat-round"></i>
        <span slot="title">Error-IM</span>
      </el-menu-item>
      <el-menu-item index="/contacts">
        <i class="el-icon-user"></i>
        <span slot="title">通讯录</span>
      </el-menu-item>
      <el-menu-item index="/me">
        <i class="el-icon-setting"></i>
        <span slot="title">我的</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },
  computed: {
    active() {
      if (this.$route.path.includes("/chats")) {
        return "/chats"
      } else if (this.$route.path.includes("/contacts")) {
        return "/contacts"
      } else if (this.$route.path.includes("/me")) {
        return "/me"
      }
    },
  },
  methods: {},
  created() {},
}
</script>

<style lang="scss" scoped>
.sidebar-container {
  height: 100%;
  background-color: #2e2e2e;
  .avatar {
    padding: 12px;
  }
  .sidebar {
    height: 100%;
    border: none;
  }
}
</style>
