var app = getApp()
const { $Toast } = require('../../../dist/base/index');
const { $Message } = require('../../../dist/base/index');
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
    Length: 8, //输入框个数
    isFocus: true, //聚焦
    Value: "", //输入的内容
    ispassword: false, //是否密文显示 true为密文， false为明文。
  },

  /**
   * 组件的方法列表
   */
  methods: {
    Focus: function(e) {
      var that = this;
      // console.log(e.detail.value);
      var inputValue = e.detail.value;
      that.setData({
        Value: inputValue,
      })
    },
    Tap: function() {
      var that = this;
      that.setData({
        isFocus: true,
      })
    },
    formSubmit: function(e) {
      var that = this;
      var code = String(e.detail.value.code) 
      app.wxRequest('GET','/user/receive/',{code}, function(res){
        if (res.result_code == 1){
          $Toast({
            content: '成功',
            icon: 'success',
            duration: 0
          });
          setTimeout(() => {
             $Toast.hide();
             wx.redirectTo({
               url: '/pages/member/member?page=reservation',
             })
          }, 2000);
        }
        else{
          $Message({
            content: '接单码错误或已过期',
            type: 'warning',
            duration: 3
          });
          that.setData({
            Value: ''
          })
        }
      }) 
    }
  }
})