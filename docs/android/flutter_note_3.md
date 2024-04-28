# Flutter 笔记(三)：设置白色状态栏

## 前言

在 App 设计中状态栏纯色的这种设计很常见，但是如果状态栏需要为白色的时候就必须为黑色字体。在 Android 中已经有很多成熟的方案来处理这种情况，那我们现在看看在 Flutter 中这种情况该怎么处理。

## 具体设置

### 1、设置主题色

```dart
class MyApp extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(primarySwatch: Colors.red, primaryColor: Colors.white),  //设置App主题
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}
```

这里的 ThemeData 即为控制 App 的主题，primarySwatch 设置即可控制主题的各类颜色，但是这里的颜色是需要 MaterialColor，但是纯色种的黑色和白色不是 MaterialColor。所以不能设置 primarySwatch 为 Colors.white。
注：MaterialColor 包含以下这些

> - red,
> - pink,
> - purple,
> - deepPurple,
> - indigo,
> - blue,
> - lightBlue,
> - cyan,
> - teal,
> - green,
> - lightGreen,
> - lime,
> - yellow,
> - amber,
> - orange,
> - deepOrange,
> - brown,
> - blueGrey,

那么就只能使用其他方式设置主题为白色。即为设置

```dart
primaryColor: Colors.white
```

此时我们可以看到 App 的状态栏如下所示（Android）
![1.png](/android/flutter_note_3_1.png)

### 2、设置状态栏

虽然 AppBar 变成了白色，但是状态栏是灰色显然不是我们想要的。
尝试设置文字颜色，AppBar 的 Brightness 有两种模式 light 和 dark

```dart
appBar: PreferredSize(
    child: AppBar(
    brightness: Brightness.dark,
    title: Center(
         child: Text(
          "FlutterDemo",
        ),
      ),
   ),
  preferredSize: Size(double.infinity, 60)
),
```

这个和 SystemUiOverlayStyle 的 light 和 dark 刚好相反

```dart
final SystemUiOverlayStyle overlayStyle = brightness == Brightness.dark
      ? SystemUiOverlayStyle.light
      : SystemUiOverlayStyle.dark;
```

然后设置状态栏颜色

```dart
import 'dart:io';
import 'package:flutter/services.dart';
void main() {
  runApp(MyApp());

  if (Platform.isAndroid) {
    SystemUiOverlayStyle systemUiOverlayStyle = SystemUiOverlayStyle(
        statusBarColor: Colors.red,
//        statusBarBrightness: Brightness.light,
//        statusBarIconBrightness: Brightness.dark
    );
    SystemChrome.setSystemUIOverlayStyle(systemUiOverlayStyle);

    print("systemUiOverlayStyle");
  }
}
```

设置为红色之后，得到以下的样式，可以看到状态栏为红色了，文字为白色
![2.png](/android/flutter_note_3_2.png)
那么接下来我们只需要将状态栏设置为白色或者透明，状态栏文字设置为黑色。

```dart
void main() {
  runApp(MyApp());

  if (Platform.isAndroid) {
    SystemUiOverlayStyle systemUiOverlayStyle = SystemUiOverlayStyle(
        statusBarColor: Colors.transparent,  //设置为透明
    );
    SystemChrome.setSystemUIOverlayStyle(systemUiOverlayStyle);
  }
}
```

最后得到以下视图
![3.png](/android/flutter_note_3_3.png)

### 3、推荐 AppBar 的使用方式

注：使用 PreferredSize 包裹，可以更得心应手哦！

```dart
//      appBar: PreferredSize(
//          child: Container(
//            width: double.infinity,
//            height: double.infinity,
//            decoration: BoxDecoration(color: Colors.white, boxShadow: [
//              BoxShadow(color: Color.fromRGBO(0, 0, 0, 0.2), blurRadius: 10.0)
//            ]),
//            child: SafeArea(
//                child: Center(
//              child: Text("FlutterDemo",style: TextStyle(fontSize: 16,fontWeight: FontWeight.bold),),
//            )),
//          ),
//          preferredSize: Size(double.infinity, 60)),
      appBar: PreferredSize(
          child: AppBar(
            backgroundColor: Colors.white,
            brightness: Brightness.light,
            title: Center(
              child: Text(
                "FlutterDemo",
              ),
            ),
          ),
          preferredSize: Size(double.infinity, 60)),
```

### 4、其他注意事项

SystemUiOverlayStyle 在设置时其实有很多系统或者版本的限制

```dart
  /// The color of top status bar.
  ///
  /// Only honored in Android version M and greater.
  final Color statusBarColor;   //设置状态栏颜色，只在Android的M版本以上生效

  /// The brightness of top status bar.
  ///
  /// Only honored in iOS.
  final Brightness statusBarBrightness;  //状态栏亮度，只在IOS生效，只有light和dart模式

  /// The brightness of the top status bar icons.
  ///
  /// Only honored in Android version M and greater.
  final Brightness statusBarIconBrightness;  //状态栏Icon亮度，只在Android的M版本以上生效，只有light和dart模式，和AppBar的brightness相反
```

## 其他相关参考

[[Flutter]使用主题](https://www.jianshu.com/p/7c1754e9e2ff)
[flutter 设置沉浸式状态栏](https://www.jianshu.com/p/97e93c82ccef)

### 完整代码

[https://github.com/leiyun1993/FlutterDemo](https://github.com/leiyun1993/FlutterDemo-GankIO)）
