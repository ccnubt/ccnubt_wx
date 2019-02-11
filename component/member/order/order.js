// component/member/order/order.js
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
    current: 'newreservation'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleChange({ detail }) {
      var that = this;
      this.setData({
        current: detail.key
      });
      
      if (that.data.current == 'receive' && getApp().globalData.first == 1){
        $Toast({
          content: '请输入8位接单码转接业务，点按空白处关闭',
          type: 'warning',
          duration: 10
        });
      }
    },
    reload: function () {
      var that = this;
      // console.log(that.data.current);
      if(that.data.current == 'newreservation') this.selectComponent("#newreservation").reload();
      else if(that.data.current == 'code') this.selectComponent('#code').reload();
      else if(that.data.current == 'receive') this.selectComponent('#receive').reload();
    }
  }
})
