// component/member/code/code.js
var app = getApp()
const { $Toast } = require('../../../dist/base/index');
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
    code: '------',
    time: 0,
    timer: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    settime: function(){
      var time = new Date().getTime() + 300000;
      this.setData({
        timer: false
      })
      this.setData({
        time: time,
        timer: true
      })
    },
    loadcode: function(){
      var that = this;
      var code = that.data.code;
      app.wxRequest('GET','/user/mycode/',{code:code},function(res){
        if (res.result_code==1){
          that.settime();
          that.setData({
            code: res.code
          })
        }
        else {
          $Toast({
            content: '获取失败',
            type: 'error'
          });
          setTimeout(() => {
            $Toast.hide();
          }, 2000);
        }
      }, function(){
        $Toast({
          content: '获取失败',
          type: 'error'
        });
        setTimeout(() => {
          $Toast.hide();
        }, 2000);
      })
    }
  },
  attached: function(){
    this.loadcode();
  }
})
