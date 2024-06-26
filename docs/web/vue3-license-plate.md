# vue3-license-plate

### 介绍

- vue3-license-plate 是一款基于 vue3 的车牌号输入控件。

### vue2 版本

[vue-license-plate](https://github.com/leiyun1993/vue2-license-plate)

### 微信小程序版本

[mp-license-plate](https://github.com/leiyun1993/mp-license-plate)

### 项目中使用

- 下载

```
npm install vue3-license-plate
```

- 在 main.js 中加入

```
import LicensePlate from 'vue3-license-plate'
import 'vue3-license-plate/lib/licensePlate.css'

createApp(App).use(LicensePlate).mount('#app')
```

- 在需要的页面中使用

```
licensePlate: "川A00001"

<LicensePlate v-model="licensePlate" @change="change"></LicensePlate>

change(val){
	console.log(val.array)	//数组形式
	console.log(val.value)	//字符串形式
	console.log(val.pass)	  //是否验证通过
}
```

- 自定义车牌展示

```
<LicensePlate :borderRadius="6"
							@change="changeVal"
							v-model="licensePlate"
							:autoShow="false">
						<div class="custom">{{ licensePlate }}</div>
</LicensePlate>
//自定义时 borderColor borderActiveColor borderWidth borderRadius  fontColor fontSize 无效
//自定义时点击事件根据当前长度计算，即默认选中最后一位
```

- 展示如下
  ![](https://github.com/leiyun1993/vue3-license-plate/raw/main/screenshot/s1.png)

## API

### Props

| 名字              | 类型    | 默认值  | 说明                 |
| ----------------- | ------- | ------- | -------------------- |
| v-model           | String  | ""      | 默认车牌号           |
| autoShow          | Boolean | false   | 自动展示键盘         |
| borderColor       | String  | #79aef3 | 输入框边框颜色       |
| borderActiveColor | String  | #330aec | 输入框选中的边框颜色 |
| borderWidth       | Number  | 1       | 边框宽度             |
| borderRadius      | Number  | 6       | 边框圆角             |
| fontColor         | String  | #333333 | 文字颜色             |
| fontSize          | Number  | 16      | 文字大小             |

### Events

| 名字    | 说明           | 回调参数                             |
| ------- | -------------- | ------------------------------------ |
| @change | 输入改变时触发 | `{array:[],value:string,pass:false}` |

## Change Log

- 1.0.2

1、增加 '警'、'挂'
2、支持车牌 slot

- 1.0.1

自动展示键盘

- 1.0.0

首次发版

### 完整代码

[https://github.com/leiyun1993/vue3-license-plate](https://github.com/leiyun1993/vue3-license-plate)
