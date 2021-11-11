// pages/search/search.js
const api = require("../../utils/api");
const config = require('../../config');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: "",
    showPopover: 'none',
    typename: "表情",
    type: "feel",
    finised_text: '暂时只有这么多了',
    finished: false,
    p: 1,
    ps: 10,
    list: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSearchList()
  },
  onSearch() {
    console.log(this.data.inputValue, this.data.type)
    if (!this.data.inputValue) {
      wx.showToast({
        title: '请输入查询的内容',
        icon: 'none',
      });
      return;
    }
    this.setData({
      finished: false
    })
    this.getSearchList();

  },
  getSearchList() {
    let data = {
      p: 1,
      ps: 10,
      keyword: this.data.inputValue,
      type: this.data.type
    }
    api.post(config.api.list, data).then(res => {
      console.log(res)
      this.setData({
        list: res.data
      })
    }).catch(res => {

    });
  },
  handleInput(event) {
    const value = event.detail;
    this.setData({
      inputValue: value,
    });
  },
  onItemClick(event) {
    console.log(event)
    var id = event.target.dataset.id;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    });
  },
  onWallpaperItemClick(event) {
    console.log(event)
    var id = event.target.dataset.id;
    wx.navigateTo({
      url: `/pages/wallpaper/wallpaper?id=${id}`
    });
  },
  onClickType() {
    if (this.data.showPopover == 'block') {
      this.setData({
        showPopover: 'none'
      })
    } else {
      this.setData({
        showPopover: 'block'
      })
    }
  },
  onClickPopover(event) {
    let type = event.target.dataset.type
    let name = event.target.dataset.name
    console.log(type)
    this.setData({
      showPopover: 'none',
      typename: name,
      type: type
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
    if (this.data.finished) {
      return;
    }
    this.setData({
      finished: true
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})