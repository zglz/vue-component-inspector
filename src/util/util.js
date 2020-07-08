import { NoInspect, VueBuiltIn } from './../config'

// 是否是可视化组件
export function isViewCom (vm) {
  // debugger
  const vmNname = vm.$options.name
  let ret = true
  if (!vmNname) {
    // 是ElementUI组件&&不显示ElementUI
    ret = false
  }
  if (NoInspect.indexOf(vmNname) > 0) {
    // 是ElementUI组件&&不显示ElementUI
    ret = false
  }
  if (VueBuiltIn.indexOf(vmNname) > 0) {
    // 内置组件
    ret = false
  }
  if (vmNname === 'VueComponentInspector') {
    // 内置组件
    ret = false
  }
  return ret
}

// 是否是可视化组件
export function isPlainObject (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}
/*
isPlainObject (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
},
*/

