const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//豆瓣电影评分星星的设计30转为【1，1，1，0，0】
function convertToStarsArray(stars) {
  var num = stars.toString().substring(0, 1);
  var half= stars.toString().substring(1);
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    }
    else{
      array.push(0);
    }
  }
  if(half == 5){
    array[num] = 2;
  }else{
   // array[num] =0;
  }
  return array;
}
//http访问
function http(url,callback) {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      'Content-Type': "json"
    },
    success: function (res) {  
      callback(res.data) ;
    },
    fail: function (error) {
    }
  })
}
//拼接影人信息
function convertToCastString(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}
//影人部分 图片加名字
function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}
module.exports = {
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos,
  formatTime: formatTime,
  convertToStarsArray: convertToStarsArray,
  http:http
}
