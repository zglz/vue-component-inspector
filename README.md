# Vue-Component-Inspector

> Vue-Component-Inspector 是一款 Vue 2.0 开发调试工具，它本身也是一个 Vue 组件。

基于 [Element-UI](https://element.faas.ele.me/#/zh-CN/component/installation) 开发。

![](./assets/screenshot.jpg)


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
  noInspect: [] // 不可审查组件name
};
Vue.use(VCI, options)
```


## 使用教程

### 视频教程

![](./assets/video.jpg)

视频地址


#### 视图栏
![](./assets/viewBar.jpg)

#### 导航面板
![](./assets/nav.png)


#### 基本信息面板
![](./assets/base.jpg)


#### 数据面板
![](./assets/data.jpg)


#### 事件面板
![](./assets/event.jpg)



#### ⚠️ 注意事项


##### 可审查组件 

为了提高调试工具性能，并非所有的组件都具有可审查的权限。 ⚠️<font color=red> **只有组件具有name属性，并且不在noInspect中配置的组件具有审查权限（ 具有name属性&&(!noInspect) ）** </font>

使用 [Element-UI](https://element.faas.ele.me/#/zh-CN/component/installation)，建议配置如下
```js
const options = {
  noInspect: [] // 不可审查组件name
};
Vue.use(VCI, {
    noInspect:['ElPagination', 'ElDialog', 'ElAutocomplete', 'ElDropdown', 'ElDropdownMenu', 'ElDropdownItem', 'ElMenu', 'ElSubmenu', 'ElMenuItem', 'ElMenuItemGroup', 'ElInput', 'ElInputNumber', 'ElRadio', 'ElRadioGroup', 'ElRadioButton', 'ElCheckbox', 'ElCheckboxButton', 'ElCheckboxGroup', 'ElSwitch', 'ElSelect', 'ElOption', 'ElOptionGroup', 'ElButtonGroup', 'ElTable', 'ElTableColumn', 'ElDatePicker', 'ElTimeSelect', 'ElTimePicker', 'ElPopover', 'ElTooltip', 'ElBreadcrumb', 'ElBreadcrumbItem', 'ElForm', 'ElFormItem', 'ElTabs', 'ElTabPane', 'ElTag', 'ElTree', 'ElAlert', 'ElSlider', 'ElIcon', 'ElRow', 'ElCol', 'ElUpload', 'ElProgress', 'ElSpinner', 'ElBadge', 'ElCard', 'ElRate', 'ElSteps', 'ElStep', 'ElCarousel', 'ElScrollbar', 'ElCarouselItem', 'ElCollapse', 'ElCollapseItem', 'ElCascader', 'ElColorPicker', 'ElTransfer', 'ElContainer', 'ElHeader', 'ElAside', 'ElMain', 'ElFooter', 'ElTimeline', 'ElTimelineItem', 'ElLink', 'ElDivider', 'ElImage', 'ElCalendar', 'ElBacktop', 'ElPageHeader', 'ElCascaderPanel', 'ElAvatar', 'ElDrawer', 'ElPopconfirm', 'ElCollapseTransition', 'ElTreeNode', undefined, 'SvgIcon', 'SidebarItem','ElTableBody','ElTableHeader','ElSelectDropdown']
                })
```



## 本地开发
```bash
$ npm i
$ npm run dev:dist
```



