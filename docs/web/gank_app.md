# GankUniApp

## 前言

GankUniApp 是使用[Gank.io](http://gank.io/api)提供的开放 api，和使用[uni-app](https://uniapp.dcloud.io/)完成的一个跨平台的客户端。uni-app 的基础组件 api 基本和微信小程序一样，所以无需要在重新学习！只需要学习如何兼容其他平台即可。由于小程序只能使用 https，并且个人开发者不能使用 web-view 所以，想看运行效果的请自行 clone 代码，在[HBuilderX](https://www.dcloud.io/hbuilderx.html)运行查看。

## 1、Gank.io

每日分享妹子图 和 技术干货，还有供大家中午休息的休闲视频。

## 2、uni-app

uni-app 是一个使用 Vue.js 开发所有前端应用的框架，开发者编写一套代码，可编译到 iOS、Android、H5、以及各种小程序等多个平台,一套代码编到 7 个平台。

即使不跨端，uni-app 同时也是更好的小程序开发框架。

### 2.1、Android 下载体验

![tab页面](https://github.com/leiyun1993/GankUniApp/raw/master/screenshot/qrcode_102.png)

## 3、GankUniApp

### 3.1、使用知识点

> - [uni-app](https://uniapp.dcloud.io/component/README)
> - [Vue](http://doc.vue-js.com/)
> - [微信小程序开发指南](https://developers.weixin.qq.com/miniprogram/dev/api/)

### 3.2、实现功能

- [ ] 闲读
- [x] 今日最新干货
- [x] 分类阅读
- [x] 提交干货
- [x] 妹子列表
- [x] 搜索干货
- [x] 历史干货
- [x] 查看其它 Gank 项目
- [x] 模拟登陆

### 3.3、小程序预览

![tab页面](https://github.com/leiyun1993/GankUniApp/raw/master/screenshot/001.jpg)

![我的相关](https://github.com/leiyun1993/GankUniApp/raw/master/screenshot/002.jpg)

### 3.4、titleBar 和 tabBar 说明

二者均使用自定义完成,均使用[ColorUI](https://github.com/weilanwl/ColorUI/)组件库的开源样式。

首先在[App.vue](https://github.com/leiyun1993/GankUniApp/blob/master/App.vue)中计算出 title 需要的高度;

然后自定义控件中设置所需高度即可[cu-custom.vue](https://github.com/leiyun1993/GankUniApp/blob/master/colorui/components/cu-custom.vue);

tabBar 的实现请参考小程序入口文件[index.vue](https://github.com/leiyun1993/GankUniApp/blob/master/pages/index/index.vue)

### 3.5、更新说明

**2019-08-02**

更新模拟登录后数据刷新问题

更新 App 预览截图（使用 androidApp 截图）

**2019-08-01**

取消自定以 title

测试 Android 端和 H5 端

H5 端由于使用开放 api 暂时无法解决跨域问题，所以只测试了本地。

**2019-07-30**

测试微信小程序端

初版提交

## 开源组件

[ColorUI](https://github.com/weilanwl/ColorUI/)

## TODO

- [ ] alipay 小程序
- [ ] iOS
- [x] H5
- [x] Android 端
- [x] 微信小程序

## 项目地址

[https://github.com/leiyun1993/GankUniApp](https://github.com/leiyun1993/GankUniApp)
