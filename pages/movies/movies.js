var util = require('../../utils/util.js');
var app = getApp();
Page({
//RESTFul API 
data:{
  inTheaters:{},
  comingSoon:{},
  top250:{},
  searchResult:{},
  containerShow: true,
  searchPanelShow: false
},
onLoad:function(event){
  var inTheatersUrl = app.globalData.doubanBase + '/v2/movie/in_theaters' + '?start=0&count=3';
  var comingSoonUrl = app.globalData.doubanBase + '/v2/movie/coming_soon' + '?start=0&count=3';
  var top250Url = app.globalData.doubanBase + '/v2/movie/top250' + '?start=0&count=3';

  this.getMovieListData(inTheatersUrl, 'inTheaters',"正在热映");
  this.getMovieListData(comingSoonUrl, 'comingSoon',"即将上映");
  this.getMovieListData(top250Url,'top250',"豆瓣电影Top250");
},
//点击更多
  onMoreTap:function(event){
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category
    })
  },
  onMovieTap:function(event){
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: 'movie-detail/movie-detail?id='+movieId
    })
  },
//访问豆瓣公共方法
  getMovieListData: function (url, settedKey, categoryTitle){
  var that =this;
  wx.request({
    url: url,
    method: 'GET',
    header: {
      'Content-Type': "json"
    },
    success: function (res) {
      //console.log(res);
      that.processDoubanData(res.data, settedKey, categoryTitle);
    },
    fail: function (error) {
      console.log(error);
    }
  })
},
//搜索框聚焦事件
  onBindFocus:function(event){
    this.setData({
      containerShow:false,
      searchPanelShow:true
    })
  },
  //点击xx取消，回到电影首页
  onCancelImgTap:function(event){
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      searchResult:{}
    })
  } , 
  //触发搜索事件
  onBindBlur:function(event){
    var text = event.detail.value;
    var searchUrl = app.globalData.doubanBase +"/v2/movie/search?q=" + text;
    this.getMovieListData(searchUrl,"searchResult","");

  },
  processDoubanData:function(movieDouban,settedKey,categoryTitle){
  var movies =[];
  for(var idx in movieDouban.subjects){
    var subject = movieDouban.subjects[idx];
    var title = subject.title;
    if(title.length >=6){
      title = title.substring(0,6)+"...";
    }
    //星星的设计30转换为[1,1,1,0,0]
    var temp={
      stars: util.convertToStarsArray(subject.rating.stars),
      title:title,
      average:subject.rating.average,
      coverageUrl:subject.images.large,
      movieId:subject.id
    }
    movies.push(temp);
  }
  var readyData={};
  readyData[settedKey] = {
    categoryTitle: categoryTitle,
    movies:movies
  };
  this.setData(readyData);
}
})