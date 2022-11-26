<template>
  <login-layout>
    <template #form>
      <el-form
        ref="registerForm"
        class="login-form"
        label-position="left"
        :model="registerForm"
        :rules="registerRules"
      >
        <el-form-item prop="email">
          <el-input
            ref="email"
            v-model="registerForm.email"
            placeholder="邮箱"
            name="email"
            type="email"
            tabindex="1"
            autocomplete="off"
            prefix-icon="el-icon-notebook-1"
          />
        </el-form-item>

        <el-form-item prop="verifyEmailCode" class="email-code">
          <el-input
            name="verifyEmailCode"
            v-model="registerForm.verifyEmailCode"
            autocomplete="off"
            placeholder="邮箱验证码"
            class="code-input"
          ></el-input>
          <el-button
            type="primary"
            @click="getEmailVerifyCode"
            :disabled="verifyEmail.canClick"
          >
            {{ verifyEmail.btnText }}
          </el-button>
        </el-form-item>

        <el-form-item prop="username">
          <el-input
            ref="username"
            v-model="registerForm.username"
            placeholder="用户名"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
            prefix-icon="el-icon-user"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            :key="passwordType"
            ref="password"
            v-model="registerForm.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="register"
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
            v-model="registerForm.verifyCode"
            auto-complete="off"
            placeholder="验证码"
            @keyup.enter.native="register"
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
          @click.native.prevent="register"
        >
          注册
        </el-button>
      </el-form>
    </template>
  </login-layout>
</template>

<script>
import LoginLayout from "@/layout/LoginLayout"
import { validEmail } from "@/util/validate"
import { getVerifyCode, getEmailVerifyCode, register } from "@/api/user"
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
      registerForm: {
        username: "",
        password: "",
        email: "",
        verifyCode: "",
        verifyKey: "",
        verifyEmailCode: "",
      },
      registerRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
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
        verifyEmailCode: [
          { required: true, trigger: "blur", message: "请输入邮箱验证码" },
        ],
      },
      passwordType: "password",
      codeImg: "",
      verifyEmail: {
        btnText: "发送验证码",
        canClick: false,
        totalTime: 60,
      },
    }
  },
  methods: {
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
    async getEmailVerifyCode() {
      this.$refs.registerForm.validateField("email", async (valid) => {
        if (!valid) {
          await getEmailVerifyCode({ email: this.registerForm.email })
          this.sendCodeInterval()
          this.$message.success("验证码已发送")
        } else {
          return false
        }
      })
    },
    sendCodeInterval() {
      if (this.verifyEmail.canClick) return
      this.verifyEmail.canClick = true
      this.verifyEmail.btnText = this.verifyEmail.totalTime + "s后重新发送"
      let clock = window.setInterval(() => {
        this.verifyEmail.totalTime--
        this.verifyEmail.btnText = this.verifyEmail.totalTime + "s后重新发送"
        if (this.verifyEmail.totalTime < 0) {
          window.clearInterval(clock)
          this.verifyEmail.btnText = "重新发送验证码"
          this.verifyEmail.totalTime = 10
          this.verifyEmail.canClick = false
        }
      }, 1000)
    },
    async getCode() {
      const res = await getVerifyCode()
      this.codeImg = res.codeImg
      this.registerForm.verifyKey = res.verifyKey
    },
    async register() {
      this.$refs.registerForm.validate(async (valid) => {
        if (valid) {
          this.loading = true
          try {
            await register(this.registerForm)
            this.$message.success("注册成功")
            this.$router.push("/login")
          } catch (error) {
          } finally {
            this.loading = false
          }
        } else {
          console.log("error submit!!")
          return false
        }
      })
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

.email-code .el-form-item__content {
  display: flex;
  justify-content: space-between;
  .code-input {
    margin-right: 5px;
  }
}
</style>
