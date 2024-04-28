# Flutter 笔记(五)：TabBar、TabBarView 类似于 Android 的 TabLayout+ViewPager

### 前言

TabBar 可用于在 TabBarView 中显示的页面之间导航。虽然 TabBar 是一个可以出现在任何地方的普通 widget，但它通常包含在应用程序的 AppBar 中。

### 1、TabBar

```dart
  const TabBar({
    Key key,
    @required this.tabs,    //tab选项
    this.controller,        //控制器
    this.isScrollable = false,  //是否可以滚动
    this.indicatorColor,  //指示器颜色
    this.indicatorWeight = 2.0,  //指示器高度
    this.indicatorPadding = EdgeInsets.zero,  //指示器padding。默认tab宽度，0padding
    this.indicator,  //指示器
    this.indicatorSize,  //指示器大小（TabBarIndicatorSize.tab:Tab宽度；TabBarIndicatorSize.label：label内容宽度）
    this.labelColor,  //内容颜色
    this.labelStyle,  //内容Style，TextStyle
    this.labelPadding,
    this.unselectedLabelColor,
    this.unselectedLabelStyle,
    this.dragStartBehavior = DragStartBehavior.start,
    this.onTap,
  })
```

### 2、构建 TabBar

tab 选项数据源

```dart
var _tabList = ["All", "Android", "iOS", "Web"];
```

AppBar 的 bottom 创建为 TabBar

```dart
AppBar(
  backgroundColor: Colors.white,
  brightness: Brightness.light,
  title: Center(
      child: Text(
        "分类",
        ),
  ),
  bottom: TabBar(
    controller: _tabController,
    indicatorSize: TabBarIndicatorSize.label,  //设置为Label宽度
    tabs: _tabList.map((item) {
      return Tab(text: item);
    }).toList(),
  ),
)
```

### 2、TabBarView

用于和 TabBar 联动的组件，类似于 Flutter 的 PageView 和 Android 的 ViewPager

```dart
  const TabBarView({
    Key key,
    @required this.children,  //子组件列表，一般应该和TabBar的item数量一致
    this.controller,
    this.physics,
    this.dragStartBehavior = DragStartBehavior.start,
  })
```

### 3、DefaultTabController

现在为了让 TabBar 和 TabBarView 联动，应该在外层套上**DefaultTabController**，代码如下

```dart
class _CategoryState extends State<CategoryPage> {
  var _tabList = ["All", "Android", "iOS", "Web"];
  var _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = DefaultTabController.of(context);
  }

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
        length: _tabList.length,
        child: Scaffold(
            appBar: AppBar(
              backgroundColor: Colors.white,
              brightness: Brightness.light,
              title: Center(
                child: Text(
                  "分类",
                ),
              ),
              bottom: TabBar(
                controller: _tabController,
                indicatorSize: TabBarIndicatorSize.label,
                tabs: _tabList.map((item) {
                  return Tab(text: item);
                }).toList(),
              ),
            ),
            body: TabBarView(
              children: _tabList.map((item) {
                return Center(
                  child: ArticleList(),
                );
              }).toList(),
            )));
  }
}
```

### 完整代码

[https://github.com/leiyun1993/FlutterDemo](https://github.com/leiyun1993/FlutterDemo-GankIO)
