<template>
  <div class="app-container" ref="baseContainer">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.sidebar-container {
  height: 562px;
  .sidebar {
    height: 100%;
  }
}
</style>

<style lang="scss">
.app-container {
  position: relative;
  top: 50%;
  width: 1000px;
  height: 650px;
  margin: 0 auto;
  transform: translateY(-50%);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}
</style>
