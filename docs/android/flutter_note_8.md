# Flutter 笔记(八)：route、路由管理

## 什么是路由 route

1、熟悉前端的朋友知道，这跟 web 开发中单页应用的 Route 概念意义是相同的；
2、Route 在 Android 中通常指一个 Activity，在 iOS 中指一个 ViewController；
3、路由入栈(push)操作对应打开一个新页面，路由出栈(pop)操作对应页面关闭操作；比如 android 中就是 startActivity 和 finish；
4、路由管理主要是指如何来管理路由栈。

## Navigator

Navigator 是一个路由管理的组件，它提供了打开和退出路由页方法。Navigator 通过一个栈来管理活动路由集合。
常用的两个方法：
**Future push(BuildContext context, Route route)**
将给定的路由入栈（即打开新的页面），返回值是一个 Future 对象，用以接收新路由出栈（即关闭）时的返回数据。

```dart
  @optionalTypeArgs
  static Future<T> push<T extends Object>(BuildContext context, Route<T> route) {
    return Navigator.of(context).push(route);
  }
```

**bool pop(BuildContext context, [ result ])**
将栈顶路由出栈，result 为页面关闭时返回给上一个页面的数据。

```dart
  @optionalTypeArgs
  static bool pop<T extends Object>(BuildContext context, [ T result ]) {
    return Navigator.of(context).pop<T>(result);
  }
```

## MaterialPageRoute

MaterialPageRoute 是 Material 组件库提供的组件，它可以针对不同平台，实现与平台页面切换动画风格一致的路由切换动画：

```dart
  MaterialPageRoute({
    @required this.builder,  //是一个WidgetBuilder类型的回调函数，返回新路由的实例。
    RouteSettings settings,  //包含路由的配置信息，如路由名称、是否初始路由（首页）。
    this.maintainState = true,  //是否释放所占用的所有资源
    bool fullscreenDialog = false,  //新的路由页面是否是一个全屏的模态对话框
  })
```

## Navigator+MaterialPageRoute

点击**关于**跳转到**About**页面

```dart
onTap: () {
    Navigator.push(context, MaterialPageRoute(builder: (context) => (About())));
}
```

## 命名路由

所谓“命名路由”（Named Route）即有名字的路由，我们可以先给路由起一个名字，然后就可以通过路由名字直接打开新的路由了，这为路由管理带来了一种直观、简单的方式。

### 注册路由表

```dart
Map<String, WidgetBuilder> routes;
```

它是一个 Map，key 为路由的名字，是个字符串；value 是个 builder 回调函数，用于生成相应的路由 widget。我们在通过路由名字打开新路由时，应用会根据路由名字在路由表中查找到对应的 WidgetBuilder 回调函数，然后调用该回调函数生成路由 widget 并返回。
可以理解成
www.xxx.com/ 进入首页
www.xxx.com/about 进入关于我们页面

```dart
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      initialRoute: "/",
      theme: ThemeData(primarySwatch: Colors.green, primaryColor: Colors.white),//设置App主题
      routes: {
        "/":(context)=>MyHomePage(),
        "/about":(context)=>About()
      },
    );
  }
}
```

### 通过路由名打开新路由页

```dart
  @optionalTypeArgs
  static Future<T> pushNamed<T extends Object>(
    BuildContext context,  //上下文
    String routeName, {    //路由名
    Object arguments,      //页面传参
   }) {
    return Navigator.of(context).pushNamed<T>(routeName, arguments: arguments);
  }
```

通过 routeName 跳转

```dart
onTap: () {
  Navigator.pushNamed(context, "/about");
  //Navigator.push(context, MaterialPageRoute(builder: (context) => (About())));
},
```

## 路由参数传递

**普通 push 传递参数**

```dart
class OtherGank extends StatelessWidget {
  final String content;

  OtherGank({Key key, this.content}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    var args=ModalRoute.of(context).settings.arguments;
    return Scaffold(
      appBar: AppBar(
        title: Text("其他Gank项目"),
      ),
      body: Center(child: Text(args==null?content:args)),
    );
  }
}
```

```dart
Navigator.push(context, MaterialPageRoute(builder: (context) => (OtherGank(content: "这是route传递的参数",))));
```

**命名路由参数传递**
传递

```dart
Navigator.pushNamed(context, "/other",arguments: "这是route传递的参数");
```

接收

```dart
var args=ModalRoute.of(context).settings.arguments;
```

### 路由返回值

接收返回参数

```dart
onTap: () async {
  var res = await Navigator.pushNamed(context, "/other",arguments: "这是route传递的参数");
  LogUtils.log(res);
},
```

传递返回参数

```dart
body: Center(child: RaisedButton(
  onPressed: (){
    Navigator.pop(context,"我要带返回值回去~");
  },
  child: Text("带参数回去"),
)),
```

点击 button 返回的就是带了参数的，点击 AppBar 的返回按钮则为 null。也就是说点击 AppBar 的返回按钮执行的是

```dart
Navigator.pop(context)
```

## 路由钩子

当使用命名路由跳转时在跳转之前可以做统一的登录判断权限判断之类的事情。

```dart
MaterialApp(
  ... //省略无关代码
  onGenerateRoute:(RouteSettings settings){
      return MaterialPageRoute(builder: (context){
           String routeName = settings.name;
       // 如果访问的路由页需要登录，但当前未登录，则直接返回登录页路由，
       // 引导用户登录；其它情况则正常打开路由。
     }
   );
  }
);
```

> - 注意，onGenerateRoute 只会对命名路由生效。

### 更详细的资料

[《Flutter 实战》路由管理](https://book.flutterchina.club/chapter2/flutter_router.html)

### 完整代码

[https://github.com/leiyun1993/FlutterDemo](https://github.com/leiyun1993/FlutterDemo-GankIO)

ps：以上完整代码为 Demo 代码。本文中的代码只为了测试路由功能，可能在项目中无法找到完全一样的代码！
