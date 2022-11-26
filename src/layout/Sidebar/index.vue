<template>
  <div class="sidebar-container" ref="test">
    <el-menu
      default-active="1"
      background-color="#2e2e2e"
      text-color="#fff"
      active-text-color="#fca311"
      :collapse="true"
      class="sidebar"
    >
      <Avatar class="avatar"></Avatar>
      <el-menu-item index="1">
        <i class="el-icon-chat-round"></i>
        <span slot="title">Error-IM</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-user"></i>
        <span slot="title">通讯录</span>
      </el-menu-item>
      <el-menu-item index="3">
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
  }
}
</style>
