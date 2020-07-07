import { comLabelLogo } from './imgs'
// previous vue
let preVm = null
// clear DomEventLabel-fn
let clearDomEventLabel = null
const EventLabelCollection = []
let componentsLabelProps = {
    attr:{
       className:'vue-component-inspector',
    },
    style:{
       position:'absolute',
       top:0,
       left:0,
       margin:'4px',
       background:'#a6dfa6',
       cursor:'pointer',
       fontSize:'8px',
    }

}
let componentsLabelImgProps = {
    attr:{
        src:comLabelLogo,
    },
    style:{
       width:'20px',
       float:'left'
    }

}
let eventIconProps = {
    attr:{
        className:'el-icon-caret-left event-icon'
    },
    style:{
        fontSize:'31px',
        position:'absolute',
        left:'-22px',
        top:'-7px',
        color:'#a6dfa2',
    }

}
let domEventLabelProps = {
    attr:{
        innerText:'e',
        className:'event-label',
    },
    style:{
        background:'rgb(255, 255, 255)',
        color:'rgb(166, 223, 162)',
        border:'3px solid rgb(166, 223, 162)',
        display:'inline-block',
        borderRadius:'5px',
        padding:'3px 5px',
        position:'absolute',
        top:'-1px',
        left: "186px",
        cursor:'pointer',
        fontSize:'17px',
        lineHeight:'10px',
        marginLeft:'5px',
        zIndex:'10'
    }

}
// setElementProps
function setElementProps(el,props){
    for (const key in props) {
        if(key === 'attr'){
            for (const attrKey in props[key]) {
                el[attrKey] = props[key][attrKey]
            }
        }
        if(key === 'style'){
            for (const styleKey in props[key]) {
                el.style[styleKey] = props[key][styleKey]
            }
        }
    }
}
// createDomEventLabel
function createDomEventLabel (vm) {
  function setPosition (nodeEventMap) {
    nodeEventMap.map((map, i) => {
      const offsetTop = map.eventNode.offsetTop
      const offsetLeft = map.eventNode.offsetLeft
      const top = offsetTop
      const left = map.eventNode.offsetWidth + offsetLeft
      setElementProps(map.eventLabel,{style:{top:(top+'px'),left: (left + 'px')}})
    })
  }
  if (vm.$options.eventList) {
    const domEvent = vm.$options.eventList.dom
    const nodeEventMap = []
    // add label
    domEvent.map((e, i) => {
      const eventNode = e.el

  let eventIcon = document.createElement('i')
  setElementProps(eventIcon,eventIconProps)
  const span = document.createElement('span')
  setElementProps(span,domEventLabelProps)
  span.appendChild(eventIcon)


  e.eventLabel = span
  nodeEventMap.push({
    eventNode: eventNode,
    eventLabel: span
  })
  EventLabelCollection.push(span)
  // eventlabel add event
  span.addEventListener('click', () => {
    preVm.$options.eventList.dom.map((dom) => {
      if (dom.eventLabel === span) {
          setElementProps(span,{style:{color: '#409EFF',borderColor: '#409EFF'}})
          setElementProps(eventIcon,{style:{color: '#409EFF'}})
          dom.isShow = true
      } else {
          // debugger
          setElementProps(dom.eventLabel,{style:{color: '#a6dfa5',borderColor: '#a6dfa5'}})
          setElementProps(dom.eventLabel.getElementsByTagName('i')[0],{style:{color: '#a6dfa5'}})
          dom.isShow = false
      }
    })
    // updata view
    document.getElementById('event').__vue__.$forceUpdate()
  })
})
// add eventLabel
nodeEventMap.map((map, i) => {
  map.eventNode.parentNode.appendChild(map.eventLabel)
})
// position
setPosition(nodeEventMap)
window.removeEventListener('resize', setPosition(nodeEventMap))
window.addEventListener('resize', setPosition(nodeEventMap))
return EventLabelCollection
} else {
return []
}
}
// createComponentsLabel
export function createComponentsLabel (el, vm, vmNname) {
const div = document.createElement('div')
div.title = `<${vmNname}/>`
setElementProps(div,componentsLabelProps)
// createImg
const img = document.createElement('img')
setElementProps(img,componentsLabelImgProps)
div.appendChild(img)
// setEvent
div.addEventListener('click', (e) => {
e.stopPropagation()
e.preventDefault()
// clear previous style
if (preVm) {
  let el = preVm.$el
  if (preVm.$options.comment) { // comment
     el = el.parentNode
  }
  setElementProps(el,{style:{outline:'1px solid green'}})
}
// set previous vm
preVm = vm
// set curVm
vm.$root.VCIIndex.change(vm)
// set cur style
setElementProps(el,{style:{outline:'3px solid red',outlineOffset:'-3px'}})
// clearDomEventLabel
clearDomEventLabel && clearDomEventLabel()
// create event label
const domEventLabel = createDomEventLabel(vm)
// set clearDomEventLabel-fn
vm.$root.clearDomEventLabel = clearDomEventLabel = function () {
  domEventLabel.map((v) => {
    v.remove()
  })
}
// set global $vm
window.$vm = vm
})
// 把创建后的子元素追加到组件父级元素中
// el.parentNode.appendChild(div);
// 把创建后的子元素追加到组件元素中
// el.appendChild(div);
// positiong ComponentsLabel
function setCreateComponentsLabelPosition (map) {
map.map((map, i) => {
  const offsetTop = map.vmEl.offsetTop
  const offsetLeft = map.vmEl.offsetLeft
  const top = offsetTop
  // let left = map.vmEl.offsetWidth/2 + offsetLeft
  const left = offsetLeft
  setElementProps(map.componentsLabel,{style:{top:(top+'px'),left: (left + 'px')}})
})
}
window.setTimeout(() => {
setCreateComponentsLabelPosition([{
  vmEl: el,
  componentsLabel: div
}])
}, 2000)
window.addEventListener('resize', () => {
setCreateComponentsLabelPosition([{
  vmEl: el,
  componentsLabel: div
}])
})
return div
}

