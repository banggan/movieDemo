import {Movie} from "class/Movie.js";
var app = getApp();
Page({
  data: {

  },
  onLoad: function (options) {
    var movieId = options.id;
    var url = app.globalData.doubanBase +
      "/v2/movie/subject/" + movieId;
      var movie = new Movie(url);
      // var movieData = movie.getMovieData();//同步  异步采用回调的方式
      var that= this;
      movie.getMovieData(function (movie){
        that.setData({
          movie:movie
        })
      })
  },
  // 查看图片 大图预览的效果
  viewMoviePostImg:function(event){
    var src = event.currentTarget.dataset.src;
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: [src] // 需要预览的图片http链接列表
    })
  },
})