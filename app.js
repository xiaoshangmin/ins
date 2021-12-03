// app.js
const api = require("./utils/api");
const config = require("/config");
App({
  onLaunch() {

    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     console.log(res)
    //   }
    // })
    this.getConfig()
  },
  getConfig() {
    api.get(config.api.config).then(res => {
      wx.setStorageSync('config', res.data);
      this.globalData.system_config = res.data.system_config;
      this.globalData.adver_config = res.data.adver_config;
    })
  },
  globalData: {
    system_config: [],
    adver_config: [],
  }
})