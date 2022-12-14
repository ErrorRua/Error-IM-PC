import request from "@/util/request"

export function ackUnreadMessage(fromUserId) {
  return request({
    url: "/chat/ack-offline-message",
    method: "post",
    data: {
      fromUserId,
    },
  })
}
