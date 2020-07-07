import { install } from './install'
import { inBrowser } from './util/dom'
const VCI = {
  install: install,
  version: '__VERSION__'
}
export default VCI
if (inBrowser && window.Vue) {
  window.Vue.use(VCI)
}
