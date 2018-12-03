var app= getApp();
Page({
  data:{
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad:function(){
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (event) {
    //console.log(event)
    app.globalData.userInfo = event.detail.userInfo
    this.setData({
      userInfo: event.detail.userInfo,
      hasUserInfo: true
    })
  },
  //页面跳转
  onTap: function () {
    // wx.navigateTo({//跳转到新闻页面。两个页面父子跳转 最多五级
    //   url: '../news/news',
    // });
    wx.switchTab({//两个页面平行跳转switchTab只能跳转到tab的页面
      url: '../news/news',
    })
  }
})
