var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reservations:[],
    showIndex: ' ',
    status_tag: ['已取消', '待接单', '已接单', '维修中', '维修成功，待确认', '维修失败，待确认', '待评价', '已完成'],
    ev:'',
    score: ''
  },
  confirm: function(e){
    var id = e.currentTarget.dataset.id;
    app.wxRequest('GET','/user/confirm/'+id+'/',{},function(res){
      if (res.result_code==1){
        wx.showToast({
          title: '已确认',
          icon: 'success',
          duration: 2000,
        })
        wx.reLaunch({
          url: 'reservationdetail',
        })
      }
    })
  }
  ,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.wxRequest('GET','/user/myreservation/',{},function(res){
      console.log(res.reservations)
      if (res.result_code == 1){
        that.setData({reservations: res.reservations})
      }
    })
  },
  evaluate: function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/user0/evaluate/evaluate?id='+id,
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
  },  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.editTabBar();
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