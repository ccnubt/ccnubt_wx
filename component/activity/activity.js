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
    reload: function () {
      // console.log("活动重新获取");
      wx.showLoading({
        title: '加载中',
      })
      var that = this;
      app.wxRequest('GET', '/user/activity/', {}, function (res) {
        // console.log(res.activites)
        if (res.result_code == 1) {
          that.setData({ activities:res.activities })
        }
      })
      wx.hideLoading();
    }
  },
  lifetimes: {
    attached: function () {
      this.reload();
    },
    ready: function () {
      wx.hideLoading();
    }
  }
})
