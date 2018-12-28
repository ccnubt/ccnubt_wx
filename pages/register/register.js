Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[
      {name:'male',value:'男'},
      {name:'female',value:'女'}
    ],
    info:{
      name:null,
      phone:null,
      sex:null,
      qq:null
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    
  },

  radioChange(e){
    console.log('radio发生change事件',e.detail.value)
    var tinfo = this.data['info'];
    tinfo.sex = e.detail.value;
    this.setData({
      info:tinfo
    })
  },

  nameInput(e){
    var tinfo = this.data['info'];
    tinfo.name = e.detail.value;
    this.setData({
      info: tinfo
    })
  },

  phoneInput(e){
    var tinfo = this.data['info'];
    tinfo.phone = e.detail.value;
    this.setData({
      info: tinfo
    })
  },

  qqInput(e){
    var tinfo = this.data['info'];
    tinfo.qq = e.detail.value;
    this.setData({
      info: tinfo
    })
  },

  commitInfo:function(){
    console.log(this.data);
    console.log(this.data['info']);
    var agr;
    var that = this;
    wx.getStorage({
      key: 'api_key',
      success: function (res) {
        console.log('api_key'+res.data)
        agr=res.data
        console.log('agr' + agr);
        wx.request({
          url: 'https://bt.yuancl.site/auth/register/?api_key=' + agr,
          method: 'POST',
          data: {
            info: that.data['info']
          },
          success(res) {
            console.log(res.data)
          }
        })
      },
    })
  }
})