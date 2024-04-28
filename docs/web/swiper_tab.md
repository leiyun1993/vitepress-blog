# 微信小程序 Swiper 做 Tab 切换，带 tab 切换动画

### 前言

小程序中我们做 tab 切换一般情况下可以做点击切换，但是有 Swiper 组件，其实我们也可以做滑动切换
监听 Swiper 的 bindchange，我们就可以在切换时改变 tab 的选装状态达到切换的目的。
但是这样的方式 tab 的切换方式是跳转式的，体验不是很好。于是就有了这个 demo，我们一步步优化切换体验。

### 分析/实现

首先：利用 flex 布局，做出 tab 区域，如果 tab 选项卡很多可以使用 Scroll-view；一般的跳转式的 tab 用 boder-bottom 实现就好，这里我们加了一个“navbar-slider”，加上 translateX 动画实现平移切换。

```html
<!-- tab -->
<view class="navbar">
  <block wx:for="{{tabs}}" wx:key="*this">
    <view
      id="{{index}}"
      class="navbar-item {{tab1Index==index?'bar-item-on':''}}"
      data-index="{{index}}"
      bindtap="onTab1Click"
    >
      <view class="navbar-title">{{item}}</view>
    </view>
  </block>
  <view
    class="navbar-slider"
    style="left: {{sliderLeft}}px; width:50px; transform: translateX({{sliderOffset}}px); -webkit-transform: translateX({{sliderOffset}}px);"
  ></view>
</view>
<!-- 内容区  swiper -->
<swiper
  duration="300"
  bindtransition="swiperTran"
  bindanimationfinish="animationfinish"
  current="{{tab1Index}}"
  bindchange="swiperChange"
  data-index="{{tab1Index}}"
>
  <swiper-item wx:for="{{tabs}}" wx:key="*this">
    <view style="background-color:{{colors[index]}};height:100%;text-align:center;">{{item}}</view>
  </swiper-item>
</swiper>
```

然后：计算出每个 tabItem 的宽度，和每个 item 距离 0 坐标的距离；下中 50 是 slider 的宽度，对应上面“width:50px;”

```javascript
wx.getSystemInfo({
  success: function (res) {
    itemWidth = Math.ceil(res.windowWidth / that.data.tabs.length)
    let tempArr = []
    for (let i in that.data.tabs) {
      console.log(i)
      tempArr.push(itemWidth * i)
    }
    // tab 样式初始化
    windowWidth = res.windowWidth
    that.setData({
      sliderLeft: (res.windowWidth / that.data.tabs.length - 50) / 2,
      sliderOffsets: tempArr,
      sliderOffset: 0,
    })
  },
})
```

关联：1、监听 item 点击，切换 swiper；2、监听 swiper 切换改变 slider 位置和 tab 显示

```javascript
onTab1Click(event){
  let index = event.currentTarget.dataset.index;
  this.setData({
    sliderOffset: this.data.sliderOffsets[index],
    tab1Index: index,
  })
},
```

```javascript
swiperChange(event){
  this.setData({
    sliderOffset: this.data.sliderOffsets[event.detail.current],
    tab1Index: event.detail.current,
  })
},
```

效果展示如下：

![无bindtransition](https://upload-images.jianshu.io/upload_images/3891144-259f570264df2e06.gif?imageMogr2/auto-orient/strip)

现在我们已经实现了，Swiper 和 tab 的带动画联动，但是我们可以发现，我们的切换动画是在切换之后进行的，我们这里还可以继续优化。
swiper 在切换时可以监听 bindtransition，swiper-item 的位置发生改变时会触发 transition 事件，event.detail = {dx: dx, dy: dy}，dx 则是平移的偏移量，我们可以通过这个监听来实时设置 slider 的位置。

```javascript
swiperTran(event){

  let dx = event.detail.dx;
  let index = event.currentTarget.dataset.index;
  if(dx>0){ //----->
      if(index<this.data.tabs.length-1){   //最后一页不能---->
        let ratio = dx/windowWidth;   /*滑动比例*/
        let newOffset = ratio*itemWidth+this.data.sliderOffsets[index];
        // console.log(newOffset,",index:",index);
        this.setData({
          sliderOffset: newOffset,
        })
      }
  }else{  //<-----------
    if (index > 0) {    //最后一页不能<----
      let ratio = dx / windowWidth;   /*滑动比例*/
      let newOffset = ratio * itemWidth + this.data.sliderOffsets[index];
      console.log(newOffset, ",index:", index);
      this.setData({
        sliderOffset: newOffset,
      })
    }
  }
},
```

切换后校正 slider 的位置，这里我们不能使用 bindchange 来校正，因为 bindchange 在切换时手指释放的时候就调用了，我们这里使用 bindanimationfinish 回调来校正（动画结束时会触发 animationfinish 事件，event.detail 同上）

```javascript
animationfinish(event){
  this.setData({
    sliderOffset: this.data.sliderOffsets[event.detail.current],
    tab1Index: event.detail.current,
  })
},
```

最终：展示如下

![有bindtransition](https://upload-images.jianshu.io/upload_images/3891144-771fa208a0d59360.gif?imageMogr2/auto-orient/strip)

### 注意：

在小程序开发文档中明确说明了最好不要频繁调用 setData，我们最后这种方式就会频繁的调用，所以这里其实只是提供这种思路，但是工程中并不建议这么使用

### 参考资料

[小程序开发者文档](https://developers.weixin.qq.com/miniprogram/dev/)

### 源码地址如下

[SwiperTab](https://github.com/leiyun1993/SwiperTab)
