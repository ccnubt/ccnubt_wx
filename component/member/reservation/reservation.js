// component/reservation/reservation.js
var app = getApp();
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
    reservations: [],
    status_tag: ['已取消', '待接单', '已接单', '维修中', '待确认', '待评价', '已完成'],
    code_visible: false,
    transfer_code: null,
    current: 'all',
    doing:0,
    finish:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    repair: function (e) {
      var id = e.currentTarget.dataset.id;
      var that = this;
      app.wxRequest('GET', '/user/repair/' + id + '/', {}, function (res) {
        if (res.result_code == 1) {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 1000,
          })
          that.reload();
        }
      })
    },
    code_hide: function(){
      this.setData({ code_visible: false })
    },
    r_transfer: function(e){
      var id = e.currentTarget.dataset.id;
      var that = this;
      app.wxRequest('GET', '/user/transfer/' + id + '/', {}, function (res) {
        if (res.result_code==1){
          that.setData({
            code_visible: true,
            transfer_code: res.code
          })
        }
        else{
          $Toast({
            content: '获取失败',
            type: 'error'
          });
          setTimeout(() => {
            $Toast.hide();
          }, 2000);
        }
        console.log(res)
      })
    },
    r_success: function (e) {
      var id = e.currentTarget.dataset.id;
      var that = this;
      app.wxRequest('GET', '/user/finish/' + id + '/', {
        solved: true
      }, function (res) {
        if (res.result_code == 1) {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 1000,
          })
          that.reload();
        }
      })
    },
    r_fail: function (e) {
      var id = e.currentTarget.dataset.id;
      var that = this;
      app.wxRequest('GET', '/user/finish/' + id + '/', {
        solved: false
      }, function (res) {
        if (res.result_code == 1) {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 1000,
          })
          that.reload();
        }
      })
    },
    reload: function(){
      // console.log("重新获取订单");
      var that = this;
      var num1 = 0;
      var num2 = 0;
      wx.showLoading({
        title: '加载中'
      })
      app.wxRequest('GET', '/user/myorder/', {}, function (res) {
        // console.log(res.reservations)
        if (res.result_code == 1) {
          that.setData({ reservations: res.reservations })
          for(var i=0;i<res.reservations.length;i++){
            if(res.reservations[i].status >= 2 && res.reservations[i].status <=5) {
              num1=num1+1;
            }
            if(res.reservations[i].status == 6) {
              num2=num2+1;
            }
          }
          that.setData({
            doing: num1,
            finish: num2
          })
          // console.log(that.data.doing+"   "+that.data.finish);
          wx.hideLoading();
        }
      })
    },
    handleChange({ detail }) { //tabs标签页控制
      // console.log(detail.key)
      this.setData({
        current: detail.key
      });
    }
  },
  lifetimes: {
    attached: function(){
      this.reload();
    }
  }
})