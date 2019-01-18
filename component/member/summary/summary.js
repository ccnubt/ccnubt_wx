// component/member/summary/summary.js
var app = getApp()
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
    summary:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    reload: function(){
      var that = this;
      app.wxRequest('GET','/user/summary/',{},function(res){
        if (res.result_code==1){
          console.log(res.data)
          that.setData({
            summary: res.data
          })
        }
      })
    }
  },
  lifetimes:{
    attached: function(){
      this.reload();
    }
  }
})
