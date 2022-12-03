<template>
  <div class="layout-container">
    <Sidebar class="sidebar-container"></Sidebar>
    <transition name="fade-transform" mode="out-in">
      <router-view class="main-container" />
    </transition>
  </div>
</template>

<script>
import Sidebar from "./Sidebar"
export default {
  components: {
    Sidebar,
  },
  data() {
    return {}
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.layout-container {
  height: 100%;
  display: flex;
  .main-container {
    flex: 1;
    height: 100%;
    overflow: hidden;
    background-color: #fff;
  }

  .sidebar-container {
    // position: absolute;
    // top: 0;
    // left: 0;
    height: 100%;
  }
}
</style>
