// component/me/me.js
var app = getApp();
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
    user_info:null
  },
  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes:{
    attached: function(){
      this.setData({
        user_info: app.globalData.user_info
      })
    }
  }
})
