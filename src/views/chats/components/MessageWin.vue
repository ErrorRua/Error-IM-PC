<template>
  <div class="window-container">
    <div class="message-list">
      <div class="message-item" v-for="(item, index) in messageList">
        <div class="message-item__time" v-if="showTime(index)">
          {{ item.sendTime | timeFilter }}
        </div>
        <div
          class="message-item__content"
          :class="{
            'message-item__content__self':
              item.fromUserId === $store.getters.userId,
          }"
        >
          <Avatar
            class="message-item__content__avatar"
            :prop-user-info="
              item.fromUserId === chatInfo.userId
                ? chatInfo
                : $store.getters.userInfo
            "
          ></Avatar>
          <div class="message-item__content__text">{{ item.content }}</div>
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
    chatInfo: {
      type: Object,
      default: () => {
        return {}
      },
    },
    messageList: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  components: {},
  data() {
    return {}
  },
  methods: {
    showTime(index) {
      if (index === 0) {
        return true
      }
      const curTime = this.messageList[index].sendTime
      const preTime = this.messageList[index - 1].sendTime
      return moment(preTime).add(5, "minutes").isBefore(curTime)
    },
  },
}
</script>

<style lang="scss" scoped>
.window-container {
  padding: 10px 0;
  background-color: #f1f1f1;
  .message-list {
    box-sizing: border-box;
    margin-left: 10px;
    overflow-y: auto;
    height: 100%;
    padding-right: 10px;
    transition: all 0.3s;
    &::-webkit-scrollbar-track {
      // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: transparent;
    }
    &::-webkit-scrollbar {
      width: 6px;
      background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 10px;
    }
  }
  .message-item {
    .message-item__time {
      text-align: center;
      color: #999;
      font-size: 12px;
      margin: 10px 0;
    }
    .message-item__content {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .message-item__content__avatar {
        width: 40px;
        height: 40px;
        background-color: white;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .message-item__content__text {
        background-color: #fff;
        padding: 10px;
        border-radius: 5px;
        max-width: 300px;
        overflow-wrap: break-word;
        word-wrap: break-word;
        word-break: break-all;
        transition: all 0.3s;
        position: relative;
        margin-left: 10px;

        &::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          width: 0;
          height: 0;
          border: 5px solid transparent;
          border-right-color: #fff;
          border-left: 0;
          margin-left: -5px;
          transition: all 0.3s;
        }
        &:hover {
          background-color: #e9ecef;
          &::before {
            border-color: #e9ecef;
          }
        }
      }
    }
    // 自己发的消息
    .message-item__content__self {
      flex-direction: row-reverse;
      .message-item__content__text {
        margin-right: 10px;
        margin-left: 0;
        background-color: #cad2c5;
        &::before {
          content: "";
          position: absolute;
          top: 50%;
          right: 0 !important;
          left: auto !important;
          width: 0;
          height: 0;
          border: 5px solid transparent;
          border-left-color: #cad2c5;
          border-right: 0;
          margin-right: -5px;
          transition: all 0.3s;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.window-container {
  .happy-scroll-container {
    width: 620px !important;
  }
  .happy-scroll-content {
    width: 10%;
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
