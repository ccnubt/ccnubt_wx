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
    repair: function (e) {
      var id = e.currentTarget.dataset.id;
      app.wxRequest('GET', '/user/repair/' + id + '/', {}, function (res) {
        if (res.result_code == 1) {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000,
          })
          setTimeout(function () {
            wx.reLaunch({
              url: '/pages/member/member?page=reservation'
            })
          }, 2000);
        }
      })
    },
    r_success: function (e) {
      var id = e.currentTarget.dataset.id;
      app.wxRequest('GET', '/user/finish/' + id + '/', {}, function (res) {
        if (res.result_code == 1) {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000,
          })
          setTimeout(function () {
            wx.reLaunch({
              url: '/pages/member/member?page=reservation'
            })
          }, 2000);
        }
      })
    },
    r_fail: function (e) {
      var id = e.currentTarget.dataset.id;
      app.wxRequest('GET', '/user/unfinish/' + id + '/', {}, function (res) {
        if (res.result_code == 1) {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000,
          })
          setTimeout(function () {
            wx.reLaunch({
              url: '/pages/member/member?page=reservation'
            })
          }, 2000);
        }
      })
    }
  },
  lifetimes: {
    attached: function(){
      var that = this;
      app.wxRequest('GET', '/user/myorder/', {}, function (res) {
        console.log(res.reservations)
        if (res.result_code == 1) {
          that.setData({ reservations: res.reservations })
        }
      })
    }
  }
})
