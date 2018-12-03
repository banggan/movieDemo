var app = getApp();
Page({

  data: {
    topNews: [],
    newsType: 'guoji',
    selsectState: [1, 0, 0, 0, 0]
  },

  onLoad: function (options) {
    var that = this
    // 访问聚合数据的网络接口-头条新闻
    wx.request({
      url: app.globalData.juhetoutiaoBase + '/toutiao/index',
      data: {
        type: 'guoji',
        key: app.globalData.juhetoutiaoKey
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.error_code == 0) {
          that.setData({
            topNews: res.data.result.data
          })
        } else {
          console.log('获取失败');
        }
      }
    })
  },

  //数据受限没有详情信息，给用户一个提示就好
  bindViewTap: function (event) {
    wx.showModal({
      title: '温馨提示',
      content: '因为暂时没有注册钻石会员，免费接口资源受限，具体新闻详情请访问官方网站哈',
      success: function (res) {
        if (res.confirm) {
          wx.showToast({
            title: "谢谢支持",
            duration: 1000,
            icon: "success"
          })
        } else if (res.cancel) {
          wx.showToast({
            title: "谢谢支持",
            duration: 1000,
            icon: "success"
          })
        }
      }
    })
  },

  clickNation: function () {
    this.setData({
      newsType: 'guoji',
      selsectState: [1, 0, 0, 0, 0]
    })
    this.getNews();
  },
  clickSport: function () {
    this.setData({
      newsType: 'tiyu',
      selsectState: [0, 1, 0, 0, 0]
    })
    this.getNews();
  },
  clickScience: function () {
    this.setData({
      newsType: 'keji',
      selsectState: [0, 0, 1, 0, 0]
    })
    this.getNews();
  },
  clickHappy: function () {
    this.setData({
      newsType: 'yule',
      selsectState: [0, 0, 0, 1, 0]
    })
    this.getNews();
  },
  clickFinance: function () {
    this.setData({
      newsType: 'caijing',
      selsectState: [0, 0, 0, 0, 1]
    })
    this.getNews();
  },

  getNews: function () {
    var that = this
    // 访问聚合数据的网络接口-头条新闻
    wx.request({
      url: app.globalData.juhetoutiaoBase + '/toutiao/index',
      data: {
        type: this.data.newsType,
        key: app.globalData.juhetoutiaoKey
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.error_code == 0) {
          that.setData({
            topNews: res.data.result.data
          })
        } else {
          console.log('获取失败');
        }
      }
    })
  },

  onShareAppMessage: function () {
    return {
      title: '热点新闻30条~',
      success: function (res) {
        wx.showToast({
          title: "分享成功",
          duration: 1000,
          icon: "success"
        })
      }
    }
  }

})