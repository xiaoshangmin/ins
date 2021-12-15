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

//自动判断类型并判断类型是否为空
function isNull(value) {
  if (value == null || value == undefined) return true
  if (this.isString(value)) {
    if (value.trim().length == 0) return true
  } else if (this.isArray(value)) {
    if (value.length == 0) return true
  } else if (this.isObject(value)) {
    for (let name in value) return false
    return true
  }
  return false;
}
//判断字符串是否空
function isString(value) {
  return value != null && value != undefined && value.constructor == String
}
//判断数组是否空
function isArray(value) {
  return value != null && value != undefined && value.constructor == Array
}
//判断对象是否空
function isObject(value) {
  return value != null && value != undefined && value.constructor == Object
}

/**
 * 判断是否有某个值
 */
function inArray(arr, value) {
  if (arr.indexOf && typeof (arr.indexOf) == 'function') {
    var index = arr.indexOf(value);
    if (index >= 0) {
      return true;
    }
  }
  return false;
}

const jump = data => {
  let url = '';
  if (1 == data.jump_type) { //网页
    url = `/pages/webview/webview?url=${data.web_url}`;
  } else if (2 == data.jump_type) {
    url = data.mini_url;
  } else if (3 == data.jump_type) {
    wx.navigateToMiniProgram({
      appId: data.mini_appid,
      success(res) {}
    })
    return;
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
  jump,
  isNull: isNull,
  isString: isString,
  isArray: isArray,
  isObject: isObject,
  inArray: inArray
}