import index from './components/index.vue'
import page from './page/page.vue'
import { isViewCom } from './util/util'
import { NoInspect } from './config'
import { addEventList } from './helper/event'
import { createComponentsLabel } from './helper/label'
export let _Vue
export function install (Vue,options) {
  if (install.installed && _Vue === Vue) return
  install.installed = true
  _Vue = Vue
  // debugger
  let noInspect = options.noInspect||[]
  noInspect.map((v)=>{
    NoInspect.push(v)
  })


  const componentsLabelCollection = []
  // minxin mounted , destroyed
  Vue.mixin({
    mounted () {
      let el = this.$el
      const vmNname = this.$options.name
      if (this && this.$root === this) {
        // rootVm

        // set componentsLabelCollection
        this.$root.componentsLabelCollection = componentsLabelCollection
        this.$root.$options.fileUrl = 'root'
        // set curVm
        this.curVm = null
      }
      if (isViewCom(this)) {
        // remark selet element
        if (el.nodeType === 8) {
          el = el.parentNode
          this.$options.comment = true
        }
        /* const computedStyle = document.defaultView.getComputedStyle(el, null)
        const position = computedStyle.position
        if (position !== 'absolute' && position !== 'relative' && position !== 'fixed') {
          el.style.position = 'relative'
        }*/
        // Process Event
        window.setTimeout(() => {
          addEventList(this)
        })
        // add component label
        const componentsLabel = createComponentsLabel(el, this, vmNname)
        this.componentsLabel = componentsLabel
        componentsLabelCollection.push({ vmEl: el, componentsLabel: componentsLabel })
      }
    },
    destroyed () {
      this.componentsLabel && this.componentsLabel.remove()
    }
  })
  Vue.component('Page', page)
  Vue.component('VueComponentInspector', index)
}
