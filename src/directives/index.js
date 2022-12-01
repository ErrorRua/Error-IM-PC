import { Message } from "element-ui"

export const imagerror = {
  // 指令对象 会在当前的dom元素插入到节点之后执行
  inserted(dom, options) {
    // options是 指令中的变量的解释  其中有一个属性叫做 value
    // dom 表示当前指令作用的dom对象
    // dom认为此时就是图片
    // 当图片有地址 但是地址没有加载成功的时候 会报错 会触发图片的一个事件 => onerror
    dom.src = dom.src || options.value
    dom.onerror = function () {
      // 当图片出现异常的时候 会将指令配置的默认图片设置为该图片的内容
      // dom可以注册error事件
      dom.src = options.value // 这里不能写死
    }
  },
  componentUpdated(dom, options) {
    dom.src = dom.src || options.value
  },
}

export const downLoad = {
  inserted(dom, binding) {
    dom.addEventListener("click", () => {
      const a = document.createElement("a")
      let url = binding.value // 完整的url则直接使用
      // 这里是将url转成blob地址，
      fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          // 将链接地址字符内容转变成blob地址
          a.href = URL.createObjectURL(blob)
          // 下载文件的名字
          a.download = url.split("/")[url.split("/").length - 1]
          document.body.appendChild(a)
          a.click()
          return a
        })
        .then((doc) => {
          //最后把新建的节点删除
          document.body.removeChild(doc)
        })
    })
  },
}
