// pages/home/home.js
const api = require("../../utils/api");
const config = require('../../config');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    urls: [{
      url: 'http://cdn.wowyou.cc/Fg3eMJmd953weKdCMSr31M0CqKQV',
      key: 'key1'
    }, {
      url: 'http://cdn.wowyou.cc/Fg3eMJmd953weKdCMSr31M0CqKQV',
      key: 'key2',
      value: 2
    }, {
      url: 'http://cdn.wowyou.cc/Fg3eMJmd953weKdCMSr31M0CqKQV',
      key: 'key2',
      value: 2
    }, {
      url: 'http://cdn.wowyou.cc/Fg3eMJmd953weKdCMSr31M0CqKQV',
      key: 'key2',
      value: 2
    }, {
      url: 'http://cdn.wowyou.cc/Fg3eMJmd953weKdCMSr31M0CqKQV',
      key: 'key2',
      value: 2
    }]
  },

  toUser() {
    wx.navigateTo({
      url: '../user/user',
    })
  },
  download(e) {
    let src = e.currentTarget.dataset.src
    let arr = src.split(',')
    let self = this
    // 相册授权
    wx.getSetting({
      success(res) {
        // 进行授权检测，未授权则进行弹层授权
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              for (let index in arr) {
                self.saveImage(arr[index])
              }
            },
            // 拒绝授权时，在下载按钮上面增加打开手机设置按钮
            fail() {
              console.log('拒绝授权')
            }
          })
        } else {
          console.log('已经授权')
          for (let index in arr) {
            self.saveImage(arr[index])
          }
        }
      },
      fail(res) {
        console.log(res);
      }
    })
  },

  saveImage(path) {
    wx.getImageInfo({
      src: path,
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.path,
          success: function (fres) {
            console.log(fres)
            wx.showToast({
              title: 'ok',
            })
          }
        })
      }
    })
  },
  getList() {
    api.post(config.api.list).then(res => {
      console.log(res)
      if (0 == res.code) {
        this.setData({
          list: res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
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