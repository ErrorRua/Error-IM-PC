<template>
  <div class="item-container" :class="{ 'item-active': active }">
    <div class="avatar">
      <img
        :src="user.avatar"
        v-imagerror="require('@/assets/common/avatar.jpg')"
      />
      <span v-if="message && message.unreadCnt" class="badge">
        {{ message.unreadCnt < 100 ? message.unreadCnt : 99 }}
      </span>
    </div>
    <div class="info">
      <div class="top">
        <div class="name">{{ user.username }}</div>
      </div>
      <div class="bottom" v-if="message">
        <div class="message">
          <span class="message-content">
            {{ message.content }}
          </span>
        </div>
        <div class="time">
          <span class="message-time">
            {{ message.sendTime | timeFilter }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment"
moment.locale("zh-cn")

export default {
  filters: {
    timeFilter(time) {
      return moment(time).calendar()
    },
  },
  props: {
    user: {
      type: Object,
      default: () => {},
    },
    message: {
      type: Object,
      default: undefined,
    },
  },
  components: {},
  data() {
    return {}
  },
  computed: {
    active() {
      return this.$route.path === "/contacts/" + this.user.userId
    },
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.item-container {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  cursor: pointer;
  transition: all 0.3s;
  background-color: #f8f9fa;
  width: 100%;
  box-sizing: border-box;

  &:hover {
    background-color: #e9ecef;
  }

  .avatar {
    width: 40px;
    height: 40px;
    margin-right: 15px;
    position: relative;
    background-color: white;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .badge {
      position: absolute;
      top: -5px;
      right: -5px;
      width: 15px;
      height: 15px;
      line-height: 15px;
      text-align: center;
      border-radius: 50%;
      background-color: #ff0000;
      color: #fff;
      font-size: 10px;
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    .top {
      .name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 150px;
      }
    }
    .bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      color: #aaa;
      .message {
        width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .message-content {
          width: 100px;
          overflow: hidden;
        }
      }
    }
  }
}
.item-active {
  background-color: #dee2e6;
}
</style>
