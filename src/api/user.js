import request from "@/util/requets"

export function login(data) {
  return request({
    url: "/user/login",
    method: "post",
    data,
  })
}

export function getInfo() {
  return request({
    url: `/user/info`,
    method: "get",
  })
}

export function getInfoById(userid) {
  return request({
    url: `/user/info/${userid}`,
    method: "get",
  })
}

export function updateInfo(data) {
  return request({
    url: "/user/info",
    method: "put",
    data,
  })
}

export function logout() {
  return request({
    url: "/user/logout",
    method: "post",
  })
}

export function register(data) {
  return request({
    url: "/user/register",
    method: "post",
    data,
  })
}

export function getVerifyCode() {
  return request({
    url: "/user/get-code",
    method: "get",
  })
}

export function getEmailVerifyCode(params) {
  return request({
    url: "/user/get-email-code",
    method: "get",
    params,
  })
}

export function verifyEmail(data) {
  return request({
    url: "/user/verify-email",
    method: "post",
    data,
  })
}
