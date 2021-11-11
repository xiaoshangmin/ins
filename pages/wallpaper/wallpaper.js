const api = require("../../utils/api");
const config = require("../../config");
Page({
    data: {
        id: 0,
        url: '',
    },
    onLoad: function(options) {
        console.log(options)
        this.setData({
            id: options.id
        })
        this.getDetail()
    },
    onShareAppMessage: function() {
        // return custom share data when user share.
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
          success(res) {
            // 进行授权检测，未授权则进行弹层授权
            if (!res.authSetting['scope.writePhotosAlbum']) {
              wx.authorize({
                scope: 'scope.writePhotosAlbum',
                success() {
                  self.downloadFile() 
                },
                // 拒绝授权时，在下载按钮上面增加打开手机设置按钮
                fail() {
                  console.log('拒绝授权')
                }
              })
            } else {
              console.log('已经授权')
              self.downloadFile() 
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
      }
})