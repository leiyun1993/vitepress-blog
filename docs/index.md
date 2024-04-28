---
layout: home
layoutClass: 'm-home-layout'

hero:
  name: 小云的云
  text: 记录每一次成长
  tagline: 幸得识卿桃花面，自此阡陌多暖春！
  image:
    src: /logo_fill.png
    alt: 茂茂物语
  actions:
    - text: 前端导航
      link: /nav/
    - text: Vue
      link: /web/vue2-license-plate
      theme: alt
    - text: 小程序
      link: /web/mplicenseplate
    - text: UniApp
      link: /web/gank_app
      theme: alt
features:
  - icon: 📝
    title: 常记录，常成长
    details: 学无止境
    link: https://github.com/leiyun1993
    linkText: 早日退休
  - icon: 📖
    title: 简书
    details: 记录生活、工作、学习，分享知识、经验、技巧
    link: https://www.jianshu.com/u/a2d0015a3e1e
    linkText: 数据备份
  #   - icon: 📘
  #     title: 源码阅读
  #     details: 了解各种库的实现原理<br />学习其中的小技巧和冷知识
  #     link: https://notes.fe-mm.com/analysis/utils/only-allow
  #     linkText: 源码阅读
  #   - icon: 💡
  #     title: Workflow
  #     details: 在工作中学到的一切<small>（常用库/工具/奇淫技巧等）</small><br />配合 CV 大法来更好的摸鱼
  #     link: https://notes.fe-mm.com/workflow/utils/library
  #     linkText: 常用工具库
  - icon: 🧰
    title: 提效工具
    details: 工欲善其事，必先利其器<br />记录开发和日常使用中所用到的软件、插件、扩展等
    link: /nav/
    linkText: 提效工具
  # - icon: 🐞
  #   title: 踩坑记录
  #   details: 那些年我们踩过的坑<br />总有一些让你意想不到的问题
  #   link: https://notes.fe-mm.com/pit/npm
  #   linkText: 踩坑记录
---

<style>
/*爱的魔力转圈圈*/
.m-home-layout .image-src{
  border-radius: 50%;
  width: 240px;
  height: 240px;
}
.m-home-layout .image-src:hover {
  transform: translate(-50%, -50%) rotate(666turn);
  transition: transform 59s 1s cubic-bezier(0.3, 0, 0.8, 1);
}

.m-home-layout .details small {
  opacity: 0.8;
}

.m-home-layout .bottom-small {
  display: block;
  margin-top: 2em;
  text-align: right;
}
</style>
