var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reservations: [],
    showIndex: ' ',
    status_tag: ['已取消', '待接单', '已接单', '维修中', '成功，待确认', '失败，待确认', '待评价', '已完成']
  },
  repair: function(e){
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
            url: '/pages/user1/orderdetail/orderdetail'
          })
        }, 2000);
      }
    })
  },
  r_success: function(e){
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
            url: '/pages/user1/orderdetail/orderdetail'
          })
        }, 2000);
      }
    })
  },
  r_fail: function(e){
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
            url: '/pages/user1/orderdetail/orderdetail'
          })
        }, 2000);
      }
    })
  },
  panel: function (e) {
    if (e.currentTarget.dataset.index != this.data.showIndex) {
      this.setData({
        showIndex: e.currentTarget.dataset.index
      })
    } else {
      this.setData({
        showIndex: 0
      })
    }
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.wxRequest('GET', '/user/myorder/', {}, function (res) {
      console.log(res)
      if (res.result_code == 1) {
        that.setData({ reservations: res.reservations })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.editTabBar1();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})