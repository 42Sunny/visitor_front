import { Avatar } from '@material-ui/core';

export const getStateAvatar = (state) => {
  if (state === "wait")
    return <Avatar>대기</Avatar>;
  if (state === "reject")
    return <Avatar style={{ backgroundColor: "red" }}>거절</Avatar>;
  if (state === "progress")
    return <Avatar style={{ backgroundColor: "#009b00" }}>진행</Avatar>;
  if (state === "accept")
    return <Avatar style={{ backgroundColor: "#cbcb00" }}>수락</Avatar>;
  if (state === "finish")
    return <Avatar style={{ backgroundColor: "black" }}>종료</Avatar>;
    if (state === "cancel")
    return <Avatar style={{ backgroundColor: "black" }}>취소</Avatar>;
  return null;
}
