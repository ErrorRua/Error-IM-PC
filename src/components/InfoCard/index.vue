<template>
  <div class="info-card-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix card-head">
        <div class="avatar">
          <img
            :src="userInfo.avatar"
            v-imagerror="require('@/assets/common/avatar.jpg')"
            @click="showPreviewDialog = true"
          />
        </div>
        <div class="info">
          <span class="name">{{ userInfo.username }}</span>
          <i
            class="iconfont"
            :class="{
              'icon-nan': userInfo.sex == 0,
              'icon-nv': userInfo.sex == 1,
            }"
          ></i>
        </div>
      </div>
      <div class="card-body">
        <send-button
          class="btn"
          :text="'发消息'"
          v-if="userInfo.isFriend !== undefined && userInfo.isFriend !== 0"
          @click.native="sendMessage"
        ></send-button>
        <el-button
          type="success"
          v-if="userInfo.isFriend !== undefined && userInfo.isFriend === 0"
          @click="addFriend"
        >
          添加好友
        </el-button>
        <el-popconfirm
          title="确定删除好友吗"
          @confirm="deleteUser"
          v-if="
            detail && userInfo.isFriend !== undefined && userInfo.isFriend === 1
          "
        >
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            class="del-btn"
            size="mini"
            plain
            slot="reference"
          ></el-button>
        </el-popconfirm>
      </div>
    </el-card>
    <preview-img
      :showPreviewDialog.sync="showPreviewDialog"
      :imgUrl="userInfo.avatar || require('@/assets/common/avatar.jpg')"
    ></preview-img>
  </div>
</template>

<script>
import { deleteFriend, addFriendRequest } from "@/api/contact"
import { mapMutations } from "vuex"
export default {
  components: {},
  props: {
    userInfo: {
      type: Object,
      default: () => {},
    },
    detail: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      showPreviewDialog: false,
    }
  },
  methods: {
    ...mapMutations(["contact/removeContacts"]),
    async deleteUser() {
      await deleteFriend(this.userInfo.userId)
      this["contact/removeContacts"]()
      this.$message.success("删除成功")
      this.$router.push("/contacts")
      window.location.reload()
    },
    async addFriend() {
      await addFriendRequest({ friendId: this.userInfo.userId })
      this.$message.success("已发送好友请求")
      this.$router.push("/contacts")
      window.location.reload()
    },
    sendMessage() {
      this.$store.commit("chat/createMessage", this.userInfo.userId)
      this.$router.push({ path: "/chats/detail/" + this.userInfo.userId })
    },
  },
}
</script>

<style lang="scss" scoped>
.box-card {
  position: relative;
  .card-head {
    display: flex;
    align-items: center;
    justify-content: center;
    .avatar {
      width: 60px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        overflow: hidden;
        vertical-align: middle;
      }
    }
    .iconfont {
      vertical-align: middle;
      margin-left: 5px;
    }

    .icon-nan {
      color: skyblue;
    }

    .icon-nv {
      color: pink;
    }
  }
  .card-head {
    .info {
      .name {
        font-size: 16px;
        color: #333;
        font-weight: 500;
        margin-left: 10px;
      }
    }
  }
  .card-body {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .del-btn {
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
}
</style>

<style lang="scss"></style>
