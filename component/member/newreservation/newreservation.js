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
    reservations: [],
    current: 'reservation'
  },

  /**
   * 组件的方法列表
   */
 
  methods: {
    handleChange({ detail }) {
      this.setData({
        current: detail.key
      });
    },
    orderthis: function(e){
      var id = e.currentTarget.dataset.id;
      var that = this;
      app.wxRequest('GET', '/user/order/' + id + '/', {}, function (res) {
        if (res.result_code == 1) {
          wx.showToast({
            title: '接单成功',
            icon: 'success',
            duration: 1000
          })
          that.reload();
        }
      })
    },
    reload: function(){
      var that = this;
      // that.setData({ loading: true });
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
      // that.setData({ loading: false });
    }
  },
  lifetimes: {
    attached: function(){
      console.log("加载");
      this.reload();
    },
    ready: function () {
      wx.hideLoading();
    }
  }
})
