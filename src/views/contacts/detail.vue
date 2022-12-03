<template>
  <div class="detail-container">
    <info-card :user-info="userInfo" detail class="user-card"></info-card>
  </div>
</template>

<script>
import { searchUser } from "@/api/contact"
export default {
  components: {},
  data() {
    return {
      searchUserInfo: {},
    }
  },
  methods: {
    async searchUser() {
      if (this.keyword) {
        try {
          this.searchUserInfo = await searchUser({ keyword: this.keyword })
        } catch (error) {}
      }
    },
  },
  computed: {
    userInfo() {
      return this.$store.getters.contacts.filter((item) => {
        return item.userId === this.$route.params.userId
      })[0]
    },
  },
  created() {},
}
</script>

<style lang="scss" scoped>
.detail-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .user-card {
    width: 400px;
  }
}
</style>
