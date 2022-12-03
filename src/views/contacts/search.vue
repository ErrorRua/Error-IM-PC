<template>
  <div class="search-container">
    <component
      :is="is"
      :user-info="searchUserInfo"
      detail
      class="user-card"
    ></component>
  </div>
</template>

<script>
import { searchUser } from "@/api/contact"
import ErrorCard from "./components/ErrorCard.vue"
export default {
  components: {
    ErrorCard,
  },
  data() {
    return {
      searchUserInfo: {},
      is: "",
    }
  },
  methods: {
    async searchUser() {
      if (this.keyword) {
        try {
          this.searchUserInfo = await searchUser({ keyword: this.keyword })
          this.is = "info-card"
        } catch (error) {
          this.is = "error-card"
        }
      }
    },
  },
  computed: {
    keyword() {
      return this.$route.query.keyword
    },
  },
  watch: {
    keyword() {
      this.searchUser()
    },
  },
  created() {
    this.searchUser()
  },
}
</script>

<style lang="scss" scoped>
.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .user-card {
    width: 400px;
  }
}
</style>
