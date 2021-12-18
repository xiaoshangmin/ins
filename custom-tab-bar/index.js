// pages/custom-tab-bar /index.js
Component({
  data: {
    active: 0,
    list: [
      {
        "url": "/pages/index/index",
        "icon": "wap-home-o",
        "active_icon": "wap-home",
        "text": ""
      },
      {
        "url": "/pages/search/search",
        "icon": "search",
        "active_icon": "search",
        "text": ""
      }
    ]
  },
  methods: {
    onChange(e) {
      console.log(e, 'e')
      this.setData({
        active: e.detail
      });
      wx.switchTab({
        url: this.data.list[e.detail].url
      });
    },
    init() {
      const page = getCurrentPages().pop();
      this.setData({
        active: this.data.list.findIndex(item => item.url === `/${page.route}`)
      });
    }
  }
});