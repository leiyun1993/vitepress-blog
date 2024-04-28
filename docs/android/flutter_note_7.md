# Flutter 笔记(七)：Dio 网络请求、Json 数据解析以及泛型问题

## 前言

dio 是一个强大的 Dart Http 请求库，支持 Restful API、FormData、拦截器、请求取消、Cookie 管理、文件上传/下载、超时、自定义适配器等...
dio 是 flutterchina 的所以有很完整的中文文档，具体的 api 不多讲，我们这里只是提一下怎么封装。中文文档可以点击链接查看。[https://github.com/flutterchina/dio/blob/master/README-ZH.md](https://github.com/flutterchina/dio/blob/master/README-ZH.md)

## 为啥封装

> - 统一处理请求域名；
> - 统一打印请求信息；
> - 统一打印响应信息；
> - 统一打印报错信息；
> - 返回数据自动转 json 格式；
> - ...

## dio

### 1、添加 dio 依赖

编辑 项目根目录/pubspec.yaml，找到 dependecies 属性，添加 dio 依赖。

```yaml
dependencies:
  flutter:
    sdk: flutter

  dio: '^2.1.13'
```

### 2、封装 HttpUtils

```dart
import 'package:dio/dio.dart';
import 'package:gank_flutter/utils/LogUtils.dart';

class HttpUtils {
  static const BASE_URL = "http://gank.io/api";
  static const CONNECT_TIMEOUT = 5000;
  static const RECEIVE_TIMEOUT = 3000;
  static Dio dio;

  /// 生成Dio实例
  static Dio getInstance() {
    if (dio == null) {
      //通过传递一个 `BaseOptions`来创建dio实例
      var options = BaseOptions(
          baseUrl: BASE_URL,
          connectTimeout: CONNECT_TIMEOUT,
          receiveTimeout: RECEIVE_TIMEOUT);
      dio = new Dio(options);
    }
    return dio;
  }

  /// 请求api
  static Future<Map> request(String url, {data, method}) async {
    data = data ?? {};
    method = method ?? "get";

    // 由于我示例的接口是 http://gank.io/api/data/福利/10/1
    // 所以使用下面这张方式拼接get参数
    // 如上面则为 http://gank.io/api/data/:category/:pageSize/:page
    data.forEach((key, value) {
      if (url.indexOf(key) != -1) {
        url = url.replaceAll(':$key', value.toString());
      }
    });
    // 打印请求相关信息：请求地址、请求方式、请求参数
    LogUtils.log("请求地址：【$method $url】");
    LogUtils.log("请求参数：【$data】");

    var dio = getInstance();
    var res;
    if (method == "get") {
      // get
      var response = await dio.get(url);
      res = response.data;
    } else {
      // post
      var response = await dio.post(url, data: data);
      res = response.data;
    }
    return res;
  }

  /// get
  static Future<Map> get(url, data) => request(url, data: data);

  /// post
  static Future<Map> post(url, data) =>
      request(url, data: data, method: "post");
}

```

### 3、使用

get 方式如果是拼接 path 则如下，如果是 get 的 query 则无需**:size**这种，如果是 post 方式也是直接传递参数即可。

```dart
void _initData() async {
  var map = Map();
  map["size"] = 10;
  map["page"] = 1;
  var res = await HttpUtils.get("/data/福利/:size/:page",map);
  LogUtils.log(res["result"]);
  setState(() {
    _imageList=res["result"];
  });
}
```

## JSON 解析

现在我们得到的是一个**Map<String, dynamic>**对象，可以通过**res["result"]**的形式得到值，但是我们一般在 JSON 不复杂或者层级不深的时候可以使用这种方式获取值，但是当 JSON 很复杂的时候我们这样获取可能就难免出错。此时我们可以使用**FlutterJsonBeanFactory**将 Map 解析为对象，我们就可以使用如**MeiZiEntity.fromJson(res).results**的形式获取值了。

### 1、搜索并安装 FlutterJsonBeanFactory

AndroidStudio 3.5 RC3
加载不出来的话去这里[https://plugins.jetbrains.com/plugin/11415-flutterjsonbeanfactory/](https://plugins.jetbrains.com/plugin/11415-flutterjsonbeanfactory/)

### 2、重启后使用

重启之后在 new 的时候就会多一个 dart bean class File from Json 的选项

### 3、生成 dart 类

点击 make 后生成**mei_zi_entity.dart**其中**fromJson**和**toJson**就是解析的关键，实际上就是自动把 Map 中的数据取出来拼接成对象。

```dart
class MeiZiEntity {
  bool error;
  List<MeiZiResult> results;

  MeiZiEntity({this.error, this.results});

  MeiZiEntity.fromJson(Map<String, dynamic> json) {
    error = json['error'];
    if (json['results'] != null) {
      results = new List<MeiZiResult>();
      (json['results'] as List).forEach((v) {
        results.add(new MeiZiResult.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['error'] = this.error;
    if (this.results != null) {
      data['results'] = this.results.map((v) => v.toJson()).toList();
    }
    return data;
  }
}
```

### 4、json 数据转对象

结合上面我们的 dio 请求，这里我们拿到数据的时候就可以如下方式进行解析并使用了。

```dart
void _initData() async {
  var map = Map();
  map["size"] = 10;
  map["page"] = 1;
  var res = await HttpUtils.get("/data/福利/:size/:page",map);
  setState(() {
    _imageList=MeiZiEntity.fromJson(res).results;
  });
}
```

## 泛型问题

在我们使用的测试 Api 中基本数据类型大概有如下两种方式，一种 result 为对象，一种 result 为数组。
如下这两种，

```json
{
  "error": false,
  "results": [
    {
      "_id": "5ccdbc219d212239df927a93"
    }
  ]
}
```

```json
{
  "error": false,
  "results": {
    "_id": "5ccdbc219d212239df927a93"
  }
}
```

此时如果我们要使用统一的 BaseBean 去解析就存在泛型问题，由于 list 获取不到 list 的 item 的泛型,所以不可以传入 `list<A>`这样的泛型。所以这里我们就不在底层去处理，List 的泛型问题，而是在 BaseBean 用其他方式去绕过这个问题。（ps：我这个方法肯定不是很好，这里我们只是为了引出 EntityFactory 的使用，其他情况可根据自己的需求去封装。）

### 1、EntityFactory

使用 FlutterJsonBeanFactory 后在 lib 根目录下会生成**entity_factory.dart**文件

```dart
import 'package:gank_flutter/model/category_entity.dart';
import 'package:gank_flutter/model/mei_zi_entity.dart';

class EntityFactory {
  static T generateOBJ<T>(json) {
    if (1 == 0) {
      return null;
    } else if (T.toString() == "CategoryEntity") {
      return CategoryEntity.fromJson(json) as T;
    } else if (T.toString() == "MeiZiEntity") {
      return MeiZiEntity.fromJson(json) as T;
    } else {
      return null;
    }
  }
}
```

实际上他是根据这个规则生成的代码
同时如果手动更改过或者是手动生成的 bean 可以点击如图所示自动更新和生成代码（ps：前提是满足上面的规则）

### 2、使用 EntityFactory

我的做法就是把对象的 results 和数组的 results 分开解析。具体见下面的 BaseBean

```dart
import 'package:gank_flutter/entity_factory.dart';
/// 解析基类
class BaseBeanEntity<T> {
  bool error;
  Map<String, dynamic> results;
  List<dynamic> resultsList;

  BaseBeanEntity({this.error, this.results, this.resultsList});

  /// 处理results为对象的情况
  BaseBeanEntity.fromJson(Map<String, dynamic> json) {
    error = json['error'];
    results = json['results'];
  }

  /// 处理results为数组的情况
  BaseBeanEntity.fromJsonList(Map<String, dynamic> json) {
    error = json['error'];
    resultsList = json['results'];
  }

  /// 获取results对象
  T getObject<T>() {
    return EntityFactory.generateOBJ<T>(results); //使用EntityFactory解析对象
  }

  /// 获取results数组
  List<T> getList<T>() {
    var list = new List<T>();
    if (resultsList != null) {
      resultsList.forEach((v) { //拼装List
        list.add(EntityFactory.generateOBJ<T>(v));//使用EntityFactory解析对象
      });
    }
    return list;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['error'] = this.error;
    if (this.results != null) {
      data['results'] = this.results;
    }
    return data;
  }
}
```

### 3、BaseBean 的使用

结合 dio 网络请求使用 BaseBean，这样可以相对简化了 Json 解析为 bean 的过程。

```dart
void _initData() async {
  var map = Map();
  map["size"] = 10;
  map["page"] = 1;
  var res = await HttpUtils.get("/data/福利/:size/:page", map);
  setState(() {
    _imageList = BaseBeanEntity.fromJsonList(res).getList<MeiZiEntity>(); //results为数组
    _imageObj = BaseBeanEntity.fromJson(res).getObject<MeiZiEntity>();  //results为对象
  });
}

MeiZiEntity item = _imageList[index];
String imageUrl = item.url;
```

### 完整代码

[https://github.com/leiyun1993/FlutterDemo](https://github.com/leiyun1993/FlutterDemo-GankIO)
