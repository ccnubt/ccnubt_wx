// component/member/order/order.js
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
      this.setData({
        current: detail.key
      });
    },
    reload: function () {
      this.selectComponent("#newreservation").reload();
    }
  }
})
