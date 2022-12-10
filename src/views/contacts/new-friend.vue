<template>
  <div class="new-friend-container">
    <el-card class="new-friend-card">
      <div class="new-friend-card__title" slot="header">新的朋友</div>
      <happy-scroll
        color="rgba(51,51,51,0.2)"
        size="5"
        hide-horizontal
        resize
        v-loading="loading"
      >
        <ul class="new-friend-list">
          <li
            class="new-friend-item"
            v-for="request in requestList"
            :key="request.requestId"
          >
            <div class="new-friend-item__info">
              <div class="new-friend-item__avatar">
                <img
                  :src="request.fromUserAvatar"
                  alt=""
                  v-imagerror="require('@/assets/common/avatar.jpg')"
                />
              </div>
              <div class="new-friend-item__name">
                {{ request.fromUsername }}
              </div>
            </div>
            <div class="new-friend-item__action">
              <el-button
                type="success"
                size="mini"
                plain
                v-if="request.status === 0"
                @click="acceptFriendRequest(request.requestId)"
              >
                同意
              </el-button>
              <el-button
                type="danger"
                size="mini"
                plain
                v-if="request.status === 0"
                @click="rejectFriendRequest(request.requestId)"
              >
                拒绝
              </el-button>
              <el-button
                type="success"
                size="mini"
                plain
                v-if="request.status === 1"
                disabled
              >
                已同意
              </el-button>
              <el-button
                type="danger"
                size="mini"
                plain
                v-if="request.status === -1"
                disabled
              >
                已拒绝
              </el-button>
            </div>
          </li>
        </ul>
      </happy-scroll>
    </el-card>
  </div>
</template>

<script>
import {
  getFriendRequestList,
  acceptFriendRequest,
  rejectFriendRequest,
} from "@/api/contact"
export default {
  components: {},
  data() {
    return {
      requestList: [],
      loading: false,
    }
  },
  methods: {
    async getFriendRequestList() {
      this.loading = true
      const res = await getFriendRequestList()
      this.requestList = res
      this.loading = false
    },
    async rejectFriendRequest(requestId) {
      const res = await rejectFriendRequest(requestId)
      location.reload()
    },
    async acceptFriendRequest(requestId) {
      const res = await acceptFriendRequest(requestId)
      location.reload()
    },
  },
  created() {
    this.getFriendRequestList()
  },
}
</script>

<style lang="scss" scoped>
.new-friend-container {
  // width: 100%;
  .new-friend-card {
    padding: 10px;
    padding-top: 0;
  }

  .new-friend-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .new-friend-item__info {
      display: flex;
      align-items: center;
      .new-friend-item__avatar {
        width: 40px;
        height: 40px;
        border-radius: 10%;
        overflow: hidden;
        margin-right: 20px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .new-friend-item__name {
        font-size: 14px;
        font-weight: 500;
      }
    }
    .new-friend-item__action {
      display: flex;
      align-items: center;
      .el-button {
        margin-left: 10px;
      }
    }
  }
}
</style>

<style lang="scss">
.new-friend-container {
  .el-card__body {
    height: 540px;
    overflow: auto;
  }
  .happy-scroll-container {
    width: 630px !important;
  }
  .happy-scroll-content {
    width: 98%;
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
