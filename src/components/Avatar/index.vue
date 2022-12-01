<template>
  <div>
    <el-popover placement="right-end" width="300" trigger="click">
      <div class="ref-avatar" slot="reference">
        <img
          :src="userInfo.avatar"
          v-imagerror="require('@/assets/common/avatar.jpg')"
          alt=""
        />
      </div>

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
          <send-button class="btn" :text="'发消息'"></send-button>
        </div>
      </el-card>
    </el-popover>
    <preview-img
      :showPreviewDialog.sync="showPreviewDialog"
      :imgUrl="userInfo.avatar || require('@/assets/common/avatar.jpg')"
    ></preview-img>
  </div>
</template>

<script>
import { getInfoById } from "@/api/user"

export default {
  props: {
    userId: {
      type: String,
      default: "1595419368528044034",
    },
  },
  components: {},
  data() {
    return {
      userInfo: {},
      showPreviewDialog: false,
    }
  },
  methods: {
    async getInfoById() {
      const res = await getInfoById(this.userId)
      this.userInfo = res
      console.log("res: ", res)
    },
  },
  created() {
    this.getInfoById()
  },
}
</script>

<style lang="scss" scoped>
.ref-avatar {
  border-radius: 5px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }
}

.box-card {
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
  .card-body {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

<style lang="scss">
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
</style>
