var newsData = require('../../../data/news-data.js')//只能使用相对路径
var app = getApp();//调用app.js 使用全局变量
Page({
  data:{
    isPlayingMusic:false
  },
  //获取新闻页面传过来的id
  onLoad:function(option){
    var globalData = app.globalData;
    var newsId = option.id;
    this.data.currentNewId = newsId;
    //获取对应id的数据
    var newData = newsData.newsList[newsId];  
    //如果在onload中，不是异步的去执行一个数据绑定，就不需要用setData方法只需要对this.data赋值即可 this.data.newData = newData;
    this.setData({
      newData: newData
    });
    var newsCollected = wx.getStorageSync('news_collected');
    if(newsCollected){
      var newCollected = newsCollected[newsId];
      this.setData({
        collected: newCollected
      })
    }
    else{
      var newsCollected={};
      newsCollected[newsId] = false;
      wx.setStorageSync('news_collected', newsCollected);
    }  
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicNewId === newsId){//全局的音乐在播放 是否是当前的文章音乐
      this.setData({
        isPlayingMusic : true
      });//页面中控制音乐的标志
    }
    this.setAudioMonitor();
  },
  //监听音乐播放事件
  setAudioMonitor:function(){
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true;//播放将全局的变量设为trye
      app.globalData.g_currentMusicNewId = that.data.currentNewId;//设置当前播放的id
    });
    wx.onBackgroundAudioPause(() => {
      that.setData({
        isPlayingMusic: false
      });
      app.globalData.g_isPlayingMusic = false;//暂停将全局的变量设为false
      app.globalData.g_currentMusicNewId = null;//当前的正在播放清空
    });
    wx.onBackgroundAudioStop(() => {
      that.setData({
        isPlayingMusic: false
      });
      app.globalData.g_isPlayingMusic = false;//暂停将全局的变量设为false
      app.globalData.g_currentMusicNewId = null;//当前的正在播放清空
    });
  },
  //点击收藏按钮
  onCollectionTap:function(){
    //异步的优势 不阻塞其他的加载
    this.getNewsCollectedSyc();
    //this.getNewsCollectedAsy();
  },
  //异步的写法
  getNewsCollectedAsy:function(){
    var that = this;
    wx.getStorage({
      key:'news_collected',
      success:function(res){
        var newsCollected = res.data;
        var newCollected = newsCollected[that.data.currentNewId];
        newCollected = !newCollected;//对收藏取反
        newsCollected[that.data.currentNewId] = newCollected;//设置缓存的内容
        that.showToast(newsCollected, newCollected); //显示提示框
      }
    })

  },
  //同步的写法
  getNewsCollectedSyc:function(){
    var newsCollected = wx.getStorageSync('news_collected');
    var newCollected = newsCollected[this.data.currentNewId];
    newCollected = !newCollected;//对收藏取反
    newsCollected[this.data.currentNewId] = newCollected;
    this.showToast(newsCollected, newCollected);
  },
  //点击分享按钮
  onShareTap:function(event){
    var itemList = [
        "分享给微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
      ];
    wx.showActionSheet({
      itemList: itemList,
      itemColor:'#405f80',
      success:function(res){
        //res.cancel点击取消按钮
        //res.tapIndex数组的序号，从0开始
        wx.showModal({
          title:"确定" + itemList[res.tapIndex],
         // content: "用户是否取消" + res.cancel
        })
      }
    })
  },
  //播放音乐
  onMusicTap:function(event){
    var isPlayingMusic = this.data.isPlayingMusic;
    var currentNewId = this.data.currentNewId;
    var newData = newsData.newsList[currentNewId];
    if(isPlayingMusic){
      wx.pauseBackgroundAudio({
      });
      this.setData({
        isPlayingMusic:false
      });
    }
    else{
      console.log(newData.music);
      wx.playBackgroundAudio({
        dataUrl: newData.music.url,
        title:newData.music.title,
        coverImgUrl: newData.music.coverImg
      });
      this.setData({
        isPlayingMusic: true
      });
    }    
  },
  //提示框的设计
  showToast: function (newsCollected, newCollected){
    //不需要确认 自动消失
    wx.setStorageSync('news_collected', newsCollected);//更新文章是否缓存
    this.setData({//更新数据绑定，改变图片
      collected: newCollected
    })
    wx.showToast({
      title: newCollected ? '收藏成功' : '取消成功',
      duration: 1000,
      icon: 'success'
    })
  },
  //模态框的设计
  showModal: function (newsCollected, newCollected){
    var that = this;//改变上下文环境，
    wx.showModal({
      title: '收藏',
      content: newCollected? '确认收藏该文章?' : '取消收藏该文章？',
      showCancel: 'true',
      cancelText: "取消",
      cancelColor: "#333",
      confirmText: "确认",
      confirmColor: "#405f80",
      //确定后才更换图片
      success:function(res){//里面的this不是page下的作用域，在里面的函数中，this的指向改变，在外部用that替换
        if(res.confirm){
          wx.setStorageSync('news_collected', newsCollected);//更新文章是否缓存
          that.setData({//更新数据绑定，改变图片
            collected: newCollected
          })
        }
      }
    })
  },
  onShareAppMessage: function (event) {
    var currentNewId = this.data.currentNewId;
    var newData = newsData.newsList[currentNewId];
    return {
      title: newData.title,
      path: '/pages/posts/post-detail/post-detail?id=' + newData.newsId,
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
