const { defineConfig } = require("@vue/cli-service")
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api/": {
        //只要是这个路径下的请求都会被代理到target中
        target: "http://localhost:8081/",
        // target: "http://43.139.104.227:8083/",
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
    },
  },
})
