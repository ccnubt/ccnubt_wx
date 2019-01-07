const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_info: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('输出一下'+getApp().globalData.user_info)
    this.setData({
      user_info: app.globalData.user_info
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (this.data.user_info != null) {
      if (this.data.user_info.role == 0)
        app.editTabBar();
      else
        app.editTabBar1();
    }else{
      this.setData({
        user_info:app.globalData.user_info
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})