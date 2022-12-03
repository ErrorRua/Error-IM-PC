<template>
  <div class="search-container">
    <el-input
      prefix-icon="el-icon-search"
      v-model.trim="input"
      size="small"
      :placeholder="placeholder"
    ></el-input>
    <slot></slot>
  </div>
</template>

<script>
import { debounce } from "lodash"
export default {
  components: {},
  props: {
    keyword: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "搜索",
    },
  },
  data() {
    return {}
  },
  computed: {
    input: {
      get() {
        return this.keyword
      },
      set(val) {
        this.$emit("update:keyword", val)
      },
    },
  },
  watch: {
    input: {
      handler: debounce(function (val) {
        this.$emit("search")
        this.$emit("update:keyword", val)
      }, 500),
    },
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.search-container {
  padding: 15px;
  border-bottom: 1px solid #ccc;
  // background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background: linear-gradient(
    -45deg,
    #d9ed92,
    #b5e48c,
    #99d98c,
    #76c893,
    #52b69a,
    #34a0a4,
    #168aad,
    #1a759f,
    #1e6091,
    #184e77
  );
  animation: gradient 15s ease infinite forwards;
  background-size: 400% 400%;
  display: flex;
  align-items: center;
  gap: 10px;
  .el-input {
    width: 100%;
  }
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
}
</style>
