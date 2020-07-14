import { NoInspect, VueBuiltIn } from './../config'

export function isViewCom (vm) {
  // debugger
  const vmNname = vm.$options.name
  let ret = true
  if (!vmNname) {   // not Name
    ret = false
  }
  if (NoInspect.indexOf(vmNname) > 0) {   // NoInspect
    ret = false
  }
  if (VueBuiltIn.indexOf(vmNname) > 0) {   // VueBuiltIn com
    ret = false
  }
  if (vmNname === 'VueComponentInspector') {
    ret = false
  }
  return ret
}

export function isPlainObject (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}
