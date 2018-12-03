var util = require('../../../utils/util.js');
var app = getApp();
Page({
  data:{
    movies:{},
    navigateTitle:'',
    requestUrl:'',
    totalCount:0,
    isEmpty:true
 },
 onLoad:function(options){
   var category = options.category;
   this.data.navigateTitle =category;
   var dataUrl='';
   //console.log(category)
   switch (category) {
     case "正在热映":
       dataUrl = app.globalData.doubanBase +
         "/v2/movie/in_theaters";
       break;
     case "即将上映":
       dataUrl = app.globalData.doubanBase +
         "/v2/movie/coming_soon";
       break;
     case "豆瓣电影Top250":
       dataUrl =app.globalData.doubanBase + 
         "/v2/movie/top250";
       break;
   }
   this.data.requestUrl = dataUrl;
   util.http(dataUrl, this.processDoubanData);
 },
 //滚动条事件从现在的数据重新加载20条
  onScrollLower:function(event){
    var nextUrl = this.data.requestUrl +
      "?start=" + this.data.totalCount + "&count=20";
    util.http(nextUrl, this.processDoubanData);//获取数据
    wx.showNavigationBarLoading();//加载中的提醒
  },
  //下拉刷新事件
  onPullDownRefresh: function (event) {
    var refreshUrl = this.data.requestUrl +
      "?star=0&count=20";
    this.data.movies = {};//防止后面的数据合并  把数据清空 这样保证数据始终是20条数据
    this.data.isEmpty = true;
    this.data.totalCount = 0;
    util.http(refreshUrl, this.processDoubanData);
    wx.showNavigationBarLoading();
  },
  processDoubanData: function (movieDouban){
    var movies = [];
    for (var idx in movieDouban.subjects) {
      var subject = movieDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      //星星的设计30转换为[1,1,1,0,0]
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp);
    }
    var totalMovies ={};

     //如果要绑定新加载的数据，那么需要同旧有的数据合并在一起
    if ( !this.data.isEmpty){//有新数据 合并新数组
      totalMovies = this.data.movies.concat(movies);
    }
    else{
      totalMovies = movies;
      this.data.isEmpty =false;//isEmpty置为false
    }
    this.setData({
      movies: totalMovies
    });
    wx.hideNavigationBarLoading();//关闭加载中
    wx.stopPullDownRefresh();
    this.data.totalCount += 20;//每次调用+20
 },
 onReady:function(event){
   wx.setNavigationBarTitle({//动态设置导航栏的标题
     title: this.data.navigateTitle,
   })
 },
  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + movieId
    })
  }
})