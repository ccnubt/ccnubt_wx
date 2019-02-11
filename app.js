//app.js
App({
  onLaunch: function () {
    var that = this
    var value = wx.getStorageSync('api_key');
    if(value == ''){
      that.globalData.first = 1;
    }
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          getApp().wxRequest('POST', '/auth/login/', { code: res.code }, function (res) {
            if (res.result_code == 1 || res.result_code == 2) {
              getApp().globalData.user_info = res['user_info'];
              // console.log(res);
              wx.setStorage({ //本地缓存
                key: 'api_key',
                data: res['api_key']
              });
              setTimeout(function () {
                var result_code = res.result_code;
                console.log(result_code);
                if (result_code == 2) //判断是否完善信息
                  wx.redirectTo({
                    url: '../register/register'
                  })
                else if (res.user_info.role == 0) {//成员身份为用户
                  wx.redirectTo({
                    url: '/pages/user/user',
                  })
                }
                else if (res.user_info.role == 1) {//成员身份为队员
                  wx.redirectTo({
                    url: '/pages/member/member',
                  })
                }
              }, 2000)
            }
            else if (res.result_code == 401) { //用户被禁用
              wx.redirectTo({
                url: '/pages/forbidden/forbidden',
              })
            }
          }, function (res) {
             console.log('端口调用失败' + res.err_msg)
          })
        }
        else {
           console.log('端口调用失败' + res.err_msg)
        }
      }
    })
  },

  globalData: {
    baseURL: 'https://wx.ccnubt.club',
    // baseURL: 'http://192.168.0.8:5000',
    userInfo: 'hello',
    user_info: null,
    first:0 //判断是否是第一次登入（清除缓存之后又成为第一次登入）
  },
  wxRequest(method, url, data, callback, errFun = null) {
    // console.log(data)
    let api_key = wx.getStorageSync('api_key');//同步取出api_key
    // console.log(api_key)
    wx.request({
      url: getApp().globalData.baseURL + url + '?api_key=' + api_key,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      },
      dataType: 'json',
      success: function (res) {
        callback(res.data);
      },
      fail: function (err) {
        if (errFun) {
          errFun(err);
        }
      }
    })
  }
})