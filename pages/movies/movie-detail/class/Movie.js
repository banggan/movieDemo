var util = require('../../../../utils/util.js')
//定义Movie的类 豆瓣的地址作为参数
class Movie {
  constructor(url) {
    this.url = url;
  }
//获取电影数据
  getMovieData(callback) {
    this.callback = callback;
    util.http(this.url, this.processDoubanData.bind(this));
  }
//处理数据
  processDoubanData(data) {
    if (!data) {
      return;
    }
    var director = {
      avatar: "",
      name: "",
      id: ""
    }
    if (data.directors[0] != null) {
      if (data.directors[0].avatars != null) {
        director.avatar = data.directors[0].avatars.large

      }
      director.name = data.directors[0].name;
      director.id = data.directors[0].id;
    }
    var movie = {
      movieImg: data.images ? data.images.large : "",
      country: data.countries[0],
      title: data.title,
      originalTitle: data.original_title,
      wishCount: data.wish_count,
      commentCount: data.comments_count,
      year: data.year,
      generes: data.genres.join("、"),
      stars: util.convertToStarsArray(data.rating.stars),
      score: data.rating.average,
      director: director,
      casts: util.convertToCastString(data.casts),
      castsInfo: util.convertToCastInfos(data.casts),
      summary: data.summary
    }
    this.callback(movie);
  }
}

export { Movie }