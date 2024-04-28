# Flutter 笔记(一)：BottomNavigationBar 常见问题

App 中最常见的底部导航，直接看看代码

```dart
BottomNavigationBar({
    Key key,
    @required this.items,  //必须有的item
    this.onTap,  //点击事件
    this.currentIndex = 0,  //当前选中
    this.elevation = 8.0,  //高度
    BottomNavigationBarType type,  //排列方式
    Color fixedColor,    //'Either selectedItemColor or fixedColor can be specified, but not both'
    this.backgroundColor,  //背景
    this.iconSize = 24.0,  //icon大小
    Color selectedItemColor,  //选中颜色
    this.unselectedItemColor,  //未选中颜色
    this.selectedIconTheme = const IconThemeData(),
    this.unselectedIconTheme = const IconThemeData(),
    this.selectedFontSize = 14.0,  //选中文字大小
    this.unselectedFontSize = 12.0,  //未选中文字大小
    this.selectedLabelStyle,
    this.unselectedLabelStyle,
    this.showSelectedLabels = true, //是否显示选中的Item的文字
    bool showUnselectedLabels,  //是否显示未选中的Item的问题
  })
```

## 常见问题

### 1、设置 BottomNavigationBar 超过 3 个后，不显示颜色

只有两个的时候能正常显示，这个时候并未设置颜色相关属性，但是显示的是 primaryColor

```dart
new BottomNavigationBar(
        items: [
          BottomNavigationBarItem(
              icon: new Icon(IconFont.iconhome), title: new Text("首页")),
          BottomNavigationBarItem(
              icon: new Icon(IconFont.iconcategory), title: new Text("分类")),
//          BottomNavigationBarItem(
//              icon: new Icon(IconFont.iconpic), title: new Text("妹子")),
//          BottomNavigationBarItem(
//              icon: new Icon(IconFont.iconaccount), title: new Text("我的"))
        ],
//        selectedItemColor: Color(0xffff8635),
//        unselectedItemColor: Color(0xff666666),
//        type: BottomNavigationBarType.fixed,
//        showUnselectedLabels: true,
      ),
```

![1.jpg](/android/flutter_note_1_1.png)
大于三个之后无法正常显示（变成了白色）
![2.jpg](/android/flutter_note_1_2.png)
查看源码其实发现，BottomNavigationBarType type, 默认情况下，item 小于三个 type = fixed，大于三个 type = shifting;

```dart
  static BottomNavigationBarType _type(
      BottomNavigationBarType type,
      List<BottomNavigationBarItem> items,
  ) {
    if (type != null) {
      return type;
    }
    return items.length <= 3 ? BottomNavigationBarType.fixed : BottomNavigationBarType.shifting;
  }
```

然后默认的选中和未选中的颜色是根据 type 变化的，源码如下

```dart
switch (widget.type) {
      case BottomNavigationBarType.fixed:  //默认fixed模式下使用主题色
        colorTween = ColorTween(
          begin: widget.unselectedItemColor ?? themeData.textTheme.caption.color,
          end: widget.selectedItemColor ?? widget.fixedColor ?? themeColor,
        );
        break;
      case BottomNavigationBarType.shifting:  //默认shifting模式下使用白色，白色？这其实就是看不见的原因
        colorTween = ColorTween(
          begin: widget.unselectedItemColor ?? Colors.white,
          end: widget.selectedItemColor ?? Colors.white,
        );
        break;
    }
```

那么这里就有解决方法了，如果只是要他显示出来只需要**改变模式** 或者 **设置默认颜色**

```dart
//设置默认颜色
selectedItemColor: Color(0xffff8635),
unselectedItemColor: Color(0xff666666),
//BottomNavigationBarType改为fixed模式
type: BottomNavigationBarType.fixed,
```

![3.jpg](/android/flutter_note_1_3.png)
这样子其实 Item 都能显示出来了。然后我们稍微分析一下 fixed 和 shifting 模式的区别，其实很简单就是，fixed 模式是平分，而 shifting 模式是可以摇摆的。但是可以看到设置了默认颜色后，未选中的文字不显示，于是就有了第二个问题

### 2、item 大于三个的时候文字不显示。

或者说我假设希望用 shifting 模式，怎么把文字显示出来。
由上一个问题我们得知肯定是 BottomNavigationBarType 引起的，我们查看源码控制是否显示文字是由以下代码控制，如果没有传值则由\_defaultShowUnselected 返回

```dart
showUnselectedLabels = showUnselectedLabels ?? _defaultShowUnselected(_type(type, items)),
```

\_defaultShowUnselected 中就得出了，shifting 模式下默认不显示，fixed 模式下默认显示。（其实这个本想吐槽的，但是仔细想想 MD 风格中好像就是默认不显示的，显然这里的 shifting 模式更符合 MD 风格，但是现在大家似乎更适合 fixed 模式）

```dart
static bool _defaultShowUnselected(BottomNavigationBarType type) {
    switch (type) {
      case BottomNavigationBarType.shifting:
        return false;
      case BottomNavigationBarType.fixed:
        return true;
    }
    assert(false);
    return false;
  }
```

现在问题就好解决了，那我给他默认值就好了，这样就能正常显示出文字了。

```dart
new BottomNavigationBar(
//省略...
       showUnselectedLabels: true,
 ),
```

![4.jpg](/android/flutter_note_1_4.png)

### 总结

其实 BottomNavigationBar 就一个问题，就是由于 item 数量引起的默认 BottomNavigationBarType 不同导致的问题。以上就大概讲解了几个重要的不同之处。其他属性如果有问题的依次看下源码就能轻松解决。
最后来个属性齐全的代码和样式。（其实就是把开头的代码注释去掉）

```dart
    new BottomNavigationBar(
      items: [
          BottomNavigationBarItem(
              icon: new Icon(IconFont.iconhome), title: new Text("首页")),
          BottomNavigationBarItem(
              icon: new Icon(IconFont.iconcategory), title: new Text("分类")),
          BottomNavigationBarItem(
              icon: new Icon(IconFont.iconpic), title: new Text("妹子")),
          BottomNavigationBarItem(
              icon: new Icon(IconFont.iconaccount), title: new Text("我的"))
        ],
        selectedItemColor: Color(0xffff8635),
        unselectedItemColor: Color(0xff666666),
        type: BottomNavigationBarType.fixed,
        showUnselectedLabels: true,
    )
```

![5.jpg](/android/flutter_note_1_5.png)

### 完整代码

[https://github.com/leiyun1993/FlutterDemo](https://github.com/leiyun1993/FlutterDemo-GankIO)
