<template>
  <div class="login-container">
    <section class="login-left">
      <img
        :src="
          model
            ? require('@/assets/common/bg.jpg')
            : require('@/assets/common/back-authRegister.png')
        "
        alt=""
      />
    </section>
    <section class="login-right">
      <div class="login-form-container">
        <div class="login-title">
          <span>Hey! Hello👋</span>
        </div>
        <slot name="form"></slot>

        <div class="toggle">
          <router-link :to="model ? '/register' : '/login'">
            立即{{ model ? "注册" : "登录" }}!
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {
    model() {
      return this.$route.path === "/login"
    },
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
  },
}
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  .login-left {
    width: 50%;
    animation: fade-right 1s;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .login-right {
    width: 50%;
    background-color: #fff;
    animation: fade-left 1s;

    .login-form-container {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .login-title {
        font-size: 30px;
        font-weight: 600;
        color: #333;
        font-family: Helvetica, sans-serif;
      }
    }
  }

  .toggle {
    margin-top: 10px;
    a {
      color: #52796f;
      font-size: 14px;
      font-weight: 500;
    }
  }
}

/* 动画 */
@keyframes fade-left {
  from {
    opacity: 0;
    transform: translateX(100px);
    transition: opacity 300ms var(--easing), transform 300ms var(--easing);
  }
  to {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 300ms var(--easing), transform 300ms var(--easing);
  }
}

@keyframes fade-right {
  from {
    opacity: 0;
    transform: translateX(-100px);
    transition: opacity 300ms var(--easing), transform 300ms var(--easing);
  }
  to {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 300ms var(--easing), transform 300ms var(--easing);
  }
}
</style>
