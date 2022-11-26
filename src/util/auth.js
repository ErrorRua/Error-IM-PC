import Cookies from "js-cookie"

const TokenKey = "error_im_token"
const TimestampKey = "error_im_timestamp"

export function getTimestamp() {
  return Cookies.get(TimestampKey)
}

export function setTimestamp() {
  return Cookies.set(TimestampKey, Date.now())
}

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
