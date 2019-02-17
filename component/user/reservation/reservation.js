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
    status_tag: ['已取消', '待接单', '已接单', '维修中', '待确认', '待评价', '已完成'],
    current: 'all',
    doing:0,
    finish:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    confirm: function (e) {
      var id = e.currentTarget.dataset.id;
      var that = this;
      app.wxRequest('GET', '/user/confirm/' + id + '/', {}, function (res) {
        // console.log(res);
        if (res.result_code == 1) {
          wx.showToast({
            title: '已确认',
            icon: 'success',
            duration: 1000,
          })
          that.reload();
          // console.log("已确认");
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
          that.reload();
          console.log("已取消");
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
      // console.log("订单重新获取");
      wx.showLoading({
        title: '加载中',
      })
      var that = this;
      var num1 = 0;
      var num2 = 0;
      app.wxRequest('GET', '/user/myreservation/', {}, function (res) {
        // console.log(res.reservations)
        if (res.result_code == 1) {
          that.setData({ reservations: res.reservations })
          for (var i = 0; i < res.reservations.length; i++) {
            if (res.reservations[i].status >= 2 && res.reservations[i].status <= 5) {
              num1 = num1 + 1;
            }
            if (res.reservations[i].status == 6) {
              num2 = num2 + 1;
            }
          }
          that.setData({
            doing: num1,
            finish: num2
          })
        }
        wx.hideLoading();
      })
    },
    handleChange({ detail }) { //tabs标签页控制
      // console.log(detail.key)
      this.setData({
        current: detail.key
      });
    }
  },
  lifetimes: {
    attached: function(){
      this.reload();
    }
  }
})