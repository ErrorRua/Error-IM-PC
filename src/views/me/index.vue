<template>
  <div class="me-container">
    <!-- <section class="left"></section>
    <el-divider direction="vertical" class="divider"></el-divider> -->
    <i class="icon-erweima iconfont qrcode" @click="showQrCode"></i>
    <section class="right">
      <div class="avatar" @click="showPreviewDialog = true">
        <img
          :src="userInfo.avatar"
          v-imagerror="require('@/assets/common/avatar.jpg')"
        />
      </div>
      <div class="info">
        <span
          class="username"
          v-if="!changeNameShow"
          @dblclick="
            changeNameShow = true
            $nextTick(() => $refs.nameInput.focus())
          "
        >
          {{ userInfo.username }}
        </span>

        <el-input
          v-model="userInfo.username"
          v-else
          maxlength="10"
          @keyup.enter.native="$event.target.blur()"
          @blur="changeUsername"
          ref="nameInput"
        ></el-input>

        <el-popover
          placement="bottom"
          width="150"
          trigger="manual"
          v-model="sexSelectVisible"
        >
          <el-radio-group
            v-model="userInfo.sex"
            class="select-sex"
            @input="changeSex"
          >
            <el-radio-button label="0">
              <i class="iconfont icon-nan"></i>
            </el-radio-button>
            <el-radio-button label="1">
              <i class="iconfont icon-nv"></i>
            </el-radio-button>
          </el-radio-group>
          <i
            class="iconfont"
            :class="{
              'icon-nan': userInfo.sex == 0,
              'icon-nv': userInfo.sex == 1,
            }"
            @dblclick="sexSelectVisible = !sexSelectVisible"
            v-if="!changeNameShow"
            slot="reference"
          ></i>
        </el-popover>
      </div>
    </section>
    <preview-img
      :showPreviewDialog.sync="showPreviewDialog"
      :imgUrl="userInfo.avatar || require('@/assets/common/avatar.jpg')"
      :changeAvatar="true"
    ></preview-img>
    <el-dialog
      title="二维码"
      :visible.sync="showCodeDialog"
      :append-to-body="true"
      width="20%"
      top="30vh"
    >
      <el-row type="flex" justify="center">
        <canvas ref="myCanvas" />
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getInfo, updateInfo } from "@/api/user"
import QrCode from "qrcode"

export default {
  components: {},
  data() {
    return {
      changeNameShow: false,
      userInfo: {},
      showPreviewDialog: false,
      sexSelectVisible: false,
      showCodeDialog: false,
    }
  },
  methods: {
    async changeUsername() {
      this.userInfo.username = this.userInfo.username.trim()
      if (this.userInfo.username.length > 10) {
        this.$message.error("用户名不能超过10个字符")
        return
      }
      if (this.userInfo.username.length === 0) {
        this.$message.error("用户名不能为空")
        return
      }
      try {
        await updateInfo({ username: this.userInfo.username })
        this.$message.success("修改成功")
      } catch (error) {}
      this.changeNameShow = false
    },
    async changeSex() {
      try {
        await updateInfo({ sex: this.userInfo.sex })
        this.$message.success("修改成功")
      } catch (error) {}
      this.sexSelectVisible = false
    },
    async getInfo() {
      const res = await getInfo()
      console.log("re123s: ", res)
      this.userInfo = res
    },
    showQrCode() {
      // TODO: 暂时先用userId，后面写移动端页面在优化
      if (this.userInfo.userId) {
        this.showCodeDialog = true // 数据更新了 但是我的弹层会立刻出现吗 ？页面的渲染是异步的！！！！
        // 有一个方法可以在上一次数据更新完毕，页面渲染完毕之后
        this.$nextTick(() => {
          // 此时可以确认已经有ref对象了
          QrCode.toCanvas(this.$refs.myCanvas, this.userInfo.userId, {
            width: 200, //宽
            height: 200, //高
            quality: 0.92, //图片质量
          })
          // 如果转化的二维码后面信息 是一个地址的话 就会跳转到该地址 如果不是地址就会显示内容
        })
      }
    },
  },
  created() {
    this.getInfo()
  },
}
</script>

<style lang="scss" scoped>
.me-container {
  position: relative;
  display: flex;
  // background-image: url("@/assets/common/1.png");
  // background-image: url("@/assets/common/1.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  align-items: center;
  background: linear-gradient(
    135deg,
    rgba(26, 188, 156, 1) 0%,
    rgba(142, 68, 173, 1) 100%
  );

  .qrcode {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 30px;
    color: #fff;
  }

  .divider {
    height: 90%;
  }
  .left {
    flex: 0.5;
  }
  .right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
      outline: 5px solid #fff;
      animation: float 6s ease-in-out infinite;
      user-select: none;
      &:hover {
        animation-play-state: paused;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .info {
      margin-top: 20px;
      .username {
        font-size: 20px;
        color: #fff;
        font-weight: 600;
      }

      .iconfont {
        margin-left: 5px;
        font-weight: 600;
        font-size: 20px;
      }

      .icon-nan {
        color: skyblue;
      }

      .icon-nv {
        color: pink;
      }
    }
  }

  @keyframes float {
    0% {
      box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
      transform: translatey(0px);
    }
    50% {
      box-shadow: 0 25px 15px 0px rgba(0, 0, 0, 0.2);
      transform: translatey(-20px);
    }
    100% {
      box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
      transform: translatey(0px);
    }
  }
}
</style>

<style lang="scss">
.select-sex {
  display: flex;
  justify-content: center;
}
</style>
