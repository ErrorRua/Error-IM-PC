import request from "@/util/request"

export function getContactList() {
  return request({
    url: "/contact/list-friend",
    method: "get",
  })
}

export function addFriend(data) {
  return request({
    url: "/contact/add-friend",
    method: "post",
    data,
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
