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
      <info-card :user-info="userInfo"></info-card>
    </el-popover>
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
    propUserInfo: {
      type: Object,
      default: undefined,
    },
  },
  components: {},
  data() {
    return {
      userInfo: {},
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
    if (!this.propUserInfo) {
      this.getInfoById()
    } else {
      this.userInfo = this.propUserInfo
    }
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

<style lang="scss"></style>
