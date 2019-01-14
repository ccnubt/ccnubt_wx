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
    code: 'xxxxxx',
    time: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadcode: function(){
      var that = this;
      var code = that.data.code
      app.wxRequest('GET','/user/mycode/',{param: {code}},function(res){
        if (res.result_code==1){
          that.setData({
            time: new Date().getTime()+30000,
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
