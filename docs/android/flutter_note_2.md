# Flutter 笔记(二)：Icon，ImageIcon,以及在 Flutter 中使用 IconFont

### Icon

```dart
const Icon(
    this.icon, {    //创建一个图标
    Key key,
    this.size,      //图标大小，图标是正方形，所以是同时设置了宽和高
    this.color,    //图标是纯色，这表示图标颜色
    this.semanticLabel,  //图标的语义标签
    this.textDirection,  //用于渲染图标的文本方向
})
```

使用

```dart
Icon(IconFont.iconcategory,size: 50,color: Colors.red,),
Icon(IconData(0xe072, fontFamily: 'MaterialIcons'),size: 50,color: Colors.red,)  //IconData主要包含Code和字体名
```

### ImageIcon

```dart
const ImageIcon(
    this.image, {  //和Icon基本相同只是将Icon换成了Image（ImageProvider）
    Key key,
    this.size,
    this.color,
    this.semanticLabel,
 })
```

ImageProvider 包含 5 个子类

> - NetworkImage
> - FileImage
> - MemoryImage
> - ExactAssetImage
> - AssetImage

使用

```dart
ImageIcon(NetworkImage("https://s2.ax1x.com/2019/08/16/mZeD4P.png"),size: 50,),
ImageIcon(AssetImage("images/other.png"),size: 50,color: Colors.red,),
```

注 1：加载 asset 需要在**pubspec.yaml**中加入

```yaml
flutter:
  assets:
    - images/
```

注 2：如果要想使用多色图标可使用 Image 代替

```dart
Image.asset(
    "images/other.png",
    width: 50,
    height: 50,
),
Image.network(
     "https://s2.ax1x.com/2019/08/16/mZeD4P.png",
     width: 50,
     height: 50,
),
```

### 在 Flutter 中使用 IconFont

阿里字体图标库[https://www.iconfont.cn](https://www.iconfont.cn/)
**1、选择或上传想要的图标**
下载到本地
![1.jpg](/android/flutter_note_2_1.png)

**2、解压拿到.ttf 和.css 文件**
![2.jpg](/android/flutter_note_2_2.png)

**3、iconfont.ttf 放入项目中，iconfont.css 文件转换为.dart 种的 IconData**
![3.jpg](/android/flutter_note_2_3.png)
转换关系

```css
.iconhome:before {
  content: '\e600'; //css中的home图标
}
```

css 中的“\e600”转化为 IconData 种的“0xe600”（code）

```dart
import 'package:flutter/widgets.dart';
class IconFont{
  static const String _family = 'iconfont';
  IconFont._();
  static const IconData iconhome = IconData(0xe600, fontFamily: _family);  //IconData的home图标
}
```

**4、使用**

```dart
Icon(IconFont.iconcategory,size: 50,color: Colors.red,)
```

**5、关于转化**
根据上面的规则写了一个转化文件，直接拖入 CSS 文件即可转化
![4.jpg](/android/flutter_note_2_4.png)
新建一个 html 文件复制以下代码，用浏览器打开即可使用转化功能

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <title>iconfont.css 转 Flutter IconData</title>
  </head>
  <body>
    <h1 style="text-align:center">iconfont.css 转 Flutter IconData</h1>
    <div id="drop_div">将iconfont.css文件拖放到这里</div>
    <div class="tips">生成后复制以下代码到iconfont.dart即可使用</div>
    <div id="show_dart" class="dis-box"></div>
    <script>
      var dropDiv = document.getElementById('drop_div')
      var showDart = document.getElementById('show_dart')

      dropDiv.addEventListener(
        'dragenter',
        function () {
          event.preventDefault()
        },
        false,
      )
      dropDiv.addEventListener(
        'dragover',
        function () {
          event.preventDefault()
        },
        false,
      )

      dropDiv.addEventListener(
        'drop',
        function (event) {
          var fileReader = new FileReader()
          fileReader.onload = function (ev) {
            var result = ev.target.result
            showDart.innerHTML = '<pre>' + buildDratClass(result) + '</pre>'
          }
          fileReader.readAsText(event.dataTransfer.files[0])
          event.preventDefault()
        },
        false,
      )

      function buildDratClass(css) {
        var names = css.match(/(?<=\.).+(?=:before)/g) //正则匹配出name
        var values = css.match(/(?<="\\)e[0-9a-zA-Z]{3}(?=";)/g) //匹配出Code
        var rawContent = "import 'package:flutter/widgets.dart';"
        rawContent += '\nclass IconFont{'
        rawContent += "\n\tstatic const String _family = 'iconfont';"
        rawContent += '\n\tIconFont._();'

        for (var i = 0; i < names.length; i++) {
          var name = names[i].replace(/-/g, '_')
          //根据上面讲的规则生成IconData
          rawContent +=
            '\n\tstatic const IconData ' +
            name +
            ' = IconData(0x' +
            values[i] +
            ', fontFamily: _family);'
        }

        rawContent += '\n}'
        return rawContent
      }
    </script>
  </body>
  <style>
    html,
    body {
      padding: 0;
      margin: 0;
      background: #fafafa;
    }

    body {
      padding: 24px;
    }

    #drop_div {
      height: 100px;
      border: 2px dashed rgba(0, 0, 0, 0.24);
      font-size: 24px;
      font-weight: bold;
      text-align: center;
      line-height: 100px;
      color: rgba(54, 53, 53, 0.24);
      background: white;
    }
    .tips {
      padding: 10px 0;
      font-weight: bold;
    }
    .dis-box {
      background-color: #fff;
      padding: 20px;
    }
  </style>
</html>
```

### 完整代码

[https://github.com/leiyun1993/FlutterDemo](https://github.com/leiyun1993/FlutterDemo-GankIO)
