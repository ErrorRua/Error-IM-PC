<template>
  <div class="contact-container">
    <section class="left">
      <search
        @search="search"
        :keyword.sync="keyword"
        :placeholder="placeholder"
      >
        <el-button
          plain
          class="add-friend-btn"
          size="mini"
          @click="addFriendModel = !addFriendModel"
        >
          <i class="iconfont icon-tianjiahaoyou" v-if="!addFriendModel"></i>
          <i class="el-icon-close" v-else></i>
        </el-button>
      </search>
      <user-list :userList="contactList">
        <UserItem
          :user="{
            username: '新的朋友',
            avatar: require('@/assets/common/new-friend.png'),
          }"
          v-if="!addFriendModel"
        ></UserItem>
        <UserItem
          :user="{
            username: '搜索：' + keyword,
            avatar: require('@/assets/common/search.png'),
          }"
          v-if="addFriendModel && keyword"
          @click.native="
            $router.push({ path: '/contacts/search', query: { keyword } })
          "
        ></UserItem>
      </user-list>
    </section>
    <section class="right">
      <router-view />
    </section>
  </div>
</template>

<script>
import { mapActions } from "vuex"
import UserItem from "@/components/UserList/UserItem.vue"
export default {
  components: {
    UserItem,
  },
  data() {
    return {
      contactList: this.$store.getters.contacts,
      loading: false,
      addFriendModel: false,
      keyword: "",
    }
  },
  computed: {
    placeholder() {
      return !this.addFriendModel ? "搜索" : "请输入邮箱"
    },
  },
  methods: {
    ...mapActions(["contact/getContactList"]),
    async getContactList() {
      this.loading = true
      this.contactList = await this["contact/getContactList"]()
      this.loading = false
    },
    search() {
      if (this.addFriendModel) {
        this.contactList = null
        return
      }
      this.contactList = this.$store.getters.contacts.filter((item) => {
        return item.username.includes(this.keyword)
      })
    },
  },
  watch: {
    addFriendModel() {
      if (this.addFriendModel) {
        this.contactList = null
      } else {
        this.contactList = this.$store.getters.contacts
      }
      this.$router.push("/contacts")
      this.keyword = ""
    },
  },
  created() {
    this.getContactList()
  },
}
</script>

<style lang="scss" scoped>
.contact-container {
  display: flex;
  height: 100%;

  .left {
    flex: 1;
    border-right: 1px solid #ccc;
  }
  .right {
    flex: 2.7;
    // background-color: #ccc;
  }
}
</style>
