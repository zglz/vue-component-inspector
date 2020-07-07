# Vue-Component-Inspector

> Vue-Component-Inspector 是一款 Vue 2.0 开发调试工具，它本身也是一个 Vue 组件。

基于 [Element-UI](https://element.faas.ele.me/#/zh-CN/component/installation) 开发。

![](./assets/screenshot.jpg)


## 安装

```bash
$ npm install vue-component-inspector -S
```

## 使用方法 (Vue CLI )

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

<video src="./assets/show.mp4" width="800px" height="600px" controls="controls"></video>

<video src="https://apd-05d336a1b4772da1e283799cf0c551fa.v.smtcdns.com/vhot2.qqvideo.tc.qq.com/A2MpZpoZp960E9gqArnh3G34Wi_9zUANpgm3UGU29zgM/uwMROfz2r5zEIaQXGdGnC2dfJ6norVr71SyOzMWdO4L-7R5f/o09294fum1s.p701.1.mp4?sdtfrom=v1104&guid=a4106cc96ce1444bd03862a74a82d1b6&vkey=7A77CC2285DCB33DDA884E80CDE79957D9548DE12C9CCE43F39EEB0C01B140E1771ECDA0177F9476DB13D06EDA7B0049E9109BFBAEA1828B3D9E706BBC58BBAFCE7F334627C48533FF03B35EEF0026DD89E21E82C4212743C8B4D4A564E6DAB58B308B8956A6F375E161343E37297896B11B8C7D315AE83FC4ED6DDE0D54357F" width="800px" height="600px" controls="controls"></video>

