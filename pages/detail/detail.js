const api = require("../../utils/api");
const session = require("../../utils/session");
const config = require("../../config");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    url: '',
    page_bottom_ad: '',
    create_ad_id: '',
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
            success: (res) => {
              // self.downloadFile()
              wx.showModal({
                title: '激励提示', // 标题
                content: '观看视频下载图片', // 内容
                showCancel: true,
                confirmText: '确定', // 确定按钮的文案，最多 4 个字符
                cancelText: '取消', // 取消按钮的文案，最多 4 个字符
                success: (res) => {
                  if (res.confirm) {
                    this.getAd()
                  }
                },
                fail: (res) => {

                },
              });
            },
            // 拒绝授权时，在下载按钮上面增加打开手机设置按钮
            fail() {
              console.log('拒绝授权')
            }
          })
        } else {
          console.log('已经授权')
          // self.downloadFile()
          this.getAd()
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
  //插屏广告
  createInterstitialAd() {
    const interstitialAd = wx.createInterstitialAd({
      adUnitId: session.get('advertConfig').detail_popup_ad,
    });

    interstitialAd
      .load()
      .then(() => {
        interstitialAd.show();
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getAd() {
    console.log(this.data.create_ad_id)
    const videoAd = wx.createRewardedVideoAd({
      adUnitId: this.data.create_ad_id,
    });
    videoAd.onClose(({
      isEnded
    }) => {
      if (isEnded) {
        // 给予奖励 
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
        console.log('未看完')
      }
    });
    videoAd.show()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      url: options.url,
      page_bottom_ad: !session.get('advertConfig').detail_bottom_ad ? '' : session.get('advertConfig').detail_bottom_ad,
      create_ad_id: !session.get('advertConfig').download_reward_ad ? '' : session.get('advertConfig').download_reward_ad,
    })
    if (session.get('advertConfig').detail_popup_ad) {
      this.createInterstitialAd()
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