import request from "@/util/request"

export function uploadAvatar(data) {
  return request({
    url: "/upload/avatar",
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  })
}

export function uploadImage(data) {
  return request({
    url: "/upload/image",
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  })
}
