# 微信小程序学习总结
---
- 了解小程序的基本开发流程
- 看文档文档文档、基本组件的使用、微信相关接口的调用、数据绑定以及其他接口的使用
- 自己做的demo
>  内容：
1. 文章的阅读
1. 豆瓣电影搜索指南
1. 头条新闻阅读
> 组件：
1. 模版的复用、嵌套
1. 相关组件轮播图、tab、表单、audio、视图、导航等等组件的使用
> 接口：
1. 微信用户接口、音频接口、导航栏等的使用
2. 豆瓣开发者的访问接口使用：涉及到热映、即将、top250、电影详情、搜索等接口的使用
3. 头条新闻，聚合数据接口的使用
- 总结
> 因为demo是文章阅读、豆瓣电影、头条新闻的内容、在小程序发布的时候超过了个人小程序的权限范围、所以微信那边审核内容不通过、建议使用企业帐号、所以没法给师傅看相关的demo、只好截图看看了

1、首页：获取微信用户的头像和名称
![image](https://raw.githubusercontent.com/banggan/img-storage/master/0.png)

2、文章阅读：所以数据是自己找的，写的是本地的js文件，加载js文件循坏读取渲染页面，头部是四篇文章图片的轮播，点击对应的图片都可进入文章详情页面：主要是详情，音乐的播放、收藏和分享功能的设计
![image](https://raw.githubusercontent.com/banggan/img-storage/master/1.png)

3、豆瓣电影页面：涉及到了模板的嵌套、复用，主要功能是热映，即将、top250、搜索、详情的实现
![image](https://raw.githubusercontent.com/banggan/img-storage/master/2.png)
4、头条新闻页面：采用的是聚合数据的接口使用，因为没有砖石会员，没有做新闻详情页面。
![image](https://raw.githubusercontent.com/banggan/img-storage/master/4.png)
> 个人总结：基本上了解了微信小程序的整个开发流程，相关组件的开发、接口的使用，只是自己这边做的是纯前端的内容、直接使用的豆瓣开发者接口或者聚合数据接口调用获取数据渲染页面、没有涉及到复杂的后台内容。