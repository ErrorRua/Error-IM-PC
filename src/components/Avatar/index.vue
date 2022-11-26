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
        <div slot="header" class="clearfix">
          <div class="avatar">
            <img
              :src="userInfo.avatar"
              v-imagerror="require('@/assets/common/avatar.jpg')"
              alt=""
            />
          </div>
          <div class="info">
            <span class="name">{{ userInfo.username }}</span>
            <i class="iconfont"></i>
          </div>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{ "列表内容 " + o }}
        </div>
      </el-card>
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
  },
  components: {},
  data() {
    return {
      userInfo: {},
    }
  },
  methods: {
    async getInfo() {
      const res = await getInfoById(this.userId)
      this.userInfo = res
    },
  },
  created() {
    this.getInfo()
  },
}
</script>

<style lang="scss" scoped>
.ref-avatar {
  img {
    width: 100%;
    height: 100%;
  }
}

.box-card {
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
}
</style>
