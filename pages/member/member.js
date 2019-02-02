// pages/member/member.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: "order"
  },
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.page)
      this.setData({ current: options.page })
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
    var that = this;
    if(that.data.current == 'order'){
      // console.log("我是接单");
      that.selectComponent("#order").reload();
    }
    else if (that.data.current == 'reservation') {
      // console.log("我是订单状态");
      that.selectComponent("#reservation").reload();
    }
    else if (that.data.current == 'activity') {
      // console.log("我是活动界面");
      that.selectComponent("#activity").reload();
    }
    else if(that.data.current == 'summary'){
      // console.log("我是统计界面");
      that.selectComponent("#summary").reload();
    }
    else {
      // console.log("我是我界面");
    }
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