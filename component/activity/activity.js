// component/Activity/Activity.js
var app =getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    activities:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes: {
    attached: function () {
      wx.showLoading({
        title: '加载中',
      })
      var that = this;
      app.wxRequest('GET', '/user/activity/', {}, function (res) {
        console.log(res)
        if (res.result_code == 1) {
          that.setData({ activities: res.activities })
        }
      })
    },
    ready: function () {
      wx.hideLoading();
    }
  }
})
