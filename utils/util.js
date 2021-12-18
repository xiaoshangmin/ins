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


function loadRewardAd(adId, callBack) {
  // 在页面onLoad回调事件中创建激励视频广告实例
  if (wx.createRewardedVideoAd) {
    let rewardedVideoAd = wx.createRewardedVideoAd({
      adUnitId: adId,
    })
    rewardedVideoAd.onLoad(() => {
      console.log('激励视频 广告加载成功')
    })
    rewardedVideoAd.onError((err) => {
      console.log('激励', err)
    })
    rewardedVideoAd.onClose((res) => {
      // 用户点击了【关闭广告】按钮
      if (res && res.isEnded) {
        // 正常播放结束，可以下发游戏奖励 
        wx.showToast({
          title: '正在下载中', // 内容
          icon: 'none', // 图标
          success: (res) => {
            callBack();
          },
          fail: (res) => {},
        });
      } else {
        // 播放中途退出，不下发游戏奖励
        console.log('未看完')
      }
    });
    return rewardedVideoAd;
  }
}

function showRewardAd(obj, callBack) {
  // 用户触发广告后，显示激励视频广告
  if (obj) {
    obj.show().then(() => {
      console.log('激励视频 广告显示')
    }).catch(() => {
      // 失败重试
      obj.load()
        .then(() => obj.show())
        .catch(err => {
          callBack();
          console.log('激励视频 广告显示失败 直接下载')
        })
    })
  }
}

function loadPopupAd(adId) {
  // 在页面onLoad回调事件中创建插屏广告实例
  if (wx.createInterstitialAd) {
    let interstitialAd = wx.createInterstitialAd({
      adUnitId: adId
    })
    interstitialAd.onLoad(() => {
      console.log('插屏 广告加载成功')
    })
    interstitialAd.onError((err) => {
      console.log('插屏', err)
    })
    interstitialAd.onClose(() => {})

    // 在适合的场景显示插屏广告
    if (interstitialAd) {
      setTimeout(() => {
        interstitialAd.show().catch((err) => {
          console.error(err)
        })
      }, 2000)
    }
  }
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
  isNull,
  isString,
  isArray,
  isObject,
  inArray,
  loadRewardAd,
  showRewardAd,
  loadPopupAd
}