const api = require("../../utils/api");
const session = require("../../utils/session");
const config = require("../../config");
let rewardedVideoAd = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    url: '',
    page_bottom_ad: '',
    download_reward_ad: '',
  },
  getDetail() {
    let url = config.api.detail + '/' + this.data.id
    api.get(url).then(res => {
      console.log(res)
      this.setData({
        url: res.data.url
      })
    }).catch(res => {

    });
  },
  saveImageToPhotosAlbum(e) {
    let self = this
    // 相册授权
    wx.getSetting({
      success: (res) => {
        // 进行授权检测，未授权则进行弹层授权
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: (res) => {},
            // 拒绝授权时，在下载按钮上面增加打开手机设置按钮
            fail() {
              console.log('拒绝授权')
            }
          })
        } else {
          console.log('已经授权')
          wx.showModal({
            title: '激励提示', // 标题
            content: '观看视频下载图片', // 内容
            showCancel: true,
            confirmText: '确定', // 确定按钮的文案，最多 4 个字符
            cancelText: '取消', // 取消按钮的文案，最多 4 个字符
            success: (res) => {
              if (res.confirm) {
                this.showRewardAd()
              }
            },
            fail: (res) => {

            },
          });
        }
      },
      fail(res) {
        console.log(res);
      }
    })
  },

  downloadFile() {
    wx.getImageInfo({
      src: this.data.url,
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
  loadRewardAd() {
    // 在页面onLoad回调事件中创建激励视频广告实例
    if (wx.createRewardedVideoAd) {
      rewardedVideoAd = wx.createRewardedVideoAd({
        adUnitId: this.data.download_reward_ad,
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
              this.downloadFile();
            },
            fail: (res) => {

            },
          });
        } else {
          // 播放中途退出，不下发游戏奖励
          console.log('未看完')
        }
      })
    }
  },
  showRewardAd() {
    // 用户触发广告后，显示激励视频广告
    if (rewardedVideoAd) {
      rewardedVideoAd.show().then(() => {
        console.log('激励视频 广告显示')
      }).catch(() => {
        // 失败重试
        rewardedVideoAd.load()
          .then(() => videoAd.show())
          .catch(err => {
            this.downloadFile();
            console.log('激励视频 广告显示失败 直接下载')
          })
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      url: options.url,
      page_bottom_ad: !session.get('advertConfig').detail_bottom_ad ? '' : session.get('advertConfig').detail_bottom_ad,
      download_reward_ad: !session.get('advertConfig').download_reward_ad ? '' : session.get('advertConfig').download_reward_ad,
    })
    if (session.get('advertConfig').download_reward_ad) {
      this.loadRewardAd()
    }
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