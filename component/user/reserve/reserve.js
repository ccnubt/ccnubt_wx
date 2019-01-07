// component/reserve.js
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
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    commit: function(e){
      var detail = e.detail.value.detail;
      app.wxRequest('POST', '/user/reserve/', { detail}, function (res) {
        if (res.result_code == 1) {
          
          wx.showToast({
            title: '预约成功',
          })
          wx.redirectTo({
            url: '/pages/user/user?page=reservation',
          })
        }
      })
    }
  }
})
