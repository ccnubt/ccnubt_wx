// component/member/order/order.js
var app = getApp();
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
    reservations: []
  },

  /**
   * 组件的方法列表
   */
 
  methods: {

  },
  lifetimes: {
    attached: function(){
      var that = this;
      that.setData({ loading: true });
      wx.showLoading({
        title: '加载中',
      })
      app.wxRequest('GET', '/user/unorder/', {}, function (res) {
        console.log(res)
        if (res.result_code == 1) {
          that.setData({ reservations: res.reservations })
        }
      })
      wx.hideLoading();
      that.setData({ loading: false });
    }
  }
})
