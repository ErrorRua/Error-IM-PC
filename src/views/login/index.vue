<template>
  <login-layout>
    <template #form>
      <el-form
        ref="loginForm"
        class="login-form"
        auto-complete="on"
        label-position="left"
        :model="loginForm"
        :rules="loginRules"
      >
        <el-form-item prop="email">
          <el-input
            ref="email"
            v-model="loginForm.email"
            placeholder="邮箱"
            name="email"
            type="email"
            tabindex="1"
            auto-complete="on"
            prefix-icon="el-icon-receiving"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
            prefix-icon="el-icon-lock"
          />
          <span class="show-pwd" @click="showPwd">
            <i
              slot="suffix"
              class="iconfont"
              :class="{
                'icon-invisible': passwordType === 'password',
                'icon-invisible-full': passwordType !== 'password',
              }"
            ></i>
          </span>
        </el-form-item>
        <el-form-item prop="verifyCode" class="code">
          <el-input
            v-model="loginForm.verifyCode"
            auto-complete="off"
            placeholder="验证码"
            @keyup.enter.native="handleLogin"
            class="code-input"
          ></el-input>
          <div class="login-code">
            <el-image :src="codeImg" @click.native="getCode"></el-image>
          </div>
        </el-form-item>

        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%; margin-bottom: 30px"
          @click.native.prevent="handleLogin"
        >
          登录
        </el-button>
      </el-form>
    </template>
  </login-layout>
</template>

<script>
import LoginLayout from "@/layout/LoginLayout"
import { mapActions } from "vuex"
import { validEmail } from "@/util/validate"
import { getVerifyCode } from "@/api/user"

export default {
  components: {
    LoginLayout,
  },
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!validEmail(value)) {
        callback(new Error("请输入正确的邮箱"))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      loginForm: {
        email: "",
        password: "",
        verifyCode: "",
        verifyKey: "",
      },
      loginRules: {
        email: [
          { required: true, trigger: "blur", message: "请输入邮箱" },
          { validator: validateEmail, trigger: "blur" },
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入密码" },
          {
            max: 20,
            min: 6,
            trigger: "blur",
            message: "密码长度在6到16个字符",
          },
        ],
        verifyCode: [
          { required: true, trigger: "blur", message: "请输入验证码" },
        ],
      },

      passwordType: "password",
      codeImg: "",
    }
  },
  methods: {
    ...mapActions(["user/login"]),
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = ""
      } else {
        this.passwordType = "password"
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    async handleLogin() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.loading = true
          try {
            await this["user/login"](this.loginForm)
            this.$router.push("/")
          } catch (error) {
            this.getCode()
          } finally {
            this.loading = false
          }
        } else {
          console.log("error submit!!")
          return false
        }
      })
    },
    async getCode() {
      const res = await getVerifyCode()
      this.codeImg = res.codeImg
      this.loginForm.verifyKey = res.verifyKey
    },
  },
  created() {
    this.getCode()
  },
}
</script>

<style lang="scss" scoped>
.show-pwd {
  position: absolute;
  right: 10px;
  font-size: 16px;
  color: #889aa4;
  cursor: pointer;
  user-select: none;
}

.login-form {
  margin-top: 50px;
  width: 65%;
}
</style>

<style lang="scss">
.code .el-form-item__content {
  display: flex;
  justify-content: space-between;
}
</style>
