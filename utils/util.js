const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const jump = data => {
  let url = '';
  if (1 == data.jump_type) { //网页
    url = `/pages/webview/webview?url=${url}`;
  } else if (2 == data.jump_type) {
    url = `/pages/detail/detail?url=${url}`;
  }

  wx.navigateTo({
    url: url,
    success(res) {
      console.log(res);
    },
    fail(res) {
      console.log("navigateTo调用失败", res);
    },
  });
}

module.exports = {
  formatTime,
  jump
}