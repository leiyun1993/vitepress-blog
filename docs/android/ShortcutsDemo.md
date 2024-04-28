# Android Shortcut

### Shortcut

> 其中 App Shortcuts 是指在桌面长按 app 图标而出现的快捷方式, 可以为你的 app 的关键功能添加更快速的入口而不用先打开 app,点击快捷方式可以访问应用功能, 并且这种快捷方式也可以被拖拽到桌面单独放置, 变成单独的桌面快捷方式.

### 典型应用

支付宝&腾讯新闻（每次虽然国内跟进的晚，但是阿里腾讯也算是最早跟进的一批了）

![支付宝](https://github.com/leiyun1993/ShortcutsDemo/raw/master/screenshots/image3.jpg)
![腾讯新闻](https://github.com/leiyun1993/ShortcutsDemo/raw/master/screenshots/image4.jpg)

### 使用方式

两种方式使用

> - 静态的: 在 xml 中定义, 适用于一些通用的动作.
> - 动态的: 由 ShortcutManager 发布, 可以根据用户的行为或者偏好添加, 可以动态更新.

## 静态使用

在应用的 Manifest 中启动 Activity 上添加**meta-data**

```xml
<activity android:name=".MainActivity">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />

        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
    <meta-data
        android:name="android.app.shortcuts"
        android:resource="@xml/shortcuts" />
</activity>
```

然后在**res/xml/** 目录下创建 **shortcuts.xml**文件, 里面包含静态的 shortcuts:

```xml
<?xml version="1.0" encoding="utf-8"?>
<shortcuts xmlns:android="http://schemas.android.com/apk/res/android">

    <shortcut
        android:enabled="true"
        android:icon="@mipmap/icon1"
        android:shortcutDisabledMessage="@string/static_message"
        android:shortcutId="static1"
        android:shortcutLongLabel="@string/static_long_label_1"
        android:shortcutShortLabel="@string/static_short_label_1">
        <intent
            android:action="android.intent.action.VIEW"
            android:targetClass="com.githubly.shortcutsdemo.StaticTestActivity"
            android:targetPackage="com.githubly.shortcutsdemo" />
    </shortcut>

    <shortcut
        android:enabled="true"
        android:icon="@mipmap/icon2"
        android:shortcutDisabledMessage="@string/static_message"
        android:shortcutId="static2"
        android:shortcutLongLabel="@string/static_long_label_2"
        android:shortcutShortLabel="@string/static_short_label_2">
        <intent
            android:action="android.intent.action.VIEW"
            android:targetClass="com.githubly.shortcutsdemo.StaticTestActivity"
            android:targetPackage="com.githubly.shortcutsdemo" />
    </shortcut>

</shortcuts>
```

就这样就可以简单的创建了两个静态的 Shortcut，targetClass 表示点击快捷方式跳转的页面

![静态注册](https://github.com/leiyun1993/ShortcutsDemo/raw/master/screenshots/image1.jpg)

## 动态使用

动态的 shortcuts 可以在用户使用 app 的过程中构建, 更新, 或者删除.
使用 ShortcutManager 可以对动态 shortcuts 完成下面几种操作:

> - Publish 发布: setDynamicShortcuts(), addDynamicShortcuts(List);
> - Update 更新: updateShortcuts(List);
> - Remove 删除: removeDynamicShortcuts(List), removeAllDynamicShortcuts().

创建 ShortcutInfo

```kotlin
private fun addShortcutWithIntent1(): ShortcutInfo? {
    return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N_MR1) {
        ShortcutInfo.Builder(this, "Dynamic1").apply {
            setShortLabel("动态快捷1")
            setLongLabel("DynamicShortcutLong1")
            setIcon(Icon.createWithResource(this@MainActivity, R.mipmap.icon3))
            setIntent(Intent().apply {
                action = Intent.ACTION_MAIN
                setClass(this@MainActivity, DynamicTestActivity::class.java)
                putExtra("info", "Dynamic shortcuts target class with intent1")
            })
        }.build()
    } else {
        null
    }
}
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N_MR1) {
    val shortcutManager = getSystemService(ShortcutManager::class.java)

    val count = shortcutManager.maxShortcutCountPerActivity
    Log.e("count",count.toString())

    val list = mutableListOf<ShortcutInfo>()
    addShortcutWithIntent1()?.let {
        list.add(it)
    }
    /*addShortcutWithIntent2()?.let {
        list.add(it)
    }*/
    addShortcutWithIntents()?.let {
        list.add(it)
    }
    shortcutManager.dynamicShortcuts =list
}
```

### 多个 Intent 构建 back stack

动态的 shortcut 仍然可以用多个 Intent 来指定一个 back stack, 那么打开目标 Activity 之后就可以返回到应用中的指定界面而不是回到 launcher:

```kotlin
private fun addShortcutWithIntents(): ShortcutInfo? {
    return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N_MR1) {
        ShortcutInfo.Builder(this, "Dynamic3").apply {
            setShortLabel("动态快捷3")
            setLongLabel("DynamicShortcutLong3")
            setIcon(Icon.createWithResource(this@MainActivity, R.mipmap.icon5))
            setIntents(arrayOf(
                    Intent().apply {
                        action = Intent.ACTION_MAIN
                        setClass(this@MainActivity, MainActivity::class.java)
                        flags = Intent.FLAG_ACTIVITY_CLEAR_TASK
                    },
                    Intent().apply {
                        action = Intent.ACTION_MAIN
                        setClass(this@MainActivity, DynamicTestActivity::class.java)
                        flags = Intent.FLAG_ACTIVITY_CLEAR_TASK
                        putExtra("info", "Dynamic shortcuts target class with intents")
                    }
            )
            )
        }.build()
    } else {
        null
    }
}
```

动态添加

![动态添加](https://github.com/leiyun1993/ShortcutsDemo/raw/master/screenshots/image2.jpg)

### shortcut 数量

```kotlin
val count = shortcutManager.maxShortcutCountPerActivity
Log.e("count",count.toString())
```

目前虽然说是 5 个，但实际最多只能添加 4 个（最多添加 4 个 Shortcuts 以保持在启动器中显示的样式最佳）

如图实际是静态两个加上动态三个实际上只显示了四个

![动态添加](https://github.com/leiyun1993/ShortcutsDemo/raw/master/screenshots/image5.jpg)

## 疑问？

静态使用 长按后显示的是**android:shortcutLongLabel**的值，如果不设置**android:shortcutLongLabel**则显示**android:shortcutShortLabel**

动态使用 长按后显示的是**setShortLabel**的值

### github 地址 **[ShortcutsDemo](https://github.com/leiyun1993/ShortcutsDemo)**
