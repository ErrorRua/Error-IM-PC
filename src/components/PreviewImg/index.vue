<template>
  <el-dialog
    :visible="showPreviewDialog"
    class="img-preview"
    :append-to-body="true"
    @close="$emit('update:showPreviewDialog', false)"
  >
    <img
      :src="imgUrl"
      v-imagerror="require('@/assets/common/img-missing.jpg')"
    />

    <div class="control">
      <el-button
        type="primary"
        plain
        v-downLoad="imgUrl || require('@/assets/common/img-missing.jpg')"
      >
        保存图片
      </el-button>
      <el-button plain v-if="changeAvatar" @click="changeAvatarDialog = true">
        更换头像
      </el-button>
    </div>
    <upload-avatar
      :change-avatar-dialog.sync="changeAvatarDialog"
    ></upload-avatar>
  </el-dialog>
</template>

<script>
import uploadAvatar from "@/views/me/components/upload-avatar.vue"
export default {
  props: {
    imgUrl: {
      type: String,
      default: require("@/assets/common/avatar.jpg"),
    },
    showPreviewDialog: {
      type: Boolean,
      default: false,
    },
    changeAvatar: {
      type: Boolean,
      default: false,
    },
  },
  components: { uploadAvatar },
  data() {
    return {
      changeAvatarDialog: false,
    }
  },
  methods: {},
}
</script>

<style lang="scss">
.img-preview {
  .el-dialog {
    width: min-content;
  }

  .el-dialog__body {
    padding: 0;
    height: 500px;
    position: relative;
    img {
      object-fit: cover;
      height: 100%;
    }
    .control {
      margin-top: 10px;
      display: flex;
      justify-content: space-around;
    }
  }
  .el-image {
    width: 100%;
  }
  .el-dialog__header {
    display: none;
  }
}
</style>
