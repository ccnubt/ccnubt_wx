//app.js
App({
  onLaunch: function () {
    var that = this

    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          getApp().wxRequest('POST', '/auth/login/', { code: res.code }, function (res) {
            if (res.result_code == 1 || res.result_code == 2) {
              getApp().globalData.user_info = res['user_info'];
              console.log(res);
              wx.setStorage({ //本地缓存
                key: 'api_key',
                data: res['api_key']
              });
              setTimeout(function () {
                if (res['result_code'] == 2) //判断是否完善信息
                  wx.redirectTo({
                    url: '../register/register'
                  })
                else if (res.user_info.role == 0) {
                  wx.redirectTo({
                    url: '/pages/user/user',
                  })
                }
                else if (res.user_info.role == 1) {
                  wx.redirectTo({
                    url: '/pages/member/member',
                  })
                }
              }, 2000)
            }
          }, function (res) {
            // console.log('端口调用失败' + res.err_msg)
          })
        }
        else {
          // console.log('端口调用失败' + res.err_msg)
        }
      }
    })
  },

  globalData: {
    baseURL: 'https://wx.ccnubt.club',
    // baseURL: 'http://192.168.1.9:5000',
    userInfo: 'hello',
    user_info: null,
  },
  wxRequest(method, url, data, callback, errFun = null) {
    // console.log(data)
    let api_key = wx.getStorageSync('api_key')
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
=======
//app.js
App({
  onLaunch: function () {
    var that = this

    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          getApp().wxRequest('POST', '/auth/login/', { code: res.code }, function (res) {
            if (res.result_code == 1 || res.result_code == 2) {
              getApp().globalData.user_info = res['user_info'];
              console.log(res);
              wx.setStorage({ //本地缓存
                key: 'api_key',
                data: res['api_key']
              });
              setTimeout(function () {
                if (res['result_code'] == 2) //判断是否完善信息
                  wx.redirectTo({
                    url: '../register/register'
                  })
                else if (res.user_info.role == 0) {
                  wx.redirectTo({
                    url: '/pages/user/user',
                  })
                }
                else if (res.user_info.role == 1) {
                  wx.redirectTo({
                    url: '/pages/member/member',
                  })
                }
              }, 2000)
            }
          }, function (res) {
            // console.log('端口调用失败' + res.err_msg)
          })
        }
        else {
          // console.log('端口调用失败' + res.err_msg)
        }
      }
    })
  },

  globalData: {
    baseURL: 'https://bt.yuancl.site',
    // baseURL: 'http://192.168.1.115:5000',
    userInfo: 'hello',
    user_info: null,
  },
  wxRequest(method, url, data, callback, errFun = null) {
    // console.log(data)
    let api_key = wx.getStorageSync('api_key')
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
>>>>>>> Stashed changes
})