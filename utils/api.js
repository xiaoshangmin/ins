const session = require("session");
const config = require('../config');
const app = getApp()
/**
 * 简单封装
 */
const request = (url, data, method, load, auth) => {

  if (load) {
    // wx.showNavigationBarLoading();
    wx.showLoading({
      title: 'Loading...',
      icon: 'none'
    })
  }
  let sign = getSign(data)
  data.sign = sign
  console.log(data)
  return new Promise((resolve, reject) => {
    wx.request({
      url: (auth ? config.api.auth_url : config.api.base_url) + url,
      data: data,
      method: method,
      timeout: 15000,
      header: {
        'scopes': 'mini_program',
        'content-type': 'application/json', //默认 application/json :数据序列化
        "token": session.get('token') || '',
        'request-app': config.saas.serve_id,
      },
      success(res) {
        console.log(`==============\n请求方法：${method};\n请求参数：${JSON.stringify(data)};\n返回：${JSON.stringify(res)};\n==============`)
        if (res.statusCode === 200) {
          resolve(res.data.data)
        } else {
          reject(res)
        }
      },
      fail(err) {
        console.log(err)
        reject(err)
        wx.showModal({
          title: '温馨提示',
          content: '网络请求失败,稍后再试',
          showCancel: false
        })
      },
      complete(res) {
        if (load) {
          // wx.hideNavigationBarLoading()
          wx.hideLoading();
        }
      }
    })
  })
}
const getSign = obj => {
  let keys = Object.keys(obj)
  keys.sort()
  let params = []
  keys.forEach(e => {
    if (obj[e] != null) {
      params.push(e + '=' + obj[e])
    }
  })
  params.push('key=' + config.saas.serve_id)
  let paramStr = params.join('&')
  const md5Util = require('./md5.js')
  let signResult = md5Util.md5(paramStr).toUpperCase()
  return signResult
}
/**
 * 
 * @param {*} url 
 * @param {*} data 
 * @param {*} load 是否显示loading
 */
const get = (url, data = {}, load = false) => {
  return request(url, data, 'GET', load)
}
const post = (url, data = {}, load = false) => {
  return request(url, data, 'POST', load, false)
} 
const auth = (url, data = {}, load = false) => {
  return request(url, data, 'POST', load, true)
}

module.exports = {
  get,
  post,
  auth,
  request
}