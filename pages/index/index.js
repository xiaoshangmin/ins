// pages/home/home.js
const api = require("../../utils/api");
const util = require("../../utils/util");
const session = require("../../utils/session");
const config = require('../../config');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotList: [], 
    bannerList: [],
    finish: false,
  },
  getConfig() {
    api.get(config.api.config).then(res => {
      console.log(res.data)
      session.set('systemConfig', res.data.system_config);
      session.set('advertConfig', res.data.advert_config);
      session.set('bannerConfig', res.data.banner_config);
      this.setData({
        bannerList: res.data.banner_config
      })
    })
  },
  clickSwiperItem(e) {
    console.log(e)
    let bannerId = e.currentTarget.dataset.bannerId
    let bannerConfig = this.data.bannerList[bannerId]
    console.log(bannerConfig)
    util.jump(bannerConfig)
},
  getHotList() {
    api.get(config.api.hot).then(res => {
      console.log(res)
      this.setData({
        hotList: res.data
      })
    }).catch(res => {

    });
  },
  onItemClick(event) {
    console.log(event)
    var id = event.currentTarget.dataset.id;
    var url = event.currentTarget.dataset.src;
    wx.navigateTo({
      url: `/pages/detail/detail?url=${url}`,
      success(res) {
        console.log(res);
      },
      fail(res) {
        console.log("navigateTo调用失败" + id);
      },
    });
  },
  toSearch() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getConfig();
    this.getHotList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    return;
    this.setData({
      p: this.data.p + 1,
    })
    if (!this.data.finish) {
      this.getHotList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})