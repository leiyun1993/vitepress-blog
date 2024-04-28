# Flutter 笔记(六)：StaggeredGridView 瀑布流+下拉刷新和加载更多

### 前言

Flutter 中有对应的[ListView](https://api.flutter.dev/flutter/widgets/ListView-class.html)和[GridView](https://api.flutter.dev/flutter/widgets/GridView-class.html)但是没有提供瀑布流的展示，这里我们使用现在比较火的瀑布流组件[flutter_staggered_grid_view](https://github.com/letsar/flutter_staggered_grid_view)

### 1、引入组件

这里推荐使用 0.3.0 版本，github 中的文档现在的版本 0.2.7 版本存在一些 bug，当然这个组件在持续的更新中，读者在使用时应该使用最新的稳定版本。
在**pubspec.yaml**中引入

dependencies:
flutter_staggered_grid_view: "^0.3.0"

点击 Packages get 获取组件
如果加载失败或者一直提示

Waiting for another flutter command to release the startup lock。。。

解决办法如下：

1、打开 flutter 的安装目录 **/bin/cache/**
2、删除 lockfile 文件 。ps:如果显示 dart 正在运行，请打开任务管理器关闭 dart 进程
3、重新运行。

### 2、使用**StaggeredGridView**

大体就两种方式，一种是传入 List< Widget >另一种是用 itemBuilder 创建 item，默认提供了一下几种方法创建，根据自己的需要选择即可

```dart
StaggeredGridView()
StaggeredGridView.builder()
StaggeredGridView.custom()
StaggeredGridView.count()
StaggeredGridView.countBuilder()
StaggeredGridView.extent()
StaggeredGridView.extentBuilder()
```

这里我们选择使用 countBuilder 这种模式

```dart
StaggeredGridView.countBuilder(
     controller: _scrollController,  //滚动控制器
      padding: EdgeInsets.all(8),
      crossAxisCount: 4,
      itemCount: _imageList,
      itemBuilder: (BuildContext context, int index) => MeiZiItem(),  //返回的组件即为每个item。
      staggeredTileBuilder: (int index) =>
                    new StaggeredTile.count(2, index == 0 ? 2.5 : 3),    //
      mainAxisSpacing: 8.0,
      crossAxisSpacing: 8.0,
)
```

staggeredTileBuilder 则决定每个 item 的宽高。

```dart
const StaggeredTile.count(this.crossAxisCellCount, this.mainAxisCellCount)
//crossAxisCellCount:横轴占据的单元数。
//mainAxisCellCount:主轴占用的单元数。
```

展示如下，ps：我这里设置第一张主轴为 2.5 其他的为 3 这样就形成了一个简单的瀑布流样式。

### 3、下拉刷新

下拉刷新很简单，在 flutter 中自带了 RefreshIndicator

```dart
RefreshIndicator(
              onRefresh: _onRefresh,
              child: StaggeredGridView.countBuilder(
                controller: _scrollController,
                padding: EdgeInsets.all(8),
                crossAxisCount: 4,
                itemCount: _imageList,
                itemBuilder: (BuildContext context, int index) => MeiZiItem(),
                staggeredTileBuilder: (int index) =>
                    new StaggeredTile.count(2, index == 0 ? 2.5 : 3),
                mainAxisSpacing: 8.0,
                crossAxisSpacing: 8.0,
              ),
),
Future<void> _onRefresh() async {
    await Future.delayed(Duration(milliseconds: 1500));  //模拟网络请求
    setState(() {
      _imageList = 10;
    });
    print("_onRefresh");
}
```

### 4、加载更多

flutter 中没有自带的加载更多，但是我们可以使用 ScrollController 实现。

```dart
  var _scrollController = new ScrollController(initialScrollOffset: 0);

@override
void initState() {
    super.initState();
    _scrollController.addListener(() {
      var px = _scrollController.position.pixels;
      if (px == _scrollController.position.maxScrollExtent) {
        print("加载更多！");
        _onLoadMore();
      }
    });
}
Future<void> _onLoadMore() async {
    setState(() {
      _load=2;
    });
    await await Future.delayed(Duration(milliseconds: 1500));  //模拟网络请求
    setState(() {
      _imageList = _imageList + 5;
      _load=0;
    });
    print("_onLoadMore");
}
```

这样就可以实现加载更多功能，但是一般为了更好的体验，我们可以在底部加上加载更多的 loading，这里我只是简单的实现了一个，用到了 Offstage，一个布局 widget，可以控制其子 widget 的显示和隐藏。loading 指示器使用 CircularProgressIndicator。

```dart
Offstage(
  offstage: _load!=2,
  child: Center(
    child: Container(
      child: Row(
        children: <Widget>[
          Expanded(
            child: Container(
              child: SizedBox(
                child: CircularProgressIndicator(
                  strokeWidth: 2,
                ),
                width: 14,
                height: 14,
              ),
              alignment: Alignment.centerRight,
              margin: EdgeInsets.only(right: 10),
            ),
          ),
          Expanded(
            child: Text("加载更多..."),
          )

        ],
      ),
      padding: EdgeInsets.all(15),
    ),
  ),
)
```

### 完整代码

[https://github.com/leiyun1993/FlutterDemo](https://github.com/leiyun1993/FlutterDemo-GankIO)
