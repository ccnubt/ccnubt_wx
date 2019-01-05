var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reservations:[],
    status_tag: ['已取消', '待接单', '已接单', '维修中', '维修成功', '维修失败', '待评价', '已完成']
  },

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