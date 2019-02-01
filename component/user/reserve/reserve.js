// component/reserve.js
var app = getApp();
const {
  $Toast
} = require('../../../dist/base/index');
const {
  $Message
} = require('../../../dist/base/index');

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
    current: 'reserve',
    Length: 6, //输入框个数
    isFocus: true, //聚焦
    Value: "", //输入的内容
    ispassword: false, //是否密文显示 true为密文， false为明文。
    bt_info: null,
    status: 0,
    code: null,
    empty:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    isEmpty:function(e){
      var that = this;
      console.log(e.detail.value);
      if(e.detail.value == ""){
        that.setData({
          empty: true
        });
        $Message({
          content: '问题描述不能为空',
          type: 'error',
          duration: 5
        });
      }else{
        that.setData({
          empty:false
        })
      }

    },
    commit: function(e) {
      console.log(e);
      var detail = e.detail.value.detail;
      var formid = e.detail.formId;
      console.log(formid)
      app.wxRequest('POST', '/user/reserve/', {
        detail,
        formid
      }, function(res) {
        if (res.result_code == 1) {
          $Toast({
            content: '预约成功',
            type: 'success',
            duration: 1
          });
          wx.redirectTo({
            url: '/pages/user/user?page=reservation',
          })
        } else if (res.result_code == 2) {
          $Message({
            content: '您还有未完成订单',
            type: 'error',
            duration: 5
          });
        }
      })
    },
    handleChange({
      detail
    }) {
      this.setData({
        current: detail.key
      });
      if(detail.key != 'reserve'){
        $Toast({
          content: '请输入奔腾队员发给您的6位接单码，单击空白区域关闭',
          type: 'warning',
          duration: 12
        });
      }
    },
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
      var code = String(e.detail.value.code)
      var that = this;
      app.wxRequest('GET', '/user/reservecode/', {
        code
      }, function(res) {
        if (res.result_code == 1) {
          that.setData({
            code: res.code,
            bt_info: res.bt_info,
            status: 1
          })
        } else {
          $Message({
            content: '接单码错误或已过期',
            type: 'warning',
            duration: 3
          });
          // e.detail.value.code = '';
          that.setData({
            Value: ''
          })
        }
      })
    },
    commit_code: function(e) {
      var detail = e.detail.value.detail;
      var that = this;
      app.wxRequest('POST', '/user/reservecode/', {
        detail: detail,
        code: that.data.code
      }, function(res) {
        if (res.result_code == 1) {
          $Toast({
            content: '预约成功',
            type: 'success',
            duration: 1
          });
          that.setData({
            status: 0
          })
          wx.redirectTo({
            url: '/pages/user/user?page=reservation',
          })
        } else {
          $Message({
            content: '系统或会话已过期',
            type: 'warning',
            duration: 5
          });
          that.setData({
            status: 0
          })
        }
      })
    }
  }
})