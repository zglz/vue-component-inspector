# Vue-Component-Inspector

> Vue-Component-Inspector 是一款 Vue 2.0 开发调试工具，它本身也是一个 Vue 组件。

基于 [Element-UI](https://element.faas.ele.me/#/zh-CN/component/installation) 开发。

![](./assets/screenshot1.jpg)


## 安装方法 (Vue CLI )

```bash
$ npm install vue-component-inspector -S
```


####在 main.js 中写入以下内容：
```js
import VCI from 'vue-component-inspector'
 
Vue.use(VCI)
```

####在 app.vue 中写入以下内容：
```js
<div id="app">
    <vue-component-inspector/>
</div>
```


## 配置参数
```js
const options = {
  latencyThreshold: 200, // Number of ms before progressbar starts showing, default: 100,
  router: true, // Show progressbar when navigating routes, default: true
  http: false // Show progressbar when doing Vue.http, default: true
};
Vue.use(VCI, options)
```


## 使用教程

### 视频教程

![](./assets/video1.jpg)

视频地址


#### 视图栏
![](./assets/viewBar1.jpg)

#### 导航面板
![](./assets/nav1.png)


#### 基本信息面板
![](./assets/base1.jpg)


#### 数据面板
![](./assets/data1.jpg)


#### 事件面板
![](./assets/event1.jpg)



#### ⚠️ 注意事项


##### 可以审查组件 

为了提高调试工具性能，并非所有的组件都具有可审查的权限。 <font color=red> 只有组件具有name属性，并且不在noInspect中配置的组件具有审查权限（ 具有name属性&&(!noInspect) ） </font>








Vue-ECharts 默认在 webpack 环境下会引入未编译的源码版本，如果你正在使用官方的 Vue CLI 来创建项目，可能会遇到默认配置把 `node_modules` 中的文件排除在 Babel 转译范围以外的问题。请按如下方法修改配置：

当使用 **Vue CLI 3+** 时，需要在 `vue.config.js` 中的 `transpileDependencies` 增加 `vue-echarts` 及 `resize-detector`，如下：

```js
// vue.config.js
module.exports = {
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ]
}
```

当使用 **Vue CLI 2** 的 `webpack` 模板时，需要按下述的方式修改 `build/webpack.base.conf.js`：

```diff
      {
        test: /\.js$/,
        loader: 'babel-loader',
-       include: [resolve('src'), resolve('test')]
+       include: [
+         resolve('src'),
+         resolve('test'),
+         resolve('node_modules/vue-echarts'),
+         resolve('node_modules/resize-detector')
+       ]
      }
```

如果你正直接配置使用 webpack，那么也请做类似的修改使其能够正常工作。

##### 在 Nuxt.js 中使用

在 Nuxt.js 的服务端中使用 Vue-ECharts 时，可能没有正常转译。这是因为 Nuxt.js 默认会将 `node_modules` 目录下的绝大多数文件被排除在服务端打包代码以外。需要手动将 `vue-echarts` 加入白名单。

对于 **Nuxt.js v2** 项目，按如下方式修改 `nuxt.config.js`：

```js
module.exports = {
  build: {
    transpile: ['vue-echarts', 'resize-detector']
  }
}
```

对于 **Nuxt.js v1** 项目，按如下方式修改 `nuxt.config.js`：


```js
// 别忘了运行
// npm i --save-dev webpack-node-externals
const nodeExternals = require('webpack-node-externals')

module.exports = {
  // ...
  build: {
    extend (config, { isServer }) {
      // ...
      if (isServer) {
        config.externals = [
          nodeExternals({
            // `whitelist` 选项的默认值是
            // [/es6-promise|\.(?!(?:js|json)$).{1,5}$/i]
            whitelist: [/es6-promise|\.(?!(?:js|json)$).{1,5}$/i, /^vue-echarts/]
          })
        ]
      }
    }
  }
}
```

### AMD

```js
require.config({
  paths: {
    'vue': 'path/to/vue',
    'echarts': 'path/to/echarts',
    'vue-echarts': 'path/to/vue-ehcarts'
  }
})

require(['vue', 'vue-echarts'], function (Vue, ECharts) {
  // 注册组件后即可使用
  Vue.component('v-chart', ECharts)
})
```

### 全局变量

在没有使用任何模块系统的情况下，组件将通过 `window.VueECharts` 变量暴露接口：

```js
// 注册组件后即可使用
Vue.component('v-chart', VueECharts)
```

## 调用组件

```vue
<template>
<v-chart :options="polar"/>
</template>

<style>
/**
 * 默认尺寸为 600px×400px，如果想让图表响应尺寸变化，可以像下面这样
 * 把尺寸设为百分比值（同时请记得为容器设置尺寸）。
 */
.echarts {
  width: 100%;
  height: 100%;
}
</style>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'

export default {
  components: {
    'v-chart': ECharts
  },
  data () {
    let data = []

    for (let i = 0; i <= 360; i++) {
        let t = i / 180 * Math.PI
        let r = Math.sin(2 * t) * Math.cos(2 * t)
        data.push([r, i])
    }

    return {
      polar: {
        title: {
          text: '极坐标双数值轴'
        },
        legend: {
          data: ['line']
        },
        polar: {
          center: ['50%', '54%']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        angleAxis: {
          type: 'value',
          startAngle: 0
        },
        radiusAxis: {
          min: 0
        },
        series: [
          {
            coordinateSystem: 'polar',
            name: 'line',
            type: 'line',
            showSymbol: false,
            data: data
          }
        ],
        animationDuration: 2000
      }
    }
  }
}
</script>
```

查看[这里](https://github.com/ecomfe/vue-echarts/tree/master/src/demo)了解更多例子。

### Props *（均为响应式）*

* `initOptions`

  用来初始化 ECharts 实例。

* `theme`

  当前 ECharts 实例使用的主题。

* `options`

  ECharts 实例的数据。修改这个 prop 会触发 ECharts 实例的 `setOption` 方法。

  如果直接修改 `options` 绑定的数据而对象引用保持不变，`setOption` 方法调用时将带有参数 `notMerge: false`。否则，如果为 `options` 绑定一个新的对象，`setOption` 方法调用时则将带有参数 `notMerge: true`。

  例如，如果有如下模板：

  ```html
  <v-chart :options="data"/>
  ```

  那么：

  ```js
  this.data = newObject // setOption(this.options, true)
  this.data.title.text = 'Trends' // setOption(this.options, false)
  ```

* `group`

  实例的分组，会自动绑定到 ECharts 组件的同名属性上。

* `autoresize` （默认值：`false`）

  这个 prop 用来指定 ECharts 实例在组件根元素尺寸变化时是否需要自动进行重绘。

* `manual-update` （默认值：`false`）

  在性能敏感（数据量很大）的场景下，我们最好对于 `options` prop 绕过 Vue 的响应式系统。当将 `manual-update` prop 指定为 `true` 且不传入 `options` prop 时，数据将不会被监听。然后，你需要用 `ref` 获取组件实例以后手动调用 `mergeOptions` 方法来更新图表。

### 计算属性

* `width` **[只读]**

  用来获取 ECharts 实例的当前宽度。

* `height` **[只读]**

  用来获取 ECharts 实例的当前高度。

* `computedOptions` **[只读]**

  用来读取 ECharts 更新内部 `options` 后的实际数据。

### 方法

* `mergeOptions`（底层调用了 ECharts 实例的 `setOption` 方法）

  *提供了一个更贴切的名称来描述 `setOption` 方法的实际行为。*

* `appendData`
* `resize`
* `dispatchAction`
* `showLoading`
* `hideLoading`
* `convertToPixel`
* `convertFromPixel`
* `containPixel`
* `getDataURL`
* `getConnectedDataURL`
* `clear`
* `dispose`

### 静态方法

* `connect`
* `disconnect`
* `registerMap`
* `registerTheme`
* `graphic.clipPointsByRect`
* `graphic.clipRectByRect`

### 事件

Vue-ECharts 支持如下事件：

* `legendselectchanged`
* `legendselected`
* `legendunselected`
* `legendscroll`
* `datazoom`
* `datarangeselected`
* `timelinechanged`
* `timelineplaychanged`
* `restore`
* `dataviewchanged`
* `magictypechanged`
* `geoselectchanged`
* `geoselected`
* `geounselected`
* `pieselectchanged`
* `pieselected`
* `pieunselected`
* `mapselectchanged`
* `mapselected`
* `mapunselected`
* `axisareaselected`
* `focusnodeadjacency`
* `unfocusnodeadjacency`
* `brush`
* `brushselected`
* `rendered`
* `finished`
* 鼠标事件
  * `click`
  * `dblclick`
  * `mouseover`
  * `mouseout`
  * `mousemove`
  * `mousedown`
  * `mouseup`
  * `globalout`
  * `contextmenu`
* ZRender 事件 *(v4.1.0 新增)*
  * `click`
  * `mousedown`
  * `mouseup`
  * `mousewheel`
  * `dblclick`
  * `contextmenu`

更多详细信息请参考 [ECharts 的 API 文档](https://echarts.apache.org/zh/api.html)。

## 本地开发

```bash
$ npm i
$ npm run serve
```

打开 `http://localhost:8080/demo` 来查看 demo。


