// pages/search/search.js
const api = require("../../utils/api");
const config = require('../../config');
const utils = require("../../utils/util");
const session = require("../../utils/session"); 
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
    ps: 20,
    list: [],
    list_type: '',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSearchList()
    if (session.get('advertConfig').detail_popup_ad) {
      utils.loadPopupAd(session.get('advertConfig').detail_popup_ad)
    }
  },
  onSearch() {
    // if (!this.data.inputValue) {
    //   wx.showToast({
    //     title: '请输入查询的内容',
    //     icon: 'none',
    //   });
    //   return;
    // }
    this.setData({
      p: 1,
      list: [],
      finished: false
    })
    this.getSearchList();

  },
  getSearchList() {
    let data = {
      p: this.data.p,
      ps: this.data.ps,
      keyword: this.data.inputValue,
      type: this.data.type
    }
    let list = this.data.list
    api.post(config.api.list, data, true).then(res => {
      list = list.concat(res.data.list)
      this.setData({
        list,
        list_type: res.data.type
      })
      if (res.data.total <= this.data.p) {
        this.setData({
          finished: true
        })
      }
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
    let id = event.target.dataset.id;
    let url = event.target.dataset.src;
    wx.navigateTo({
      url: `/pages/detail/detail?url=${url}`
    });
  },
  onWallpaperItemClick(event) {
    console.log(event)
    let id = event.target.dataset.id;
    let url = event.target.dataset.src;
    wx.navigateTo({
      url: `/pages/wallpaper/wallpaper?url=${url}`
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
    if (!this.data.finished) {
      this.setData({
        p: this.data.p + 1,
      })
      this.getSearchList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})