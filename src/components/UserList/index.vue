<template>
  <div class="list-container">
    <happy-scroll color="rgba(51,51,51,0.2)" size="5" hide-horizontal resize>
      <div>
        <slot></slot>
        <UserItem
          v-for="user in userList"
          :key="user.userId"
          :user="user"
          :message="message(user)"
          @click.native="clickUser(user)"
        ></UserItem>
      </div>
    </happy-scroll>
  </div>
</template>

<script>
import UserItem from "./UserItem.vue"
export default {
  components: {
    UserItem,
  },
  props: {
    userList: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {}
  },
  computed: {
    prefix() {
      if (this.$route.path.includes("/contacts")) {
        return "/contacts/detail/"
      } else if (this.$route.path.includes("/chats")) {
        return "/chats/detail/"
      } else {
        return ""
      }
    },
  },
  methods: {
    clickUser(user) {
      if (this.$route.path.includes("/chats")) {
        this.$store.dispatch("chat/removeUnreadCnt", user.userId)
      }
      this.$router.push(`${this.prefix}${user.userId}`)
    },
    message(user) {
      if (this.$route.path.includes("/contacts")) {
        return undefined
      }
      return this.$store.getters.lastMessage(user.userId)
    },
  },
}
</script>

<style lang="scss" scoped>
.list-container {
  height: 100%;
}
</style>

<style lang="scss">
.list-container {
  .happy-scroll-content {
    width: 100%;
  }
  .happy-scroll-strip {
    opacity: 0;
    transition: all 0.5s;
  }
  &:hover {
    .happy-scroll-strip {
      opacity: 1;
    }
  }
}
</style>
