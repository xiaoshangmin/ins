// pages/home/home.js
const api = require("../../utils/api");
const config = require('../../config');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotList: [],
    urls: [],
    p: 1,
    ps: 10,
    finish: false,
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
        console.log("navigateTo调用失败"+id);
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
  // onPullDownRefresh: function () { 
    // this.setData({
    //   p: 1,
    //   ps: 10,
    // })
    // this.getHotList()
  // },

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