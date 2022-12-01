<template>
  <button class="btn">{{ text }}</button>
</template>

<script>
export default {
  name: "SendButton",
  props: {
    text: {
      type: String,
      default: "Send",
    },
    backgroundColor: {
      type: String,
      default: "#4169e1",
    },
    textColor: {
      type: String,
      default: "#fff",
    },
  },
  components: {},
  data() {
    return {}
  },
  methods: {},
  mounted() {
    // const button = this.$refs.button
    // button.style.backgroundColor = this.backgroundColor
    // button.style.color = this.textColor
  },
}
</script>

<style lang="scss" scoped>
.btn {
  position: relative;
  font-size: 15px;
  text-transform: uppercase;
  text-decoration: none;
  padding: 0.8em 2.5em;
  display: inline-block;
  border-radius: 6em;
  transition: all 0.2s;
  border: none;
  font-family: inherit;
  font-weight: 600;
  color: white;
  background-color: #8ecae6;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.btn:active {
  transform: translateY(-1px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.btn::after {
  content: "";
  display: inline-block;
  height: 100%;
  width: 100%;
  border-radius: 100px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  transition: all 0.4s;
}

.btn::after {
  background-color: #8ecae6;
}

.btn:hover::after {
  transform: scaleX(1.4) scaleY(1.6);
  opacity: 0;
}
</style>
