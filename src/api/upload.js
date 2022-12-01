import request from "@/util/requets"

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
