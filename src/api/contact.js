import request from "@/util/request"

export function getContactList() {
  return request({
    url: "/contact/list-friend",
    method: "get",
  })
}

export function getFriendRequestList() {
  return request({
    url: "/contact/list-request",
    method: "get",
  })
}

export function addFriendRequest(data) {
  return request({
    url: "/contact/add-friend",
    method: "post",
    data,
  })
}

export function acceptFriendRequest(id) {
  return request({
    url: `/contact/accept-add-friend/${id}`,
    method: "put",
  })
}

export function rejectFriendRequest(id) {
  return request({
    url: `/contact/refuse-add-friend/${id}`,
    method: "put",
  })
}

export function deleteFriend(id) {
  return request({
    url: `/contact/delete-friend/${id}`,
    method: "delete",
  })
}

export function searchUser(params) {
  return request({
    url: "/contact/search-user",
    method: "get",
    params,
  })
}
