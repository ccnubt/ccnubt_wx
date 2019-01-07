// pages/evaluate/evaluate.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({id:options.id})
    console.log(this.data.id)
  },
  formSubmit: function(e){
    var score = e.detail.value.score;
    var e = e.detail.value.evaluation;
    var id = this.data.id;
    console.log(score+" "+e);
    app.wxRequest('POST','/user/evaluate/'+id+'/',{score:score,evaluation:e},function(res){
      if (res.result_code==1){
        wx.showToast({
          title: '评价成功',
          icon: 'success',
          duration: 10000,
        })
        wx.reLaunch({
          url: '/pages/user0/reservationdetail/reservationdetail',
        });
      }
      else{
        wx.showToast({
          title: 'warm',
          icon: '服务器错误',
          duration: 2000
        })
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