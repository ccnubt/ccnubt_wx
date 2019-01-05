//app.js
App({
      onLaunch: function() {
        var that = this
        wx.login({
          success(res) {
            if (res.code) {
              //发起网络请求
              getApp().wxRequest('POST','/auth/login/',{code: res.code},function(res){
                getApp().globalData.user_info = res['user_info'];
                console.log(res);
                wx.setStorage({ //本地缓存
                  key: 'api_key',
                  data: res['api_key']
                });
                if (res['result_code'] == 2) //判断是否完善信息
                  wx.navigateTo({
                    url: '../register/register'
                  })
                else if (res['result_code'] == 1) {
                  wx.redirectTo({
                    url: '../person/person',
                  })
                }
              },function(res){
                console.log('端口调用失败' + res.err_msg)
              })
            } else {
              console.log('端口调用失败' + res.err_msg)
            }
          }
        })
      },
      //第一种底部   
      editTabBar: function() { //使用getCurrentPages可以获取当前加载中所有的页面对象的一个数组，数组最后一个就是当前页面。     
        var curPageArr = getCurrentPages(); //获取加载的页面    
        var curPage = curPageArr[curPageArr.length - 1]; //获取当前页面的对象    
        var pagePath = curPage.route; //当前页面url    
        if (pagePath.indexOf('/') != 0) {
          pagePath = '/' + pagePath;
        }
        var tabBar = this.globalData.tabBar;
        for (var i = 0; i < tabBar.list.length; i++) {
          tabBar.list[i].active = false;
          if (tabBar.list[i].pagePath == pagePath) {
            tabBar.list[i].active = true; //根据页面地址设置当前页面状态          
          }
        }
        curPage.setData({
          tabBar: tabBar
        });
      },
      //第二种底部，原理同上  
      editTabBar1: function() {
        var curPageArr = getCurrentPages();
        var curPage = curPageArr[curPageArr.length - 1];
        var pagePath = curPage.route;
        if (pagePath.indexOf('/') != 0) {
          pagePath = '/' + pagePath;
        }
        var tabBar = this.globalData.tabBar1;
        for (var i = 0; i < tabBar.list.length; i++) {
          tabBar.list[i].active = false;
          if (tabBar.list[i].pagePath == pagePath) {
            tabBar.list[i].active = true;
          }
        }
        curPage.setData({
          tabBar: tabBar
        });
      },
      globalData: {
        // baseURL: 'https://bt.yuancl.site',
        baseURL: 'http://192.168.1.115:5000',
        userInfo: 'hello',
        user_info: null,

        //第一种底部导航栏显示    
        tabBar: {
          "color": "#9E9E9E",
          "selectedColor": "#f00",
          "backgroundColor": "#fff",
          "borderStyle": "#ccc",
          "list": [{
              "pagePath": "/pages/statu/statu",
              "text": "维修状态",
              "clas": "menu-item",
              "selectedColor": "#4EDF80",
              active: true
            }, {
              "pagePath": "/pages/activity/activity",
              "text": "活动中心",
              "selectedColor": "#4EDF80",
              "clas": "menu-item",
              active: false
            }, {
              "pagePath": "/pages/complaints/complaints",
              "text": "投诉中心",
              "selectedColor": "#4EDF80",
              "clas": "menu-item",
              active: false
            }, {
              "pagePath": "/pages/person/person",
              "text": "个人中心",
              "selectedColor": "#4EDF80",
              "clas": "menu-item",
              active: false
              }],
            "position": "bottom"
          },
          //第二种底部导航栏显示    
          tabBar1: {
            "color": "#9E9E9E",
            "selectedColor": "#f00",
            "backgroundColor": "#fff",
            "borderStyle": "#ccc",
            "list": [{
              "pagePath": "/pages/oder/oder",
              "text": "预约中心",
              "clas": "menu-item1",
              "selectedColor": "#4EDF80",
              active: false
            }, {
                "pagePath": "/pages/oderdetail/oderdetail",
              "text": "工单详情",
              "selectedColor": "#4EDF80",
              "clas": "menu-item1",
              active: true
            }, {
              "pagePath": "/pages/person/person",
              "text": "个人中心",
              "selectedColor": "#4EDF80",
              "clas": "menu-item1",
              active: false
            }],
            "position": "bottom"
          }
        },
      wxRequest(method, url, data, callback, errFun) {
        console.log(data)
        let api_key = wx.getStorageSync('api_key')
        console.log(api_key)
        wx.request({
          url: getApp().globalData.baseURL + url+'?api_key='+api_key,
          method: method,
          data: data,
          header: {
            'content-type': 'application/json',//method == 'GET' ? 'application/json' : 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          dataType: 'json',
          success: function (res) {
            callback(res.data);
          },
          fail: function (err) {
            errFun(err);
          }
        })
      }
  })