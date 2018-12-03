var newsData = require('../../data/news-data.js')//只能使用相对路径
Page({
  data: {//小程序总是会读取data对象来做数据绑定，称为动作a。动作a始终在onload事件之后之后发生

  },
  onLoad: function (options) {
    //新闻列表的数据
    //this.data.newsList=newsData.newsList;
    this.setData({
      newsList:newsData.newsList
      });
  },
  onNewTap:function(event){
    //自定义属性名将字母转为小写，newsId写成newsid
    var newsId=event.currentTarget.dataset.newsid;
    //console.log(newsId);
    wx.navigateTo({//跳转到子页面
      url: 'news-detail/news-detail?id='+newsId,
    })
  },
  //bindtap具有事件冒泡的，不会组织事件冒泡，catchtap会阻止时间冒泡
  onSwiperTap:function(event){
    //target与currentTarget:
    //target指的是当前点击的组件image，currentTarget指的是事件捕获的组件swiper
    var newsId = event.target.dataset.newsid;
    wx.navigateTo({//跳转到子页面
      url: 'news-detail/news-detail?id=' + newsId,
    })
  }
})