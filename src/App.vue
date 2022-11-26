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
}
</style>
