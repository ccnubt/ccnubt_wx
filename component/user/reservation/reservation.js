// component/reservation/reservation.js
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
    status_tag: ['已取消', '待接单', '已接单', '维修中', '维修成功，待确认', '维修失败，待确认', '待评价', '已完成']
  },

  /**
   * 组件的方法列表
   */
  methods: {
    confirm: function (e) {
      var id = e.currentTarget.dataset.id;
      var that = this;
      app.wxRequest('GET', '/user/confirm/' + id + '/', {}, function (res) {
        if (res.result_code == 1) {
          wx.showToast({
            title: '已确认',
            icon: 'success',
            duration: 1000,
          })
          that.reload();
        }
      })
    },
    cancel: function (e) {
      var id = e.currentTarget.dataset.id;
      var that = this;
      app.wxRequest('GET', '/user/cancel/' + id + '/', {}, function (res) {
        if (res.result_code == 1) {
          wx.showToast({
            title: '已取消',
            icon: 'success',
            duration: 1000,
          })
          this.reload();
        }
      })
    },
    evaluate: function(e) {
     var id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/user/evaluate/evaluate?id=' + id,
      })
    },
    reload: function(){
      wx.showLoading({
        title: '加载中',
      })
      var that = this;
      app.wxRequest('GET', '/user/myreservation/', {}, function (res) {
        console.log(res.reservations)
        if (res.result_code == 1) {
          that.setData({ reservations: res.reservations })
        }
      })
      wx.hideLoading();
    }
  },
  lifetimes: {
    attached: function(){
      this.reload();
    },
    ready: function(){
      wx.hideLoading();
    }
  }
})
