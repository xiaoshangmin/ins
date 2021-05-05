// pages/search/search.js
const api = require("../../utils/api");
const config = require('../../config');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainActiveIndex: 0,
    activeId: [],
    leftItems: [{
      // 导航名称
      text: '所有',
    }, ],
    rightItems: [],
  },
  onClickNav(e) {
    let detail = this.data.leftItems[e.detail.index]
    this.getUserList(detail.id)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    api.post(config.api.classification).then(res => {
      console.log(res)
      if (0 == res.code) {
        this.setData({
          leftItems: res.data
        })
      }
    })
    this.getUserList(1)
  },

  getUserList(classId) {
    api.post(config.api.userList, {
      classId
    }).then(res => {
      console.log(res)
      if (0 == res.code) {
        this.setData({
          rightItems: res.data
        })
      }
    })
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
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})