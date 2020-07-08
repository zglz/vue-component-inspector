/*!
  * vue-component-inspector v1.1.13
  * (c) 2020 zhanggaungliang
  * @license MIT
  */
'use strict';

//
//
//
//
//

var script = {
  name: 'Basic',
  components: {
  },
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    },
    type: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
    }
  },
  watch: {
  },
  mounted () {
  },
  methods: {
    handleClick (node, data) {

    }
  }

};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", [
    _c(
      "svg",
      {
        attrs: {
          "xmlns:svg": "http://www.w3.org/2000/svg",
          xmlns: "http://www.w3.org/2000/svg",
          "xmlns:xlink": "http://www.w3.org/1999/xlink",
          version: "1.0",
          width: "160px",
          height: "20px",
          viewBox: "0 0 128 16",
          "xml:space": "preserve"
        }
      },
      [
        _c("path", {
          attrs: {
            fill: "#daf2d8",
            d:
              "M6.4,4.8A3.2,3.2,0,1,1,3.2,8,3.2,3.2,0,0,1,6.4,4.8Zm12.8,0A3.2,3.2,0,1,1,16,8,3.2,3.2,0,0,1,19.2,4.8ZM32,4.8A3.2,3.2,0,1,1,28.8,8,3.2,3.2,0,0,1,32,4.8Zm12.8,0A3.2,3.2,0,1,1,41.6,8,3.2,3.2,0,0,1,44.8,4.8Zm12.8,0A3.2,3.2,0,1,1,54.4,8,3.2,3.2,0,0,1,57.6,4.8Zm12.8,0A3.2,3.2,0,1,1,67.2,8,3.2,3.2,0,0,1,70.4,4.8Zm12.8,0A3.2,3.2,0,1,1,80,8,3.2,3.2,0,0,1,83.2,4.8ZM96,4.8A3.2,3.2,0,1,1,92.8,8,3.2,3.2,0,0,1,96,4.8Zm12.8,0A3.2,3.2,0,1,1,105.6,8,3.2,3.2,0,0,1,108.8,4.8Zm12.8,0A3.2,3.2,0,1,1,118.4,8,3.2,3.2,0,0,1,121.6,4.8Z"
          }
        }),
        _c(
          "g",
          [
            _c("path", {
              attrs: {
                fill: "#a6dfa3",
                d:
                  "M-42.7,3.84A4.16,4.16,0,0,1-38.54,8a4.16,4.16,0,0,1-4.16,4.16A4.16,4.16,0,0,1-46.86,8,4.16,4.16,0,0,1-42.7,3.84Zm12.8-.64A4.8,4.8,0,0,1-25.1,8a4.8,4.8,0,0,1-4.8,4.8A4.8,4.8,0,0,1-34.7,8,4.8,4.8,0,0,1-29.9,3.2Zm12.8-.64A5.44,5.44,0,0,1-11.66,8a5.44,5.44,0,0,1-5.44,5.44A5.44,5.44,0,0,1-22.54,8,5.44,5.44,0,0,1-17.1,2.56Z"
              }
            }),
            _c("animateTransform", {
              attrs: {
                attributeName: "transform",
                type: "translate",
                values:
                  "23 0;36 0;49 0;62 0;74.5 0;87.5 0;100 0;113 0;125.5 0;138.5 0;151.5 0;164.5 0;178 0",
                calcMode: "discrete",
                dur: "1170ms",
                repeatCount: "indefinite"
              }
            })
          ],
          1
        )
      ]
    )
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-005ab157_0", { source: "\n.basic-container[data-v-005ab157]{\n}\n", map: {"version":3,"sources":["E:\\BaiduNetdiskDownload\\Vue\\vue-component-inspector-1.x\\src\\components\\treeLoading.vue"],"names":[],"mappings":";AA0CA;AAEA","file":"treeLoading.vue","sourcesContent":["<template>\r\n  <div>\r\n    <svg xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.0\" width=\"160px\" height=\"20px\" viewBox=\"0 0 128 16\" xml:space=\"preserve\"><path fill=\"#daf2d8\" d=\"M6.4,4.8A3.2,3.2,0,1,1,3.2,8,3.2,3.2,0,0,1,6.4,4.8Zm12.8,0A3.2,3.2,0,1,1,16,8,3.2,3.2,0,0,1,19.2,4.8ZM32,4.8A3.2,3.2,0,1,1,28.8,8,3.2,3.2,0,0,1,32,4.8Zm12.8,0A3.2,3.2,0,1,1,41.6,8,3.2,3.2,0,0,1,44.8,4.8Zm12.8,0A3.2,3.2,0,1,1,54.4,8,3.2,3.2,0,0,1,57.6,4.8Zm12.8,0A3.2,3.2,0,1,1,67.2,8,3.2,3.2,0,0,1,70.4,4.8Zm12.8,0A3.2,3.2,0,1,1,80,8,3.2,3.2,0,0,1,83.2,4.8ZM96,4.8A3.2,3.2,0,1,1,92.8,8,3.2,3.2,0,0,1,96,4.8Zm12.8,0A3.2,3.2,0,1,1,105.6,8,3.2,3.2,0,0,1,108.8,4.8Zm12.8,0A3.2,3.2,0,1,1,118.4,8,3.2,3.2,0,0,1,121.6,4.8Z\"/><g><path fill=\"#a6dfa3\" d=\"M-42.7,3.84A4.16,4.16,0,0,1-38.54,8a4.16,4.16,0,0,1-4.16,4.16A4.16,4.16,0,0,1-46.86,8,4.16,4.16,0,0,1-42.7,3.84Zm12.8-.64A4.8,4.8,0,0,1-25.1,8a4.8,4.8,0,0,1-4.8,4.8A4.8,4.8,0,0,1-34.7,8,4.8,4.8,0,0,1-29.9,3.2Zm12.8-.64A5.44,5.44,0,0,1-11.66,8a5.44,5.44,0,0,1-5.44,5.44A5.44,5.44,0,0,1-22.54,8,5.44,5.44,0,0,1-17.1,2.56Z\"/><animateTransform attributeName=\"transform\" type=\"translate\" values=\"23 0;36 0;49 0;62 0;74.5 0;87.5 0;100 0;113 0;125.5 0;138.5 0;151.5 0;164.5 0;178 0\" calcMode=\"discrete\" dur=\"1170ms\" repeatCount=\"indefinite\"/></g></svg>\r\n  </div>\r\n</template>\r\n<script>\r\nexport default {\r\n  name: 'Basic',\r\n  components: {\r\n  },\r\n  props: {\r\n    item: {\r\n      type: Object,\r\n      default () {\r\n        return {}\r\n      }\r\n    },\r\n    type: {\r\n      type: String,\r\n      default () {\r\n        return ''\r\n      }\r\n    }\r\n  },\r\n  data () {\r\n    return {\r\n    }\r\n  },\r\n  watch: {\r\n  },\r\n  mounted () {\r\n  },\r\n  methods: {\r\n    handleClick (node, data) {\r\n\r\n    }\r\n  }\r\n\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n  .basic-container{\r\n\r\n  }\r\n</style>\r\n<style>\r\n</style>\r\n\r\n"]}, media: undefined })
,inject("data-v-005ab157_1", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"treeLoading.vue"}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-005ab157";
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

//
var script$1 = {
  name: 'Navigation',
  components: {
      treeLoading: __vue_component__
  },
  props: {
    curVm: {
      type: null,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      treeData: [],
      idArr: [],
      filterText: '',
      showLoading:false
    }
  },
  computed: {

  },
  watch: {
    'curVm': {
      handler (val) {
        this.creatNavTree(val);
      }
    },
    filterText (val) {
      this.$refs.tree.filter(val);
    }
  },
  mounted () {
    this.$root.VCINav = this;
  },
  methods: {
    creatNavTree (vm) {
      this.showLoading = true;
      function parseObj (data) {
        const result = [];
        data.$children.map((vm, i) => {
            const item = {
                id: vm._uid,
                label: vm.$options.name ? vm.$options.name : 'anonymous',
                vm: vm
            };
            if (vm.$children.length > 0) {
                item.children = parseObj(vm);
            }
            result.push(item);
        });
        return result
      }
        window.setTimeout(()=>{
            const treeData = [{
                id: vm._uid,
                label: vm.$options.name,
                vm: vm,
                children: parseObj(vm),
                root: true //
            }];
            this.treeData = treeData;
            this.showLoading = false;
        },1000);

    },
    handleClick (data) {
    },
    toParent () {
      let $parent = this.curVm.$parent;
      if($parent !== $parent.$root){
          while (!$parent.componentsLabel) {
              $parent = $parent.$parent;
          }
          $parent.componentsLabel.click();
      }
    },
    check (data) {
      console.log(data);
      data.vm.componentsLabel.click();
    },
    mouseover (data) {
      const vm = data.vm;
      let el = vm.$el;
      if (el.nodeType === 8) {
          el = el.parentNode;
          vm.$options.comment = true;
      }
      el.style.outline = '3px solid red';
      el.style.outlineOffset='-4px';
    },
    mouseout (data) {
      const vm = data.vm;
      if (this.curVm !== vm) {
        let el = vm.$el;
        if (vm.$options.comment) { // 是注释组件
          el = el.parentNode;
        }
        el.style.outline = '';
      }
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.toUpperCase().indexOf(value.toUpperCase()) !== -1
    }
  }
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "basic-container", attrs: { id: "" } }, [
    _c(
      "div",
      { staticClass: "wraper" },
      [
        _vm.treeData.length > 0
          ? _c("el-input", {
              attrs: { placeholder: "Enter keywords to filter", size: "mini" },
              model: {
                value: _vm.filterText,
                callback: function($$v) {
                  _vm.filterText = $$v;
                },
                expression: "filterText"
              }
            })
          : _vm._e(),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "treeWraper" },
          [
            _vm.showLoading
              ? _c(
                  "div",
                  { staticClass: "loadingWraper" },
                  [_c("treeLoading")],
                  1
                )
              : _vm._e(),
            _vm._v(" "),
            _c("el-tree", {
              ref: "tree",
              staticClass: "tree",
              attrs: {
                data: _vm.treeData,
                "default-expand-all": true,
                "expand-on-click-node": true,
                "highlight-current": true,
                "default-expanded-keys": _vm.idArr,
                "filter-node-method": _vm.filterNode,
                "node-key": "id"
              },
              on: { "node-click": _vm.handleClick },
              scopedSlots: _vm._u([
                {
                  key: "default",
                  fn: function(ref) {
                    var node = ref.node;
                    var data = ref.data;
                    return _c(
                      "span",
                      {
                        staticClass: "custom-tree-node",
                        on: {
                          mouseover: function() {
                            return _vm.mouseover(data)
                          },
                          mouseout: function() {
                            return _vm.mouseout(data)
                          }
                        }
                      },
                      [
                        _c("span", { staticStyle: { color: "#606266" } }, [
                          _vm._v("<"),
                          _c("span", { staticStyle: { color: "#67c23a" } }, [
                            _vm._v(_vm._s(node.label))
                          ]),
                          _vm._v(">"),
                          data.root
                            ? _c(
                                "span",
                                { staticStyle: { color: "#67c23a" } },
                                [_vm._v(" - $vm")]
                              )
                            : _vm._e()
                        ]),
                        _vm._v(" "),
                        data.vm.componentsLabel && !data.root
                          ? _c("i", {
                              staticClass: "el-icon-aim icon-aim",
                              staticStyle: { "border-radius": "10px" },
                              attrs: { title: "inpect" },
                              on: {
                                click: function() {
                                  return _vm.check(data)
                                }
                              }
                            })
                          : _vm._e(),
                        _vm._v(" "),
                        data.root
                          ? _c("i", {
                              staticClass: "el-icon-top-left icon-top-left",
                              attrs: { title: "parent" },
                              on: {
                                click: function() {
                                  return _vm.toParent()
                                }
                              }
                            })
                          : _vm._e()
                      ]
                    )
                  }
                }
              ])
            })
          ],
          1
        )
      ],
      1
    )
  ])
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-4a7726e9_0", { source: "\n.wraper[data-v-4a7726e9]{\n  border: 1px solid;\n  border-radius: 7px;\n  padding: 5px;\n  height: 300px;\n  overflow: hidden;\n  position: relative;\n}\n.treeWraper[data-v-4a7726e9]{\n  height: 230px;\n  overflow: auto;\n  margin-top: 10px;\n}\n.custom-tree-node[data-v-4a7726e9] {\n    flex: 1;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    font-size: 14px;\n    padding-right: 8px;\n}\n.icon-top-left[data-v-4a7726e9]{\n    cursor: pointer;\n    border: 1px solid #000;\n}\n.icon-top-left[data-v-4a7726e9]:hover{\n    border: 1px solid #519eff;\n    color: #ffffff;\n    background: #519eff;\n}\n.icon-aim[data-v-4a7726e9]:hover{\n    border: 1px solid #519eff;\n    color: #ffffff;\n    background: #519eff;\n}\n.loadingWraper[data-v-4a7726e9]{\n  position: absolute;\n  top: 40px;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: white;\n  z-index: 10;\n  text-align: center;\n  line-height: 240px;\n}\n\n", map: {"version":3,"sources":["E:\\BaiduNetdiskDownload\\Vue\\vue-component-inspector-1.x\\src\\components\\navigation.vue"],"names":[],"mappings":";AAqJA;EACA,iBAAA;EACA,kBAAA;EACA,YAAA;EACA,aAAA;EACA,gBAAA;EACA,kBAAA;AACA;AACA;EACA,aAAA;EACA,cAAA;EACA,gBAAA;AACA;AACA;IACA,OAAA;IACA,aAAA;IACA,mBAAA;IACA,8BAAA;IACA,eAAA;IACA,kBAAA;AACA;AACA;IACA,eAAA;IACA,sBAAA;AACA;AACA;IACA,yBAAA;IACA,cAAA;IACA,mBAAA;AACA;AACA;IACA,yBAAA;IACA,cAAA;IACA,mBAAA;AACA;AACA;EACA,kBAAA;EACA,SAAA;EACA,OAAA;EACA,QAAA;EACA,SAAA;EACA,iBAAA;EACA,WAAA;EACA,kBAAA;EACA,kBAAA;AACA","file":"navigation.vue","sourcesContent":["<template>\r\n  <div id=\"\" class=\"basic-container\" style=\"\">\r\n    <div class=\"wraper\">\r\n\r\n      <el-input v-if=\"treeData.length>0\" v-model=\"filterText\" placeholder=\"Enter keywords to filter\" size=\"mini\"/>\r\n      <!--<i v-if=\"treeData.length>0\" class=\"el-icon-top-left icon-top-left\" @click=\"toParent\" style=\"cursor:pointer\"></i>-->\r\n      <!--{{treeData}}-->\r\n      <div class=\"treeWraper\">\r\n        <div v-if=\"showLoading\"  class=\"loadingWraper\">\r\n          <treeLoading></treeLoading>\r\n        </div>\r\n\r\n        <el-tree\r\n          ref=\"tree\"\r\n          :data=\"treeData\"\r\n          :default-expand-all=\"true\"\r\n          :expand-on-click-node=\"true\"\r\n          :highlight-current=\"true\"\r\n          :default-expanded-keys=\"idArr\"\r\n          :filter-node-method=\"filterNode\"\r\n          class=\"tree\"\r\n          node-key=\"id\"\r\n          @node-click=\"handleClick\">\r\n          <span slot-scope=\"{ node, data }\" class=\"custom-tree-node\" @mouseover=\"() => mouseover(data)\" @mouseout=\"() => mouseout(data)\">\r\n            <!--{{data}}-->\r\n            <span style=\"color:#606266\"><<span style=\"color:#67c23a;\">{{ node.label }}</span>><span v-if=\"data.root\" style=\"color:#67c23a;\"> - $vm</span></span>\r\n            <i v-if=\"data.vm.componentsLabel && !data.root\" class=\"el-icon-aim icon-aim\" title=\"inpect\" @click=\"() => check(data)\" style=\"border-radius: 10px;\"/>\r\n            <i v-if=\"data.root\" class=\"el-icon-top-left icon-top-left\" title=\"parent\" @click=\"() => toParent()\"/>\r\n          </span>\r\n        </el-tree>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>\r\n<script>\r\n//import { isViewCom } from './../util/util'\r\nimport treeLoading from './treeLoading.vue'\r\nexport default {\r\n  name: 'Navigation',\r\n  components: {\r\n      treeLoading\r\n  },\r\n  props: {\r\n    curVm: {\r\n      type: null,\r\n      default () {\r\n        return false\r\n      }\r\n    }\r\n  },\r\n  data () {\r\n    return {\r\n      treeData: [],\r\n      idArr: [],\r\n      filterText: '',\r\n      showLoading:false\r\n    }\r\n  },\r\n  computed: {\r\n\r\n  },\r\n  watch: {\r\n    'curVm': {\r\n      handler (val) {\r\n        this.creatNavTree(val)\r\n      }\r\n    },\r\n    filterText (val) {\r\n      this.$refs.tree.filter(val)\r\n    }\r\n  },\r\n  mounted () {\r\n    this.$root.VCINav = this\r\n  },\r\n  methods: {\r\n    creatNavTree (vm) {\r\n      this.showLoading = true\r\n      function parseObj (data) {\r\n        const result = []\r\n        data.$children.map((vm, i) => {\r\n            const item = {\r\n                id: vm._uid,\r\n                label: vm.$options.name ? vm.$options.name : 'anonymous',\r\n                vm: vm\r\n            }\r\n            if (vm.$children.length > 0) {\r\n                item.children = parseObj(vm)\r\n            }\r\n            result.push(item)\r\n        })\r\n        return result\r\n      }\r\n        window.setTimeout(()=>{\r\n            const treeData = [{\r\n                id: vm._uid,\r\n                label: vm.$options.name,\r\n                vm: vm,\r\n                children: parseObj(vm),\r\n                root: true //\r\n            }]\r\n            this.treeData = treeData\r\n            this.showLoading = false\r\n        },1000)\r\n\r\n    },\r\n    handleClick (data) {\r\n    },\r\n    toParent () {\r\n      let $parent = this.curVm.$parent\r\n      if($parent !== $parent.$root){\r\n          while (!$parent.componentsLabel) {\r\n              $parent = $parent.$parent\r\n          }\r\n          $parent.componentsLabel.click()\r\n      }\r\n    },\r\n    check (data) {\r\n      console.log(data)\r\n      data.vm.componentsLabel.click()\r\n    },\r\n    mouseover (data) {\r\n      const vm = data.vm\r\n      let el = vm.$el\r\n      if (el.nodeType === 8) {\r\n          el = el.parentNode\r\n          vm.$options.comment = true\r\n      }\r\n      el.style.outline = '3px solid red';\r\n      el.style.outlineOffset='-4px';\r\n    },\r\n    mouseout (data) {\r\n      const vm = data.vm\r\n      if (this.curVm !== vm) {\r\n        let el = vm.$el\r\n        if (vm.$options.comment) { // 是注释组件\r\n          el = el.parentNode\r\n        }\r\n        el.style.outline = ''\r\n      }\r\n    },\r\n    filterNode (value, data) {\r\n      if (!value) return true\r\n      return data.label.toUpperCase().indexOf(value.toUpperCase()) !== -1\r\n    }\r\n  }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n  .wraper{\r\n    border: 1px solid;\r\n    border-radius: 7px;\r\n    padding: 5px;\r\n    height: 300px;\r\n    overflow: hidden;\r\n    position: relative;\r\n  }\r\n  .treeWraper{\r\n    height: 230px;\r\n    overflow: auto;\r\n    margin-top: 10px;\r\n  }\r\n  .custom-tree-node {\r\n      flex: 1;\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: space-between;\r\n      font-size: 14px;\r\n      padding-right: 8px;\r\n  }\r\n  .icon-top-left{\r\n      cursor: pointer;\r\n      border: 1px solid #000;\r\n  }\r\n  .icon-top-left:hover{\r\n      border: 1px solid #519eff;\r\n      color: #ffffff;\r\n      background: #519eff;\r\n  }\r\n  .icon-aim:hover{\r\n      border: 1px solid #519eff;\r\n      color: #ffffff;\r\n      background: #519eff;\r\n  }\r\n  .loadingWraper{\r\n    position: absolute;\r\n    top: 40px;\r\n    left: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n    background: white;\r\n    z-index: 10;\r\n    text-align: center;\r\n    line-height: 240px;\r\n  }\r\n\r\n</style>\r\n<style>\r\n</style>\r\n\r\n"]}, media: undefined })
,inject("data-v-4a7726e9_1", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"navigation.vue"}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$1 = "data-v-4a7726e9";
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//

var script$2 = {
  name: 'Basic',
  components: {
  },
  props: {
      curVm: {
          type: null,
          default () {
              return false
          }
      }
  },
  data () {
    return {
      componentsView: false,
      url: ''
    }
  },
  watch: {
    'curVm': {
          handler(val) {
            let vm = val;
            let url=vm.$options.name;
            while (vm.$parent && vm.$parent.$options.name) {
                  url = vm.$parent.$options.name + '/' + url;
                  vm = vm.$parent;
            }
            this.url = url;
          }
      }
  },
  mounted () {
    //      debugger
    //      this.curVm.a = this.$root.curVm

  },
  methods: {
    toggle () {
      const index = document.getElementById('index-container');
      if (index.style.right === '0px') {
        index.style.right = '-400px';
      } else {
        index.style.right = '0px';
      }
    },
    handleChange (val) {
    }
  }

};

/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "basic-container" }, [
    _c("p", [_vm._v("组件类型:普通组件")]),
    _vm._v(" "),
    _c("p", [_vm._v("组件路径:" + _vm._s(_vm.url))])
  ])
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  const __vue_inject_styles__$2 = function (inject) {
    if (!inject) return
    inject("data-v-56f4c7f6_0", { source: "\n.basic-container[data-v-56f4c7f6]{\n}\n", map: {"version":3,"sources":["E:\\BaiduNetdiskDownload\\Vue\\vue-component-inspector-1.x\\src\\components\\basic.vue"],"names":[],"mappings":";AA8DA;AAEA","file":"basic.vue","sourcesContent":["<template>\r\n  <div class=\"basic-container\" style=\"\">\r\n    <p>组件类型:普通组件</p>\r\n    <p>组件路径:{{ url }}</p>\r\n\r\n\r\n  </div>\r\n</template>\r\n<script>\r\nexport default {\r\n  name: 'Basic',\r\n  components: {\r\n  },\r\n  props: {\r\n      curVm: {\r\n          type: null,\r\n          default () {\r\n              return false\r\n          }\r\n      }\r\n  },\r\n  data () {\r\n    return {\r\n      componentsView: false,\r\n      url: ''\r\n    }\r\n  },\r\n  watch: {\r\n    'curVm': {\r\n          handler(val) {\r\n            let vm = val\r\n            let url=vm.$options.name\r\n            while (vm.$parent && vm.$parent.$options.name) {\r\n                  url = vm.$parent.$options.name + '/' + url\r\n                  vm = vm.$parent\r\n            }\r\n            this.url = url\r\n          }\r\n      }\r\n  },\r\n  mounted () {\r\n    //      debugger\r\n    //      this.curVm.a = this.$root.curVm\r\n\r\n  },\r\n  methods: {\r\n    toggle () {\r\n      const index = document.getElementById('index-container')\r\n      if (index.style.right === '0px') {\r\n        index.style.right = '-400px'\r\n      } else {\r\n        index.style.right = '0px'\r\n      }\r\n    },\r\n    handleChange (val) {\r\n    }\r\n  }\r\n\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n  .basic-container{\r\n\r\n  }\r\n</style>\r\n<style>\r\n</style>\r\n\r\n"]}, media: undefined })
,inject("data-v-56f4c7f6_1", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"basic.vue"}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$2 = "data-v-56f4c7f6";
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$2 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$3 = {
  name: 'Event',
  components: {
  },
  props: {
    curVm: {
      type: null,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      componentsView: false,
      url: ''
    }
  },
  watch: {
  },
  mounted () {
    //      debugger
  },
  methods: {
    viewCode (eventItem, type) {
      if (type === 'dom') {
        console.log(eventItem.fn);
      } else {
        if (eventItem.name) {
          // find fn
          let $parent = this.curVm.$parent;
          while (!$parent[eventItem.name]) {
            $parent = $parent.$parent;
          }
          console.log($parent[eventItem.name]);
        } else {
          console.log(eventItem.fn);
        }
      }
    },
    handleChange (val) {
    }
  }

};

/* script */
const __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "event-container" }, [
    _c("p", { staticClass: "type-title" }, [_vm._v("DOM-Event")]),
    _vm._v(" "),
    _c("br"),
    _vm._v(" "),
    _vm.curVm &&
    _vm.curVm.$options.eventList &&
    _vm.curVm.$options.eventList.dom &&
    _vm.curVm.$options.eventList.dom.length > 0
      ? _c(
          "div",
          _vm._l(_vm.curVm && _vm.curVm.$options.eventList.dom, function(
            item,
            index
          ) {
            return _c("span", [
              item.isShow
                ? _c(
                    "div",
                    { staticStyle: { "padding-left": "20px" } },
                    _vm._l(item.event, function(eventItem, index) {
                      return _c(
                        "span",
                        {
                          staticStyle: {
                            display: "block",
                            "margin-bottom": "5px"
                          }
                        },
                        [
                          _vm._v(
                            "\n          " +
                              _vm._s(eventItem.type) +
                              "\n          - "
                          ),
                          _c(
                            "el-tag",
                            {
                              staticStyle: {
                                height: "25px",
                                "line-height": "25px"
                              },
                              attrs: { type: "success" }
                            },
                            [_vm._v(_vm._s(eventItem.name || "inline-event"))]
                          ),
                          _vm._v(" "),
                          _c("span", {
                            staticClass: "el-icon-view codeView",
                            on: {
                              click: function($event) {
                                return _vm.viewCode(eventItem, "dom")
                              }
                            }
                          }),
                          _c("br")
                        ],
                        1
                      )
                    }),
                    0
                  )
                : _vm._e()
            ])
          }),
          0
        )
      : _vm._e(),
    _vm._v(" "),
    _c("p", { staticClass: "type-title" }, [_vm._v("Component-Event")]),
    _vm._v(" "),
    _c("br"),
    _vm._v(" "),
    _vm.curVm &&
    _vm.curVm.$options.eventList &&
    _vm.curVm.$options.eventList.dom &&
    _vm.curVm.$options.eventList.com.length > 0
      ? _c(
          "div",
          { staticStyle: { "padding-left": "20px" } },
          _vm._l(_vm.curVm && _vm.curVm.$options.eventList.com, function(
            event,
            index
          ) {
            return _c(
              "span",
              { staticStyle: { display: "block", "margin-bottom": "5px" } },
              [
                _c(
                  "el-tag",
                  {
                    staticStyle: { height: "25px", "line-height": "25px" },
                    attrs: { type: "success" }
                  },
                  [_vm._v(_vm._s(event.name ? event.name : "anonymous"))]
                ),
                _vm._v(" "),
                _c("span", {
                  staticClass: "el-icon-view codeView",
                  on: {
                    click: function($event) {
                      return _vm.viewCode(event, "com")
                    }
                  }
                }),
                _c("br")
              ],
              1
            )
          }),
          0
        )
      : _vm._e()
  ])
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  const __vue_inject_styles__$3 = function (inject) {
    if (!inject) return
    inject("data-v-a7660dd2_0", { source: "\n.event-container[data-v-a7660dd2]{\n  padding-left: 10px;\n}\n.dom-type[data-v-a7660dd2]{\n  background: rgb(255, 253, 52);\n  border: 1px solid rgb(128, 136, 125);\n  display: inline-block;\n  border-radius: 5px;\n  padding: 1px 5px;\n}\n.codeView[data-v-a7660dd2]{\n  cursor:pointer;\n  vertical-align: -3px;\n  margin-left: 6px;\n  font-size: 20px;\n}\n.codeView[data-v-a7660dd2]:hover{\n  color: #519eff;\n}\n.type-title[data-v-a7660dd2]{\n  margin-bottom: 10px;\n  margin-top: 10px;\n  color: #a6dfa3;\n  font-size: 15px;\n  /*background: #a6dfa3;*/\n  padding: 0px 5px;\n  border-radius: 4px;\n  padding-bottom: 2px;\n  display:inline-block;\n  font-weight: bolder;\n}\n\n", map: {"version":3,"sources":["E:\\BaiduNetdiskDownload\\Vue\\vue-component-inspector-1.x\\src\\components\\event.vue"],"names":[],"mappings":";AAkFA;EACA,kBAAA;AACA;AACA;EACA,6BAAA;EACA,oCAAA;EACA,qBAAA;EACA,kBAAA;EACA,gBAAA;AACA;AACA;EACA,cAAA;EACA,oBAAA;EACA,gBAAA;EACA,eAAA;AACA;AACA;EACA,cAAA;AACA;AACA;EACA,mBAAA;EACA,gBAAA;EACA,cAAA;EACA,eAAA;EACA,uBAAA;EACA,gBAAA;EACA,kBAAA;EACA,mBAAA;EACA,oBAAA;EACA,mBAAA;AACA","file":"event.vue","sourcesContent":["<template>\r\n  <div class=\"event-container\" style=\"\">\r\n    <!--{{curVm&&curVm.$options.eventList}}-->\r\n    <!--DOM-Event-->\r\n    <p class=\"type-title\">DOM-Event</p>\r\n    <br>\r\n    <div v-if=\"curVm&&curVm.$options.eventList&&curVm.$options.eventList.dom&&curVm.$options.eventList.dom.length>0\">\r\n      <span v-for=\"(item , index) in curVm&&curVm.$options.eventList.dom\">\r\n        <div v-if=\"item.isShow\" style=\"padding-left: 20px;\">\r\n          <!--<span class=\"dom-type\">{{item.name}}</span><br>-->\r\n          <span v-for=\"( eventItem , index) in item.event\" style=\"display:block;margin-bottom:5px\">\r\n            {{ eventItem.type }}\r\n            - <el-tag  type=\"success\" style=\"height: 25px;line-height: 25px;\">{{ eventItem.name||'inline-event' }}</el-tag>\r\n            <span class=\"el-icon-view codeView\" style=\"\" @click=\"viewCode(eventItem,'dom')\"/><br>\r\n          </span>\r\n\r\n        </div>\r\n      </span>\r\n    </div>\r\n    <!--Component-Event-->\r\n    <p class=\"type-title\">Component-Event</p>\r\n    <br>\r\n    <div v-if=\"curVm&&curVm.$options.eventList&&curVm.$options.eventList.dom&&curVm.$options.eventList.com.length>0\" style=\"padding-left: 20px;\">\r\n      <span v-for=\"(event , index) in curVm&&curVm.$options.eventList.com\" style=\"display:block;margin-bottom:5px\">\r\n        <!--<span class=\"dom-type\">{{item.name}}</span><br>-->\r\n        <el-tag type=\"success\"  style=\"height: 25px;line-height: 25px;\" >{{ event.name?event.name:'anonymous' }}</el-tag>\r\n        <span class=\"el-icon-view codeView\" style=\"\" @click=\"viewCode(event,'com')\"/><br>\r\n\r\n      </span>\r\n    </div>\r\n\r\n  </div>\r\n</template>\r\n<script>\r\nexport default {\r\n  name: 'Event',\r\n  components: {\r\n  },\r\n  props: {\r\n    curVm: {\r\n      type: null,\r\n      default () {\r\n        return false\r\n      }\r\n    }\r\n  },\r\n  data () {\r\n    return {\r\n      componentsView: false,\r\n      url: ''\r\n    }\r\n  },\r\n  watch: {\r\n  },\r\n  mounted () {\r\n    //      debugger\r\n  },\r\n  methods: {\r\n    viewCode (eventItem, type) {\r\n      if (type === 'dom') {\r\n        console.log(eventItem.fn)\r\n      } else {\r\n        if (eventItem.name) {\r\n          // find fn\r\n          let $parent = this.curVm.$parent\r\n          while (!$parent[eventItem.name]) {\r\n            $parent = $parent.$parent\r\n          }\r\n          console.log($parent[eventItem.name])\r\n        } else {\r\n          console.log(eventItem.fn)\r\n        }\r\n      }\r\n    },\r\n    handleChange (val) {\r\n    }\r\n  }\r\n\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n  .event-container{\r\n    padding-left: 10px;\r\n  }\r\n  .dom-type{\r\n    background: rgb(255, 253, 52);\r\n    border: 1px solid rgb(128, 136, 125);\r\n    display: inline-block;\r\n    border-radius: 5px;\r\n    padding: 1px 5px;\r\n  }\r\n  .codeView{\r\n    cursor:pointer;\r\n    vertical-align: -3px;\r\n    margin-left: 6px;\r\n    font-size: 20px;\r\n  }\r\n  .codeView:hover{\r\n    color: #519eff;\r\n  }\r\n  .type-title{\r\n    margin-bottom: 10px;\r\n    margin-top: 10px;\r\n    color: #a6dfa3;\r\n    font-size: 15px;\r\n    /*background: #a6dfa3;*/\r\n    padding: 0px 5px;\r\n    border-radius: 4px;\r\n    padding-bottom: 2px;\r\n    display:inline-block;\r\n    font-weight: bolder;\r\n  }\r\n\r\n</style>\r\n<style>\r\n</style>\r\n\r\n"]}, media: undefined })
,inject("data-v-a7660dd2_1", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"event.vue"}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$3 = "data-v-a7660dd2";
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$3 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    createInjector,
    undefined,
    undefined
  );

const NoInspect = [];

const VueBuiltIn = ['KeepAlive', 'transition', 'TransitionGroup', 'Basic', 'Navigation', 'Data','Event'];

// 是否是可视化组件
function isViewCom (vm) {
  // debugger
  const vmNname = vm.$options.name;
  let ret = true;
  if (!vmNname) {
    // 是ElementUI组件&&不显示ElementUI
    ret = false;
  }
  if (NoInspect.indexOf(vmNname) > 0) {
    // 是ElementUI组件&&不显示ElementUI
    ret = false;
  }
  if (VueBuiltIn.indexOf(vmNname) > 0) {
    // 内置组件
    ret = false;
  }
  if (vmNname === 'VueComponentInspector') {
    // 内置组件
    ret = false;
  }
  return ret
}

// 是否是可视化组件
function isPlainObject (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}
/*
isPlainObject (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
},
*/

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$4 = {
  name: 'Basic',
  components: {
  },
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    },
    type: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
    }
  },
  watch: {
  },
  mounted () {
  },
  methods: {
    handleClick (node, data) {
      //          console.log(node, data)
    }
  }

};

/* script */
const __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("span", [
    _c("span", { staticStyle: { "margin-right": "10px" } }, [
      _vm._v(_vm._s(_vm.item.key) + " :")
    ]),
    _vm._v(" "),
    _vm.item.type === "Object" || _vm.item.type === "Array"
      ? _c("span", [
          _c(
            "span",
            {
              staticStyle: { "font-weight": "bolder" },
              style: {
                color: _vm.item.type === "Object" ? "#519eff" : "#f56c6c"
              }
            },
            [
              _vm._v(_vm._s(_vm.item.type) + " "),
              _vm.item.type === "Array"
                ? _c("span", [
                    _vm._v(
                      "(" +
                        _vm._s(
                          _vm.item.children ? _vm.item.children.length : 0
                        ) +
                        ")"
                    )
                  ])
                : _vm._e()
            ]
          )
        ])
      : _vm.item.type === "boolean"
      ? _c(
          "span",
          [
            _vm.type === "dataTree"
              ? _c("el-checkbox", {
                  model: {
                    value: _vm.item.value,
                    callback: function($$v) {
                      _vm.$set(_vm.item, "value", $$v);
                    },
                    expression: "item.value"
                  }
                })
              : _c("span", [_vm._v(_vm._s(_vm.item.value))])
          ],
          1
        )
      : _vm.item.type === "number"
      ? _c(
          "span",
          [
            _vm.type === "dataTree"
              ? _c("el-input-number", {
                  staticStyle: {
                    transform: "scale(0.7)",
                    "transform-origin": "0 50%"
                  },
                  attrs: { size: "mini" },
                  model: {
                    value: _vm.item.value,
                    callback: function($$v) {
                      _vm.$set(_vm.item, "value", $$v);
                    },
                    expression: "item.value"
                  }
                })
              : _c("span", [_vm._v(_vm._s(_vm.item.value))])
          ],
          1
        )
      : _c("span", [
          _vm.type === "dataTree"
            ? _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.item.value,
                    expression: "item.value"
                  }
                ],
                attrs: { type: "text" },
                domProps: { value: _vm.item.value },
                on: {
                  click: function($event) {
                    return _vm.handleClick(_vm.item)
                  },
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(_vm.item, "value", $event.target.value);
                  }
                }
              })
            : _c("span", [_vm._v(_vm._s(_vm.item.value))])
        ])
  ])
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  const __vue_inject_styles__$4 = function (inject) {
    if (!inject) return
    inject("data-v-019e1a24_0", { source: "\n.basic-container[data-v-019e1a24]{\n}\n", map: {"version":3,"sources":["E:\\BaiduNetdiskDownload\\Vue\\vue-component-inspector-1.x\\src\\components\\dataItem.vue"],"names":[],"mappings":";AAiEA;AAEA","file":"dataItem.vue","sourcesContent":["<template>\r\n  <span>\r\n    <!--{{item}}-->\r\n    <span style=\"margin-right:10px;\">{{ item.key }} :</span>\r\n    <!--Object||Array-->\r\n    <span v-if=\"item.type === 'Object' || item.type === 'Array'\">\r\n      <span style=\"font-weight: bolder;\" :style=\"{color:item.type === 'Object'?'#519eff':'#f56c6c'}\">{{ item.type }} <span v-if=\"item.type === 'Array'\">({{ item.children?item.children.length:0 }})</span></span>\r\n    </span>\r\n    <!--boolean-->\r\n    <span v-else-if=\" item.type === 'boolean'\">\r\n      <el-checkbox v-if=\"type === 'dataTree'\" v-model=\"item.value\"/>\r\n      <span v-else>{{ item.value }}</span>\r\n      <!--<input v-model=\"item.value\" type=\"text\" @click=\"handleClick(item)\">-->\r\n    </span>\r\n    <!--number-->\r\n    <span v-else-if=\" item.type === 'number'\">\r\n      <el-input-number size=\"mini\" style=\"transform: scale(0.7);transform-origin: 0 50%;\" v-if=\"type === 'dataTree'\" v-model=\"item.value\"></el-input-number>\r\n      <!--<input v-if=\"type === 'dataTree'\" v-model=\"item.value\" type=\"number\" @click=\"handleClick( item)\">-->\r\n      <span v-else>{{ item.value }}</span>\r\n    </span>\r\n    <!--string-->\r\n    <span v-else>\r\n      <!--<el-input size=\"mini\" style=\"transform: scale(0.7);transform-origin: 0 50%;\" v-if=\"type === 'dataTree'\" v-model=\"item.value\"></el-input>-->\r\n      <input v-if=\"type === 'dataTree'\" v-model=\"item.value\" type=\"text\" @click=\"handleClick(item)\">\r\n      <span v-else>{{ item.value }}</span>\r\n    </span>\r\n  </span>\r\n</template>\r\n<script>\r\nexport default {\r\n  name: 'Basic',\r\n  components: {\r\n  },\r\n  props: {\r\n    item: {\r\n      type: Object,\r\n      default () {\r\n        return {}\r\n      }\r\n    },\r\n    type: {\r\n      type: String,\r\n      default () {\r\n        return ''\r\n      }\r\n    }\r\n  },\r\n  data () {\r\n    return {\r\n    }\r\n  },\r\n  watch: {\r\n  },\r\n  mounted () {\r\n  },\r\n  methods: {\r\n    handleClick (node, data) {\r\n      //          console.log(node, data)\r\n    }\r\n  }\r\n\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n  .basic-container{\r\n\r\n  }\r\n</style>\r\n<style>\r\n</style>\r\n\r\n"]}, media: undefined })
,inject("data-v-019e1a24_1", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"dataItem.vue"}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$4 = "data-v-019e1a24";
  /* module identifier */
  const __vue_module_identifier__$4 = undefined;
  /* functional template */
  const __vue_is_functional_template__$4 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$4 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    false,
    createInjector,
    undefined,
    undefined
  );

//
const checkTimer = null;
var script$5 = {
  name: 'Data',
  components: {
    dataItem: __vue_component__$4
  },
  props: {
    curVm: {
      type: null,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      // datatree
      treeData: [],
      filterText: '',
      treeIdArr: [],     // 展开id
      propsTreeData: [],
      propsTreeIdArr: [],     // 展开id
      viewType: true,    // 视图类型
      dataSource: null,  // data源格式
      noReactiveData: []   // 是否存在非响应式字段
    }
  },
  watch: {
    'curVm': {
      handler (val) {
        if (val) {
          // create TreeData
          this.createTreeData(val, false);
          // create PropsTreeData
          this.createPropsTreeData(val);
          /*                  checkTimer = window.setInterval(()=>{
                      this.mdJ21dJ(val._data,true)
                  },10000)*/
        }
      }
    },
    'curVm._data': {
      handler (val) {
        if (val) {
          // create TreeData
          this.createTreeData(this.curVm, false);
          // create PropsTreeData
          this.createPropsTreeData(this.curVm);
        }
      },
      deep: true
    },
    filterText (val) {
      this.$refs.tree.filter(val);
    }
  },
  mounted () {
  },
  methods: {
    expandTree (node, data, idArr) {
      idArr.push(node.id);
    },
    collapseTree (node, data, idArr) {
      const nodeId = node.id;
      const shouldCollapseIdArr = [];
      this.getChildrenId(node, shouldCollapseIdArr);
      shouldCollapseIdArr.push(nodeId);
      shouldCollapseIdArr.map((v, i) => {
        const index = idArr.indexOf(v);
        if (index !== -1) {
          idArr.splice(index, 1);
        }
      });
      //this.createTreeData(this.curVm, false)
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.toUpperCase().indexOf(value.toUpperCase()) !== -1
    },
    // 1Djson2tree
    odJ2treeJ (a, idStr, pidStr, chindrenStr) {
      var r = [], hash = {}, id = idStr, pid = pidStr, children = chindrenStr, i = 0, j = 0, len = a.length;
      for (; i < len; i++) {
        hash[a[i][id]] = a[i];
      }
      for (; j < len; j++) {
        var aVal = a[j], hashVP = hash[aVal[pid]];
        if (hashVP) {
          !hashVP[children] && (hashVP[children] = []);
          hashVP[children].push(aVal);
        } else {
          r.push(aVal);
        }
      }
      return r
    },
    // MDjson21Djson
    mdJ21dJ (data, check) {
      const arr = [];
      let id = 0;
      function parseObj (data, pid) {
        for (const key in data) {
          if (!data.hasOwnProperty(key)) { continue }
          const field = data[key];
          const property = Object.getOwnPropertyDescriptor(data, key);
          if (!Array.isArray(data) && (!property.get || (property.get.name !== 'reactiveGetter')) && check) {
            this.noReactiveData.push(data[key]);
          }
          const fieldWithproperty = {
            id: ++id,   // id
            pid: pid,   // fid
            key: key,
            value: field
          };
          Object.defineProperty(fieldWithproperty, 'value', property);
          if (isPlainObject(field) || Array.isArray(field)) {
            const fieldType = isPlainObject(field) ? 'Object' : 'Array';
            fieldWithproperty.label = fieldWithproperty.type = fieldType;
            parseObj.call(this, field, id);
          } else {
            fieldWithproperty.label = fieldWithproperty.type = typeof field;
          }
          arr.push(fieldWithproperty);
        }
      }
      parseObj.call(this, data, 0);
      if (this.noReactiveData.length > 0) {
        clearInterval(checkTimer);
      }
      return arr
    },
    viewDataSource () {
      //        this.viewType = !this.viewType
      if (this.curVm) {
        this.$emit('showData', JSON.stringify(this.curVm._data, null, 5), true);
      }
    },
    createTreeData (vm, isCheck) {
      if (!isCheck) {
        // 非数据检测
        this.treeData = [{
          id: 0,
          label: 'data',
          value: 'data',
          root: true,
          children: this.odJ2treeJ(this.mdJ21dJ(vm._data, false), 'id', 'pid', 'children')
        }];
      }
      this.$emit('showData', JSON.stringify(this.curVm._data, null, 5), false);
    },
    createPropsTreeData (vm) {
      this.propsTreeData = [{
        id: 0,
        label: 'prpos',
        value: 'prpos',
        root: true,
        children: this.odJ2treeJ(this.mdJ21dJ(vm.$props, false), 'id', 'pid', 'children')
      }];
    },
    getChildrenId (node, shouldCollapseIdArr) {
      node.children.map((node_v, i) => {
        shouldCollapseIdArr.push(node_v.id);
        if (node_v.children && node_v.children.length > 0) {
          this.getChildrenId(node_v, shouldCollapseIdArr);
        }
      });
    }

  }

};

/* script */
const __vue_script__$5 = script$5;

/* template */
var __vue_render__$5 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "data-container" },
    [
      _c(
        "div",
        { staticClass: "treeWraper" },
        [
           _vm._e(),
          _vm._v(" "),
          _c("el-tree", {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.viewType,
                expression: "viewType"
              }
            ],
            ref: "tree",
            staticClass: "tree",
            attrs: {
              data: _vm.treeData,
              "expand-on-click-node": true,
              "highlight-current": true,
              "default-expanded-keys": _vm.treeIdArr,
              "node-key": "id",
              "filter-node-method": _vm.filterNode
            },
            on: {
              "node-expand": function(node, data) {
                _vm.expandTree(node, data, _vm.treeIdArr);
              },
              "node-collapse": function(node, data) {
                _vm.collapseTree(node, data, _vm.treeIdArr);
              }
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(ref) {
                  var node = ref.node;
                  var data = ref.data;
                  return _c("span", { staticClass: "custom-tree-node" }, [
                    data.root === true
                      ? _c("span", { staticClass: "tree-root" }, [
                          _vm._v("$Data")
                        ])
                      : _c(
                          "span",
                          [
                            _c("dataItem", {
                              attrs: { item: data, type: "dataTree" }
                            })
                          ],
                          1
                        )
                  ])
                }
              }
            ])
          }),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: !_vm.viewType,
                  expression: "!viewType"
                }
              ]
            },
            [_c("pre", [_vm._v(_vm._s(_vm.dataSource))])]
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-tree",
        {
          ref: "tree",
          staticClass: "tree",
          attrs: {
            data: _vm.propsTreeData,
            "expand-on-click-node": true,
            "highlight-current": true,
            "default-expanded-keys": _vm.propsTreeIdArr,
            "node-key": "id",
            "filter-node-method": _vm.filterNode
          },
          on: {
            "node-expand": function(node, data) {
              _vm.expandTree(node, data, _vm.propsTreeIdArr);
            },
            "node-collapse": function(node, data) {
              _vm.collapseTree(node, data, _vm.propsTreeIdArr);
            }
          },
          scopedSlots: _vm._u([
            {
              key: "default",
              fn: function(ref) {
                var node = ref.node;
                var data = ref.data;
                return _c("span", { staticClass: "custom-tree-node" }, [
                  data.root === true
                    ? _c("span", { staticClass: "tree-root" }, [
                        _vm._v("$Props")
                      ])
                    : _c(
                        "span",
                        [
                          _c("dataItem", {
                            attrs: { item: data, type: "propsTree" }
                          })
                        ],
                        1
                      )
                ])
              }
            }
          ])
        },
        [_vm._v(">\n              ")]
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;

  /* style */
  const __vue_inject_styles__$5 = function (inject) {
    if (!inject) return
    inject("data-v-0e695428_0", { source: "\n.basic-container[data-v-0e695428]{\n}\n.view-source-btn[data-v-0e695428]{\n    color: #519eff;\n    font-weight: 500;\n    cursor: pointer;\n}\n.view-source-btn[data-v-0e695428]:hover{\n    color:#173dff;\n    font-weight: 500;\n    cursor: pointer;\n}\n.tree-root[data-v-0e695428]{\n    color: #67c23a;\n    font-size: 16px;\n}\n\n\n", map: {"version":3,"sources":["E:\\BaiduNetdiskDownload\\Vue\\vue-component-inspector-1.x\\src\\components\\data.vue"],"names":[],"mappings":";AA4OA;AAEA;AACA;IACA,cAAA;IACA,gBAAA;IACA,eAAA;AACA;AACA;IACA,aAAA;IACA,gBAAA;IACA,eAAA;AACA;AACA;IACA,cAAA;IACA,eAAA;AACA","file":"data.vue","sourcesContent":["<template>\r\n  <div class=\"data-container\" style=\"\">\r\n    <div class=\"treeWraper\">\r\n\r\n        <!--{{curVm&&curVm._data}}-->\r\n        <div v-if=\"0\">\r\n            noReactiveData\r\n            {{noReactiveData}}\r\n        </div>\r\n        <!--<button @click=\"createTreeData(curVm,true)\">Check</button>-->\r\n        <!--<span @click=\"viewDataSource\" class=\"view-source-btn\">viewDataSource</span>-->\r\n        <!--<el-input  v-if=\"treeData.length>0\" placeholder=\"Enter keywords to filter\" v-model=\"filterText\" size=\"mini\"></el-input>-->\r\n\r\n        <!--{{dataTree}}-->\r\n        <el-tree\r\n              v-show=\"viewType\"\r\n              ref=\"tree\"\r\n              :data=\"treeData\"\r\n              :expand-on-click-node=\"true\"\r\n              :highlight-current=\"true\"\r\n              :default-expanded-keys=\"treeIdArr\"\r\n              class=\"tree\"\r\n              node-key=\"id\"\r\n              :filter-node-method=\"filterNode\"\r\n              @node-expand=\"(node, data)=>{expandTree(node, data,treeIdArr)}\"\r\n              @node-collapse=\"(node, data)=>{collapseTree(node, data,treeIdArr)}\">\r\n                <span class=\"custom-tree-node\" slot-scope=\"{ node, data }\">\r\n                        <span v-if=\"data.root === true\" class=\"tree-root\">$Data</span>\r\n                        <span v-else><dataItem :item=\"data\" type=\"dataTree\"></dataItem></span>\r\n                 </span>\r\n        </el-tree>\r\n        <div v-show=\"!viewType\">\r\n            <pre>{{dataSource}}</pre>\r\n        </div>\r\n    </div>\r\n\r\n      <!--propstree-->\r\n      <el-tree\r\n              ref=\"tree\"\r\n              :data=\"propsTreeData\"\r\n              :expand-on-click-node=\"true\"\r\n              :highlight-current=\"true\"\r\n              :default-expanded-keys=\"propsTreeIdArr\"\r\n              class=\"tree\"\r\n              node-key=\"id\"\r\n              :filter-node-method=\"filterNode\"\r\n              @node-expand=\"(node, data)=>{expandTree(node, data,propsTreeIdArr)}\"\r\n              @node-collapse=\"(node, data)=>{collapseTree(node, data,propsTreeIdArr)}\">>\r\n                <span class=\"custom-tree-node\" slot-scope=\"{ node, data }\">\r\n                       <span v-if=\"data.root === true\" class=\"tree-root\">$Props</span>\r\n                       <span v-else><dataItem :item=\"data\" type=\"propsTree\"></dataItem></span>\r\n                 </span>\r\n      </el-tree>\r\n\r\n  </div>\r\n</template>\r\n<script>\r\n// import _ from 'lodash'\r\nimport { isPlainObject } from './../util/util'\r\nimport dataItem from './dataItem.vue'\r\nconst checkTimer = null\r\nexport default {\r\n  name: 'Data',\r\n  components: {\r\n    dataItem\r\n  },\r\n  props: {\r\n    curVm: {\r\n      type: null,\r\n      default () {\r\n        return false\r\n      }\r\n    }\r\n  },\r\n  data () {\r\n    return {\r\n      // datatree\r\n      treeData: [],\r\n      filterText: '',\r\n      treeIdArr: [],     // 展开id\r\n      propsTreeData: [],\r\n      propsTreeIdArr: [],     // 展开id\r\n      viewType: true,    // 视图类型\r\n      dataSource: null,  // data源格式\r\n      noReactiveData: []   // 是否存在非响应式字段\r\n    }\r\n  },\r\n  watch: {\r\n    'curVm': {\r\n      handler (val) {\r\n        if (val) {\r\n          // create TreeData\r\n          this.createTreeData(val, false)\r\n          // create PropsTreeData\r\n          this.createPropsTreeData(val)\r\n          // check noReactiveData\r\n            checkTimer && clearInterval(checkTimer)\r\n          /*                  checkTimer = window.setInterval(()=>{\r\n                      this.mdJ21dJ(val._data,true)\r\n                  },10000)*/\r\n        }\r\n      }\r\n    },\r\n    'curVm._data': {\r\n      handler (val) {\r\n        if (val) {\r\n          // create TreeData\r\n          this.createTreeData(this.curVm, false)\r\n          // create PropsTreeData\r\n          this.createPropsTreeData(this.curVm)\r\n        }\r\n      },\r\n      deep: true\r\n    },\r\n    filterText (val) {\r\n      this.$refs.tree.filter(val)\r\n    }\r\n  },\r\n  mounted () {\r\n  },\r\n  methods: {\r\n    expandTree (node, data, idArr) {\r\n      idArr.push(node.id)\r\n    },\r\n    collapseTree (node, data, idArr) {\r\n      const nodeId = node.id\r\n      const shouldCollapseIdArr = []\r\n      this.getChildrenId(node, shouldCollapseIdArr)\r\n      shouldCollapseIdArr.push(nodeId)\r\n      shouldCollapseIdArr.map((v, i) => {\r\n        const index = idArr.indexOf(v)\r\n        if (index !== -1) {\r\n          idArr.splice(index, 1)\r\n        }\r\n      })\r\n      //this.createTreeData(this.curVm, false)\r\n    },\r\n    filterNode (value, data) {\r\n      if (!value) return true\r\n      return data.label.toUpperCase().indexOf(value.toUpperCase()) !== -1\r\n    },\r\n    // 1Djson2tree\r\n    odJ2treeJ (a, idStr, pidStr, chindrenStr) {\r\n      var r = [], hash = {}, id = idStr, pid = pidStr, children = chindrenStr, i = 0, j = 0, len = a.length\r\n      for (; i < len; i++) {\r\n        hash[a[i][id]] = a[i]\r\n      }\r\n      for (; j < len; j++) {\r\n        var aVal = a[j], hashVP = hash[aVal[pid]]\r\n        if (hashVP) {\r\n          !hashVP[children] && (hashVP[children] = [])\r\n          hashVP[children].push(aVal)\r\n        } else {\r\n          r.push(aVal)\r\n        }\r\n      }\r\n      return r\r\n    },\r\n    // MDjson21Djson\r\n    mdJ21dJ (data, check) {\r\n      const arr = []\r\n      let id = 0\r\n      function parseObj (data, pid) {\r\n        for (const key in data) {\r\n          if (!data.hasOwnProperty(key)) { continue }\r\n          const field = data[key]\r\n          const property = Object.getOwnPropertyDescriptor(data, key)\r\n          if (!Array.isArray(data) && (!property.get || (property.get.name !== 'reactiveGetter')) && check) {\r\n            this.noReactiveData.push(data[key])\r\n          }\r\n          const fieldWithproperty = {\r\n            id: ++id,   // id\r\n            pid: pid,   // fid\r\n            key: key,\r\n            value: field\r\n          }\r\n          Object.defineProperty(fieldWithproperty, 'value', property)\r\n          if (isPlainObject(field) || Array.isArray(field)) {\r\n            const fieldType = isPlainObject(field) ? 'Object' : 'Array'\r\n            fieldWithproperty.label = fieldWithproperty.type = fieldType\r\n            parseObj.call(this, field, id)\r\n          } else {\r\n            fieldWithproperty.label = fieldWithproperty.type = typeof field\r\n          }\r\n          arr.push(fieldWithproperty)\r\n        }\r\n      }\r\n      parseObj.call(this, data, 0)\r\n      if (this.noReactiveData.length > 0) {\r\n        clearInterval(checkTimer)\r\n      }\r\n      return arr\r\n    },\r\n    viewDataSource () {\r\n      //        this.viewType = !this.viewType\r\n      if (this.curVm) {\r\n        this.$emit('showData', JSON.stringify(this.curVm._data, null, 5), true)\r\n      }\r\n    },\r\n    createTreeData (vm, isCheck) {\r\n      if (!isCheck) {\r\n        // 非数据检测\r\n        this.treeData = [{\r\n          id: 0,\r\n          label: 'data',\r\n          value: 'data',\r\n          root: true,\r\n          children: this.odJ2treeJ(this.mdJ21dJ(vm._data, false), 'id', 'pid', 'children')\r\n        }]\r\n      }\r\n      this.$emit('showData', JSON.stringify(this.curVm._data, null, 5), false)\r\n    },\r\n    createPropsTreeData (vm) {\r\n      this.propsTreeData = [{\r\n        id: 0,\r\n        label: 'prpos',\r\n        value: 'prpos',\r\n        root: true,\r\n        children: this.odJ2treeJ(this.mdJ21dJ(vm.$props, false), 'id', 'pid', 'children')\r\n      }]\r\n    },\r\n    getChildrenId (node, shouldCollapseIdArr) {\r\n      node.children.map((node_v, i) => {\r\n        shouldCollapseIdArr.push(node_v.id)\r\n        if (node_v.children && node_v.children.length > 0) {\r\n          this.getChildrenId(node_v, shouldCollapseIdArr)\r\n        }\r\n      })\r\n    }\r\n\r\n  }\r\n\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n  .basic-container{\r\n\r\n  }\r\n  .view-source-btn{\r\n      color: #519eff;\r\n      font-weight: 500;\r\n      cursor: pointer;\r\n  }\r\n  .view-source-btn:hover{\r\n      color:#173dff;\r\n      font-weight: 500;\r\n      cursor: pointer;\r\n  }\r\n  .tree-root{\r\n      color: #67c23a;\r\n      font-size: 16px;\r\n  }\r\n\r\n\r\n</style>\r\n<style>\r\n</style>\r\n\r\n"]}, media: undefined })
,inject("data-v-0e695428_1", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"data.vue"}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$5 = "data-v-0e695428";
  /* module identifier */
  const __vue_module_identifier__$5 = undefined;
  /* functional template */
  const __vue_is_functional_template__$5 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$5 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    false,
    createInjector,
    undefined,
    undefined
  );

//
var script$6 = {
  name: 'VueComponentInspector',
  components: {
    Navigation: __vue_component__$1, Basic: __vue_component__$2, Data: __vue_component__$5, Event: __vue_component__$3
  },
  props: {
  },
  data () {
    return {
      path: '',
      componentsView: false,
      activeNames: ['2', '3'],
      isShowElementUI: false,
      clearComponentsLabel: null,
      clearDomEventLabel: null,
      curVm: null,
      dataSource: '',
      isShowDataSource: false
    }
  },
  watch: {
    componentsView: function (val) {
      this.$root.componentsView = val;
      if (val) {
        this.showComponentsLabel();
      } else {
        this.hideComponentsLabel();
      }
    },
    'curVm': {
          handler(val) {
              let vm = val;
              let path=vm.$options.name;
              while (vm.$parent && vm.$parent.$options.name) {
                  path = vm.$parent.$options.name + ' / ' + path;
                  vm = vm.$parent;
              }
              this.path = path;
          }
      }
    /*        isShowElementUI: function(val) {
            if(this.componentsView) {
                this.clearComponentsLabel = this.wiew('com')
            }
        }*/
  },
  mounted () {
    // set VCIIndex
    this.$root.VCIIndex = this;
  },
  methods: {
    // change curVm
    change (vm) {
      this.curVm = vm;
    },
    toggle () {
      const index = document.getElementById('index-container');
      if (index.style.right === '0px') {
        index.style.right = '-400px';
      } else {
        index.style.right = '0px';
      }
    },
    handleChange (val) {
    },
    showData (data, flag) {
      flag && (this.isShowDataSource = true);
      this.dataSource = data;
    },
    showComponentsLabel () {
        this.$root.componentsLabelCollection.map((map, i) => {
            if (map.componentsLabel.parentNode !== map.vmEl.parentNode) {
                if (map.vmEl.parentNode) {
                    map.vmEl.parentNode.appendChild(map.componentsLabel);
                }
            }
            map.componentsLabel.style.display = 'block';
            map.vmEl.style.outline = '1px solid green';
            map.vmEl.style.outlineOffset='-4px';
        });
    },
    hideComponentsLabel () {
        this.$root.componentsLabelCollection.map((map, i) => {
            document.body.appendChild(map.componentsLabel);
            map.componentsLabel.style.display = 'none';
            map.vmEl.style.outline = '';
        });
        this.$root.clearDomEventLabel && this.$root.clearDomEventLabel();
    }
  }

};

/* script */
const __vue_script__$6 = script$6;

/* template */
var __vue_render__$6 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "index-container", attrs: { id: "index-container" } },
    [
      _c(
        "div",
        {
          staticStyle: {
            height: "100%",
            overflow: "auto",
            "padding-top": "35px"
          }
        },
        [
          _c("i", {
            staticClass: "el-icon-d-caret open-btn",
            on: { click: _vm.toggle }
          }),
          _vm._v(" "),
          _c("div", { staticClass: "tool-bar" }, [
            _vm._v("\n        VCI - 1.1.13 "),
            _c("br"),
            _vm._v(" "),
            _c(
              "div",
              [
                _vm._v("\n          ComponentsView "),
                _c("el-switch", {
                  staticStyle: {
                    "vertical-align": "sub",
                    "margin-left": "10px"
                  },
                  model: {
                    value: _vm.componentsView,
                    callback: function($$v) {
                      _vm.componentsView = $$v;
                    },
                    expression: "componentsView"
                  }
                }),
                _vm._v(" "),
                _c("i", {
                  staticClass: "el-icon-refresh refreshBtn",
                  on: {
                    click: function() {
                      _vm.componentsView && _vm.showComponentsLabel();
                    }
                  }
                })
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c("Navigation", {
            staticStyle: { "margin-top": "30px" },
            attrs: { "cur-vm": _vm.curVm }
          }),
          _vm._v(" "),
          _vm.curVm
            ? _c("h1", { staticClass: "vm-name" }, [
                _c("div", [
                  _vm._v(
                    "<" + _vm._s(_vm.curVm && _vm.curVm.$options.name) + ">"
                  )
                ]),
                _vm._v(" "),
                _c("span", { staticClass: "path" }, [_vm._v(_vm._s(_vm.path))])
              ])
            : _c("p", { staticClass: "no-select" }, [
                _vm._v(" select a component to inspect ")
              ]),
          _vm._v(" "),
          _c(
            "el-collapse",
            {
              staticStyle: { "margin-top": "50px" },
              on: { change: _vm.handleChange },
              model: {
                value: _vm.activeNames,
                callback: function($$v) {
                  _vm.activeNames = $$v;
                },
                expression: "activeNames"
              }
            },
            [
              _c(
                "el-collapse-item",
                { attrs: { title: "Data", name: "2" } },
                [
                  _c("template", { slot: "title" }, [
                    _vm._v(" Data\n          ")
                  ]),
                  _vm._v(" "),
                  _c("Data", {
                    attrs: { id: "data", curVm: _vm.curVm },
                    on: { showData: _vm.showData }
                  })
                ],
                2
              ),
              _vm._v(" "),
              _c(
                "el-collapse-item",
                { attrs: { title: "Event", name: "3" } },
                [
                  _c("template", { slot: "title" }, [
                    _vm._v(" Event\n          ")
                  ]),
                  _vm._v(" "),
                  _c("Event", { attrs: { id: "event", curVm: _vm.curVm } })
                ],
                2
              ),
              _vm._v(" "),
              _c(
                "el-collapse-item",
                { attrs: { title: "DIY", name: "4" } },
                [
                  _c("template", { slot: "title" }, [
                    _vm._v(" DIY\n          ")
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "diy" }, [
                    _vm._v("\n              Here's your idea\n          ")
                  ])
                ],
                2
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _vm.isShowDataSource
        ? _c("div", { staticClass: "data-source" }, [
            _c(
              "button",
              {
                on: {
                  click: function($event) {
                    _vm.isShowDataSource = false;
                  }
                }
              },
              [_vm._v("close")]
            ),
            _vm._v(" "),
            _c("pre", [_vm._v(_vm._s(_vm.dataSource))])
          ])
        : _vm._e()
    ]
  )
};
var __vue_staticRenderFns__$6 = [];
__vue_render__$6._withStripped = true;

  /* style */
  const __vue_inject_styles__$6 = function (inject) {
    if (!inject) return
    inject("data-v-3cfadf78_0", { source: "\n.tool-bar[data-v-3cfadf78]{\n  position: absolute;\n  top: 10px;\n  z-index: 10;\n  background: #ffffff;\n  width: 91%;\n  border-bottom: 1px solid #ebeef5;\n  padding-bottom: 10px;\n}\n.index-container[data-v-3cfadf78]{\n  position:absolute;\n  width:400px;\n  height:100%;\n  right:-400px;\n  bottom:0;\n  background: #fff;\n  z-index: 10000;\n  transition: all 0.2s linear 0s;\n  border: 1px solid #ccc;\n  padding: 10px;\n  box-sizing: border-box;\n  /*overflow:auto;*/\n}\n.open-btn[data-v-3cfadf78]{\n  transform: rotate(-90deg);\n  font-size: 30px;\n  cursor:pointer;\n  position: absolute;\n  top: 0px;\n  left: -36px;\n}\n.open-btn[data-v-3cfadf78]:hover{\n  color: #409eff;\n}\n.data-source[data-v-3cfadf78]{\n  position: absolute;\n  height: 100%;\n  background: lavender;\n  width: 100%;\n  top: 0;\n  right: 0;\n  overflow: auto;\n  z-index: 10;\n}\n.path[data-v-3cfadf78]{\nfont-size: 12px;\nbackground: #a6dfa4;\ncolor: #ffffff;\npadding: 0px 15px;\npadding-bottom: 2px;\nborder-radius: 10px;\n/*font-weight: bolder;*/\n  position: relative;\n  top: -10px;\n  word-wrap: break-word;\n}\n.no-select[data-v-3cfadf78]{\n  color:#a6dfa5;\n  margin-top:50px;\n  text-align:center;\n  font-size: 18px;\n}\n.vm-name[data-v-3cfadf78]{\n    margin-top:50px;\n    font-size: 25px;\n    color: #a6dfa5;\n    text-align:center;\n}\n.refreshBtn[data-v-3cfadf78]{\n    font-size: 18px;\n    margin-left: 6px;\n    cursor: pointer;\n}\n.refreshBtn[data-v-3cfadf78]:hover{\n    color: #519eff;\n}\n.diy[data-v-3cfadf78]{\n     height: 100px;\n     line-height: 100px;\n     text-align: center;\n     color: #2de523;\n     font-size: 20px;\n}\n", map: {"version":3,"sources":["E:\\BaiduNetdiskDownload\\Vue\\vue-component-inspector-1.x\\src\\components\\index.vue"],"names":[],"mappings":";AA8JA;EACA,kBAAA;EACA,SAAA;EACA,WAAA;EACA,mBAAA;EACA,UAAA;EACA,gCAAA;EACA,oBAAA;AACA;AACA;EACA,iBAAA;EACA,WAAA;EACA,WAAA;EACA,YAAA;EACA,QAAA;EACA,gBAAA;EACA,cAAA;EACA,8BAAA;EACA,sBAAA;EACA,aAAA;EACA,sBAAA;EACA,iBAAA;AACA;AACA;EACA,yBAAA;EACA,eAAA;EACA,cAAA;EACA,kBAAA;EACA,QAAA;EACA,WAAA;AAEA;AACA;EACA,cAAA;AACA;AACA;EACA,kBAAA;EACA,YAAA;EACA,oBAAA;EACA,WAAA;EACA,MAAA;EACA,QAAA;EACA,cAAA;EACA,WAAA;AACA;AACA;AACA,eAAA;AACA,mBAAA;AACA,cAAA;AACA,iBAAA;AACA,mBAAA;AACA,mBAAA;AACA,uBAAA;EACA,kBAAA;EACA,UAAA;EACA,qBAAA;AACA;AACA;EACA,aAAA;EACA,eAAA;EACA,iBAAA;EACA,eAAA;AACA;AACA;IACA,eAAA;IACA,eAAA;IACA,cAAA;IACA,iBAAA;AACA;AACA;IACA,eAAA;IACA,gBAAA;IACA,eAAA;AACA;AACA;IACA,cAAA;AACA;AACA;KACA,aAAA;KACA,kBAAA;KACA,kBAAA;KACA,cAAA;KACA,eAAA;AACA","file":"index.vue","sourcesContent":["<template>\r\n  <div id=\"index-container\" class=\"index-container\" style=\"\">\r\n    <div style=\"height: 100%;overflow: auto;padding-top: 35px;\">\r\n      <!--toggle btn-->\r\n      <i class=\"el-icon-d-caret open-btn\" style=\"\" @click=\"toggle\"/>\r\n      <div class=\"tool-bar\">\r\n        VCI - 1.1.13 <br>\r\n        <!--view switch-->\r\n        <div>\r\n          ComponentsView <el-switch v-model=\"componentsView\" style=\"vertical-align: sub;margin-left: 10px;\"/>\r\n            <i class=\"el-icon-refresh refreshBtn\" @click=\"()=>{componentsView&&showComponentsLabel()}\"></i>\r\n        </div>\r\n      </div>\r\n      <!--components navigation tree-->\r\n      <Navigation :cur-vm=\"curVm\" style=\"margin-top:30px\"/>\r\n      <!--name-->\r\n      <h1 v-if=\"curVm\" class=\"vm-name\">\r\n        <div><{{ curVm&&curVm.$options.name }}></div>\r\n        <span class=\"path\">{{path}}</span>\r\n      </h1>\r\n      <p v-else style=\"\" class=\"no-select\"> select a component to inspect </p>\r\n      <el-collapse v-model=\"activeNames\" style=\"margin-top:50px\" @change=\"handleChange\">\r\n<!--        <el-collapse-item title=\"Basic\" name=\"1\">\r\n          <Basic :curVm=\"curVm\"/>\r\n        </el-collapse-item>-->\r\n        <el-collapse-item title=\"Data\" name=\"2\">\r\n          <template slot=\"title\">\r\n            <!--<i class=\"header-icon el-icon-info\"></i>--> Data\r\n          </template>\r\n          <Data id=\"data\" :curVm=\"curVm\" @showData=\"showData\"/>\r\n        </el-collapse-item>\r\n        <el-collapse-item title=\"Event\" name=\"3\">\r\n          <template slot=\"title\">\r\n            <!--<i class=\"header-icon el-icon-info\"></i>--> Event\r\n          </template>\r\n          <Event id=\"event\" :curVm=\"curVm\"/>\r\n        </el-collapse-item>\r\n        <el-collapse-item title=\"DIY\" name=\"4\">\r\n          <template slot=\"title\">\r\n            <!--<i class=\"header-icon el-icon-info\"></i>--> DIY\r\n          </template>\r\n          <div class=\"diy\">\r\n              Here's your idea\r\n          </div>\r\n        </el-collapse-item>\r\n      </el-collapse>\r\n    </div>\r\n\r\n    <div v-if=\"isShowDataSource\" style=\"\" class=\"data-source\">\r\n      <button @click=\"isShowDataSource=false\">close</button>\r\n      <pre>{{ dataSource }}</pre>\r\n    </div>\r\n\r\n\r\n  </div>\r\n</template>\r\n<script>\r\n// import { ElementUI } from '../config'\r\n// import { isViewCom, addEventList } from './../util/util'\r\nimport Navigation from './navigation.vue'\r\nimport Basic from './basic.vue'\r\nimport Event from './event.vue'\r\nimport Data from './data.vue'\r\nexport default {\r\n  name: 'VueComponentInspector',\r\n  components: {\r\n    Navigation, Basic, Data, Event\r\n  },\r\n  props: {\r\n  },\r\n  data () {\r\n    return {\r\n      path: '',\r\n      componentsView: false,\r\n      activeNames: ['2', '3'],\r\n      isShowElementUI: false,\r\n      clearComponentsLabel: null,\r\n      clearDomEventLabel: null,\r\n      curVm: null,\r\n      dataSource: '',\r\n      isShowDataSource: false\r\n    }\r\n  },\r\n  watch: {\r\n    componentsView: function (val) {\r\n      this.$root.componentsView = val\r\n      if (val) {\r\n        this.showComponentsLabel()\r\n      } else {\r\n        this.hideComponentsLabel()\r\n      }\r\n    },\r\n    'curVm': {\r\n          handler(val) {\r\n              let vm = val\r\n              let path=vm.$options.name\r\n              while (vm.$parent && vm.$parent.$options.name) {\r\n                  path = vm.$parent.$options.name + ' / ' + path\r\n                  vm = vm.$parent\r\n              }\r\n              this.path = path\r\n          }\r\n      }\r\n    /*        isShowElementUI: function(val) {\r\n            if(this.componentsView) {\r\n                this.clearComponentsLabel = this.wiew('com')\r\n            }\r\n        }*/\r\n  },\r\n  mounted () {\r\n    // set VCIIndex\r\n    this.$root.VCIIndex = this\r\n  },\r\n  methods: {\r\n    // change curVm\r\n    change (vm) {\r\n      this.curVm = vm\r\n    },\r\n    toggle () {\r\n      const index = document.getElementById('index-container')\r\n      if (index.style.right === '0px') {\r\n        index.style.right = '-400px'\r\n      } else {\r\n        index.style.right = '0px'\r\n      }\r\n    },\r\n    handleChange (val) {\r\n    },\r\n    showData (data, flag) {\r\n      flag && (this.isShowDataSource = true)\r\n      this.dataSource = data\r\n    },\r\n    showComponentsLabel () {\r\n        this.$root.componentsLabelCollection.map((map, i) => {\r\n            if (map.componentsLabel.parentNode !== map.vmEl.parentNode) {\r\n                if (map.vmEl.parentNode) {\r\n                    map.vmEl.parentNode.appendChild(map.componentsLabel)\r\n                }\r\n            }\r\n            map.componentsLabel.style.display = 'block'\r\n            map.vmEl.style.outline = '1px solid green'\r\n            map.vmEl.style.outlineOffset='-4px';\r\n        })\r\n    },\r\n    hideComponentsLabel () {\r\n        this.$root.componentsLabelCollection.map((map, i) => {\r\n            document.body.appendChild(map.componentsLabel)\r\n            map.componentsLabel.style.display = 'none'\r\n            map.vmEl.style.outline = ''\r\n        })\r\n        this.$root.clearDomEventLabel && this.$root.clearDomEventLabel()\r\n    }\r\n  }\r\n\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n  .tool-bar{\r\n    position: absolute;\r\n    top: 10px;\r\n    z-index: 10;\r\n    background: #ffffff;\r\n    width: 91%;\r\n    border-bottom: 1px solid #ebeef5;\r\n    padding-bottom: 10px;\r\n  }\r\n  .index-container{\r\n    position:absolute;\r\n    width:400px;\r\n    height:100%;\r\n    right:-400px;\r\n    bottom:0;\r\n    background: #fff;\r\n    z-index: 10000;\r\n    transition: all 0.2s linear 0s;\r\n    border: 1px solid #ccc;\r\n    padding: 10px;\r\n    box-sizing: border-box;\r\n    /*overflow:auto;*/\r\n  }\r\n  .open-btn{\r\n    transform: rotate(-90deg);\r\n    font-size: 30px;\r\n    cursor:pointer;\r\n    position: absolute;\r\n    top: 0px;\r\n    left: -36px;\r\n\r\n  }\r\n  .open-btn:hover{\r\n    color: #409eff;\r\n  }\r\n  .data-source{\r\n    position: absolute;\r\n    height: 100%;\r\n    background: lavender;\r\n    width: 100%;\r\n    top: 0;\r\n    right: 0;\r\n    overflow: auto;\r\n    z-index: 10;\r\n  }\r\n  .path{\r\n  font-size: 12px;\r\n  background: #a6dfa4;\r\n  color: #ffffff;\r\n  padding: 0px 15px;\r\n  padding-bottom: 2px;\r\n  border-radius: 10px;\r\n  /*font-weight: bolder;*/\r\n    position: relative;\r\n    top: -10px;\r\n    word-wrap: break-word;\r\n  }\r\n  .no-select{\r\n    color:#a6dfa5;\r\n    margin-top:50px;\r\n    text-align:center;\r\n    font-size: 18px;\r\n  }\r\n  .vm-name{\r\n      margin-top:50px;\r\n      font-size: 25px;\r\n      color: #a6dfa5;\r\n      text-align:center;\r\n  }\r\n  .refreshBtn{\r\n      font-size: 18px;\r\n      margin-left: 6px;\r\n      cursor: pointer;\r\n  }\r\n  .refreshBtn:hover{\r\n      color: #519eff;\r\n  }\r\n   .diy{\r\n       height: 100px;\r\n       line-height: 100px;\r\n       text-align: center;\r\n       color: #2de523;\r\n       font-size: 20px;\r\n   }\r\n</style>\r\n<style>\r\n  body{\r\n    overflow:hidden;\r\n  }\r\n\r\n  .vue-component-inspector:hover{\r\n      border: 1.5px solid #0b6207;\r\n  }\r\n\r\n  .event-icon:hover{\r\n      color: #409EFF !important;\r\n  }\r\n  .event-label:hover{\r\n      border-color: #409EFF !important;\r\n  }\r\n\r\n  /* scrollbar style */\r\n  ::-webkit-scrollbar{\r\n      width:9px\r\n  }\r\n\r\n  ::-webkit-scrollbar-track{\r\n      -webkit-border-radius:5px;\r\n      border-radius:5px;\r\n      background:rgba(0, 0, 0, .1)\r\n  }\r\n\r\n  ::-webkit-scrollbar-thumb{\r\n      -webkit-border-radius:5px;\r\n      border-radius:5px;\r\n      background:rgba(0, 0, 0, .2)\r\n  }\r\n\r\n  ::-webkit-scrollbar-thumb:hover{\r\n      background:rgba(0, 0, 0, .4)\r\n  }\r\n\r\n  ::-webkit-scrollbar-thumb:window-inactive{\r\n      background:rgba(0, 0, 0, .05)\r\n  }\r\n  /* scrollbar style */\r\n\r\n</style>\r\n\r\n"]}, media: undefined })
,inject("data-v-3cfadf78_1", { source: "\nbody{\n  overflow:hidden;\n}\n.vue-component-inspector:hover{\n    border: 1.5px solid #0b6207;\n}\n.event-icon:hover{\n    color: #409EFF !important;\n}\n.event-label:hover{\n    border-color: #409EFF !important;\n}\n\n/* scrollbar style */\n::-webkit-scrollbar{\n    width:9px\n}\n::-webkit-scrollbar-track{\n    -webkit-border-radius:5px;\n    border-radius:5px;\n    background:rgba(0, 0, 0, .1)\n}\n::-webkit-scrollbar-thumb{\n    -webkit-border-radius:5px;\n    border-radius:5px;\n    background:rgba(0, 0, 0, .2)\n}\n::-webkit-scrollbar-thumb:hover{\n    background:rgba(0, 0, 0, .4)\n}\n::-webkit-scrollbar-thumb:window-inactive{\n    background:rgba(0, 0, 0, .05)\n}\n/* scrollbar style */\n\n", map: {"version":3,"sources":["E:\\BaiduNetdiskDownload\\Vue\\vue-component-inspector-1.x\\src\\components\\index.vue"],"names":[],"mappings":";AAoPA;EACA,eAAA;AACA;AAEA;IACA,2BAAA;AACA;AAEA;IACA,yBAAA;AACA;AACA;IACA,gCAAA;AACA;;AAEA,oBAAA;AACA;IACA;AACA;AAEA;IACA,yBAAA;IACA,iBAAA;IACA;AACA;AAEA;IACA,yBAAA;IACA,iBAAA;IACA;AACA;AAEA;IACA;AACA;AAEA;IACA;AACA;AACA,oBAAA","file":"index.vue","sourcesContent":["<template>\r\n  <div id=\"index-container\" class=\"index-container\" style=\"\">\r\n    <div style=\"height: 100%;overflow: auto;padding-top: 35px;\">\r\n      <!--toggle btn-->\r\n      <i class=\"el-icon-d-caret open-btn\" style=\"\" @click=\"toggle\"/>\r\n      <div class=\"tool-bar\">\r\n        VCI - 1.1.13 <br>\r\n        <!--view switch-->\r\n        <div>\r\n          ComponentsView <el-switch v-model=\"componentsView\" style=\"vertical-align: sub;margin-left: 10px;\"/>\r\n            <i class=\"el-icon-refresh refreshBtn\" @click=\"()=>{componentsView&&showComponentsLabel()}\"></i>\r\n        </div>\r\n      </div>\r\n      <!--components navigation tree-->\r\n      <Navigation :cur-vm=\"curVm\" style=\"margin-top:30px\"/>\r\n      <!--name-->\r\n      <h1 v-if=\"curVm\" class=\"vm-name\">\r\n        <div><{{ curVm&&curVm.$options.name }}></div>\r\n        <span class=\"path\">{{path}}</span>\r\n      </h1>\r\n      <p v-else style=\"\" class=\"no-select\"> select a component to inspect </p>\r\n      <el-collapse v-model=\"activeNames\" style=\"margin-top:50px\" @change=\"handleChange\">\r\n<!--        <el-collapse-item title=\"Basic\" name=\"1\">\r\n          <Basic :curVm=\"curVm\"/>\r\n        </el-collapse-item>-->\r\n        <el-collapse-item title=\"Data\" name=\"2\">\r\n          <template slot=\"title\">\r\n            <!--<i class=\"header-icon el-icon-info\"></i>--> Data\r\n          </template>\r\n          <Data id=\"data\" :curVm=\"curVm\" @showData=\"showData\"/>\r\n        </el-collapse-item>\r\n        <el-collapse-item title=\"Event\" name=\"3\">\r\n          <template slot=\"title\">\r\n            <!--<i class=\"header-icon el-icon-info\"></i>--> Event\r\n          </template>\r\n          <Event id=\"event\" :curVm=\"curVm\"/>\r\n        </el-collapse-item>\r\n        <el-collapse-item title=\"DIY\" name=\"4\">\r\n          <template slot=\"title\">\r\n            <!--<i class=\"header-icon el-icon-info\"></i>--> DIY\r\n          </template>\r\n          <div class=\"diy\">\r\n              Here's your idea\r\n          </div>\r\n        </el-collapse-item>\r\n      </el-collapse>\r\n    </div>\r\n\r\n    <div v-if=\"isShowDataSource\" style=\"\" class=\"data-source\">\r\n      <button @click=\"isShowDataSource=false\">close</button>\r\n      <pre>{{ dataSource }}</pre>\r\n    </div>\r\n\r\n\r\n  </div>\r\n</template>\r\n<script>\r\n// import { ElementUI } from '../config'\r\n// import { isViewCom, addEventList } from './../util/util'\r\nimport Navigation from './navigation.vue'\r\nimport Basic from './basic.vue'\r\nimport Event from './event.vue'\r\nimport Data from './data.vue'\r\nexport default {\r\n  name: 'VueComponentInspector',\r\n  components: {\r\n    Navigation, Basic, Data, Event\r\n  },\r\n  props: {\r\n  },\r\n  data () {\r\n    return {\r\n      path: '',\r\n      componentsView: false,\r\n      activeNames: ['2', '3'],\r\n      isShowElementUI: false,\r\n      clearComponentsLabel: null,\r\n      clearDomEventLabel: null,\r\n      curVm: null,\r\n      dataSource: '',\r\n      isShowDataSource: false\r\n    }\r\n  },\r\n  watch: {\r\n    componentsView: function (val) {\r\n      this.$root.componentsView = val\r\n      if (val) {\r\n        this.showComponentsLabel()\r\n      } else {\r\n        this.hideComponentsLabel()\r\n      }\r\n    },\r\n    'curVm': {\r\n          handler(val) {\r\n              let vm = val\r\n              let path=vm.$options.name\r\n              while (vm.$parent && vm.$parent.$options.name) {\r\n                  path = vm.$parent.$options.name + ' / ' + path\r\n                  vm = vm.$parent\r\n              }\r\n              this.path = path\r\n          }\r\n      }\r\n    /*        isShowElementUI: function(val) {\r\n            if(this.componentsView) {\r\n                this.clearComponentsLabel = this.wiew('com')\r\n            }\r\n        }*/\r\n  },\r\n  mounted () {\r\n    // set VCIIndex\r\n    this.$root.VCIIndex = this\r\n  },\r\n  methods: {\r\n    // change curVm\r\n    change (vm) {\r\n      this.curVm = vm\r\n    },\r\n    toggle () {\r\n      const index = document.getElementById('index-container')\r\n      if (index.style.right === '0px') {\r\n        index.style.right = '-400px'\r\n      } else {\r\n        index.style.right = '0px'\r\n      }\r\n    },\r\n    handleChange (val) {\r\n    },\r\n    showData (data, flag) {\r\n      flag && (this.isShowDataSource = true)\r\n      this.dataSource = data\r\n    },\r\n    showComponentsLabel () {\r\n        this.$root.componentsLabelCollection.map((map, i) => {\r\n            if (map.componentsLabel.parentNode !== map.vmEl.parentNode) {\r\n                if (map.vmEl.parentNode) {\r\n                    map.vmEl.parentNode.appendChild(map.componentsLabel)\r\n                }\r\n            }\r\n            map.componentsLabel.style.display = 'block'\r\n            map.vmEl.style.outline = '1px solid green'\r\n            map.vmEl.style.outlineOffset='-4px';\r\n        })\r\n    },\r\n    hideComponentsLabel () {\r\n        this.$root.componentsLabelCollection.map((map, i) => {\r\n            document.body.appendChild(map.componentsLabel)\r\n            map.componentsLabel.style.display = 'none'\r\n            map.vmEl.style.outline = ''\r\n        })\r\n        this.$root.clearDomEventLabel && this.$root.clearDomEventLabel()\r\n    }\r\n  }\r\n\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n  .tool-bar{\r\n    position: absolute;\r\n    top: 10px;\r\n    z-index: 10;\r\n    background: #ffffff;\r\n    width: 91%;\r\n    border-bottom: 1px solid #ebeef5;\r\n    padding-bottom: 10px;\r\n  }\r\n  .index-container{\r\n    position:absolute;\r\n    width:400px;\r\n    height:100%;\r\n    right:-400px;\r\n    bottom:0;\r\n    background: #fff;\r\n    z-index: 10000;\r\n    transition: all 0.2s linear 0s;\r\n    border: 1px solid #ccc;\r\n    padding: 10px;\r\n    box-sizing: border-box;\r\n    /*overflow:auto;*/\r\n  }\r\n  .open-btn{\r\n    transform: rotate(-90deg);\r\n    font-size: 30px;\r\n    cursor:pointer;\r\n    position: absolute;\r\n    top: 0px;\r\n    left: -36px;\r\n\r\n  }\r\n  .open-btn:hover{\r\n    color: #409eff;\r\n  }\r\n  .data-source{\r\n    position: absolute;\r\n    height: 100%;\r\n    background: lavender;\r\n    width: 100%;\r\n    top: 0;\r\n    right: 0;\r\n    overflow: auto;\r\n    z-index: 10;\r\n  }\r\n  .path{\r\n  font-size: 12px;\r\n  background: #a6dfa4;\r\n  color: #ffffff;\r\n  padding: 0px 15px;\r\n  padding-bottom: 2px;\r\n  border-radius: 10px;\r\n  /*font-weight: bolder;*/\r\n    position: relative;\r\n    top: -10px;\r\n    word-wrap: break-word;\r\n  }\r\n  .no-select{\r\n    color:#a6dfa5;\r\n    margin-top:50px;\r\n    text-align:center;\r\n    font-size: 18px;\r\n  }\r\n  .vm-name{\r\n      margin-top:50px;\r\n      font-size: 25px;\r\n      color: #a6dfa5;\r\n      text-align:center;\r\n  }\r\n  .refreshBtn{\r\n      font-size: 18px;\r\n      margin-left: 6px;\r\n      cursor: pointer;\r\n  }\r\n  .refreshBtn:hover{\r\n      color: #519eff;\r\n  }\r\n   .diy{\r\n       height: 100px;\r\n       line-height: 100px;\r\n       text-align: center;\r\n       color: #2de523;\r\n       font-size: 20px;\r\n   }\r\n</style>\r\n<style>\r\n  body{\r\n    overflow:hidden;\r\n  }\r\n\r\n  .vue-component-inspector:hover{\r\n      border: 1.5px solid #0b6207;\r\n  }\r\n\r\n  .event-icon:hover{\r\n      color: #409EFF !important;\r\n  }\r\n  .event-label:hover{\r\n      border-color: #409EFF !important;\r\n  }\r\n\r\n  /* scrollbar style */\r\n  ::-webkit-scrollbar{\r\n      width:9px\r\n  }\r\n\r\n  ::-webkit-scrollbar-track{\r\n      -webkit-border-radius:5px;\r\n      border-radius:5px;\r\n      background:rgba(0, 0, 0, .1)\r\n  }\r\n\r\n  ::-webkit-scrollbar-thumb{\r\n      -webkit-border-radius:5px;\r\n      border-radius:5px;\r\n      background:rgba(0, 0, 0, .2)\r\n  }\r\n\r\n  ::-webkit-scrollbar-thumb:hover{\r\n      background:rgba(0, 0, 0, .4)\r\n  }\r\n\r\n  ::-webkit-scrollbar-thumb:window-inactive{\r\n      background:rgba(0, 0, 0, .05)\r\n  }\r\n  /* scrollbar style */\r\n\r\n</style>\r\n\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$6 = "data-v-3cfadf78";
  /* module identifier */
  const __vue_module_identifier__$6 = undefined;
  /* functional template */
  const __vue_is_functional_template__$6 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$6 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$7 = {
  name: 'Container01',
  components: {
  },
  props: {
    applicationId: {
      type: null,
      default () {
        return ''
      }
    },
    element: {
      type: null,
      default () {
        return false
      }
    },
    listIndex: {
      type: null,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      a: {
        b: [{ a: 'a' }, 1],
        c: {
          b: 'b',
          c: 'c'
        },
        d: true,
        e: 1

      }
    }
  },
  watch: {
    defaultValue: function (val) {
      if (val) {
        this.componentsView('com');
      } else {
        this.componentsView('mor');
      }
    }
  },
  mounted () {

  },
  methods: {
    btnClick01 () {
      console.log('btnClick01');
    },
    btnClick02 (p) {
      console.log(p);
    },
    btnClick03 () {
      console.log('btnClick03');
    },
    mouseover () {
      console.log('mouseover');
    },
    formCreate () {
      console.log('formCreate');
    }
  }

};

/* script */
const __vue_script__$7 = script$7;

/* template */
var __vue_render__$7 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "input-container" },
    [
      _c("button", { on: { click: _vm.btnClick01 } }, [_vm._v("btnClick01")]),
      _c("br"),
      _c("br"),
      _c("br"),
      _vm._v(" "),
      _c(
        "button",
        {
          on: {
            click: function($event) {
              return _vm.btnClick02("btnClick02")
            }
          }
        },
        [_vm._v("btnClick02")]
      ),
      _c("br"),
      _c("br"),
      _c("br"),
      _vm._v(" "),
      _c("button", { on: { click: _vm.mouseover, mouseover: _vm.mouseover } }, [
        _vm._v("mouseover")
      ]),
      _c("br"),
      _c("br"),
      _c("br"),
      _vm._v(" "),
      _c(
        "el-button",
        {
          attrs: { type: "primary", icon: "", size: "mini" },
          on: { click: _vm.formCreate }
        },
        [_vm._v("el-button")]
      ),
      _vm._v(" "),
      _vm._l(_vm.a.b, function(item, index) {
        return _c("div", { key: index }, [
          _vm._v("\n    " + _vm._s(item) + "\n  ")
        ])
      })
    ],
    2
  )
};
var __vue_staticRenderFns__$7 = [];
__vue_render__$7._withStripped = true;

  /* style */
  const __vue_inject_styles__$7 = function (inject) {
    if (!inject) return
    inject("data-v-6cc93bcb_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"contaienr-01.vue"}, media: undefined })
,inject("data-v-6cc93bcb_1", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"contaienr-01.vue"}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$7 = "data-v-6cc93bcb";
  /* module identifier */
  const __vue_module_identifier__$7 = undefined;
  /* functional template */
  const __vue_is_functional_template__$7 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$7 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//

var script$8 = {
  name: 'Container02',
  components: {
  },
  props: {
    applicationId: {
      type: null,
      default () {
        return ''
      }
    },
    element: {
      type: null,
      default () {
        return false
      }
    },
    listIndex: {
      type: null,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      defaultValue: true,
      time: 1
    }
  },
  watch: {
    defaultValue: function (val) {
      if (val) {
        this.componentsView('com');
      } else {
        this.componentsView('mor');
      }
    }
  },
  mounted () {
  },
  methods: {
    componentsView (view) {
    }
  }

};

/* script */
const __vue_script__$8 = script$8;

/* template */
var __vue_render__$8 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "input-container" })
};
var __vue_staticRenderFns__$8 = [];
__vue_render__$8._withStripped = true;

  /* style */
  const __vue_inject_styles__$8 = function (inject) {
    if (!inject) return
    inject("data-v-7cd22204_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"contaienr-02.vue"}, media: undefined })
,inject("data-v-7cd22204_1", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"contaienr-02.vue"}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$8 = "data-v-7cd22204";
  /* module identifier */
  const __vue_module_identifier__$8 = undefined;
  /* functional template */
  const __vue_is_functional_template__$8 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$8 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
    __vue_inject_styles__$8,
    __vue_script__$8,
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//

var script$9 = {
  name: 'Container03',
  components: {
  },
  props: {
    applicationId: {
      type: null,
      default () {
        return 'null'
      }
    },
    element: {
      type: null,
      default () {
        return false
      }
    },
    listIndex: {
      type: null,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      a: {
        b: [{ a: 'a' }, 1],
        c: {
          b: 'b',
          c: 'c'
        },
        d: true,
        e: 1

      },
      b: {
        b: [{ a: 'a' }, 1],
        c: {
          b: 'b',
          c: 'c'
        },
        d: true,
        e: 1

      }
    }
  },
  watch: {
    defaultValue: function (val) {
      if (val) {
        this.componentsView('com');
      } else {
        this.componentsView('mor');
      }
    }
  },
  mounted () {

  },
  methods: {
    btnClick01 () {
      console.log('btnClick01');
    },
    btnClick02 (p) {
      console.log(p);
    },
    btnClick03 () {
      console.log('btnClick03');
    },
    mouseover () {
      console.log('mouseover');
    },
    formCreate () {
      console.log('formCreate');
    }
  }

};

/* script */
const __vue_script__$9 = script$9;

/* template */
var __vue_render__$9 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "input-container" }, [
    _c("br"),
    _c("br"),
    _c("br"),
    _c("br"),
    _c("br"),
    _c("br"),
    _c("br"),
    _c("br"),
    _vm._v(" "),
    _vm.a.d ? _c("div", [_vm._v(_vm._s(_vm.a.d))]) : _vm._e(),
    _vm._v(" "),
    _vm.a ? _c("div", [_vm._v(_vm._s(_vm.a))]) : _vm._e(),
    _vm._v(" "),
    _c("br"),
    _vm._v(" "),
    _vm.b ? _c("div", [_vm._v(_vm._s(_vm.b))]) : _vm._e()
  ])
};
var __vue_staticRenderFns__$9 = [];
__vue_render__$9._withStripped = true;

  /* style */
  const __vue_inject_styles__$9 = function (inject) {
    if (!inject) return
    inject("data-v-b5204462_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"contaienr-03.vue"}, media: undefined })
,inject("data-v-b5204462_1", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"contaienr-03.vue"}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$9 = "data-v-b5204462";
  /* module identifier */
  const __vue_module_identifier__$9 = undefined;
  /* functional template */
  const __vue_is_functional_template__$9 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$9 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
    __vue_inject_styles__$9,
    __vue_script__$9,
    __vue_scope_id__$9,
    __vue_is_functional_template__$9,
    __vue_module_identifier__$9,
    false,
    createInjector,
    undefined,
    undefined
  );

//
var script$a = {
  name: 'Page',
  components: {
    contaienr01: __vue_component__$7, contaienr02: __vue_component__$8, contaienr03: __vue_component__$9
  },
  props: {
  },
  data () {
    return {
      defaultValue: true
    }
  },
  watch: {
    defaultValue: function (val) {
    }
  },
  mounted () {
  },
  methods: {
    componentsView (view) {
    },
    getData01 () {

    },
    getData02 () {

    }
  }

};

/* script */
const __vue_script__$a = script$a;

/* template */
var __vue_render__$a = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "page-container" },
    [
      _c("contaienr02", {
        staticStyle: { height: "100px", width: "200px", background: "lavender" }
      }),
      _vm._v(" "),
      _c("contaienr01", {
        staticStyle: {
          height: "300px",
          width: "400px",
          background: "lavender",
          "margin-left": "100px"
        },
        on: {
          getData01: _vm.getData01,
          getData02: function($event) {
            return _vm.getData02(1)
          }
        }
      }),
      _vm._v(" "),
      _c("contaienr03", {
        staticStyle: { height: "300px", width: "400px", background: "lavender" }
      })
    ],
    1
  )
};
var __vue_staticRenderFns__$a = [];
__vue_render__$a._withStripped = true;

  /* style */
  const __vue_inject_styles__$a = function (inject) {
    if (!inject) return
    inject("data-v-89c40f98_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"page.vue"}, media: undefined })
,inject("data-v-89c40f98_1", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"page.vue"}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$a = "data-v-89c40f98";
  /* module identifier */
  const __vue_module_identifier__$a = undefined;
  /* functional template */
  const __vue_is_functional_template__$a = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$a = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
    __vue_inject_styles__$a,
    __vue_script__$a,
    __vue_scope_id__$a,
    __vue_is_functional_template__$a,
    __vue_module_identifier__$a,
    false,
    createInjector,
    undefined,
    undefined
  );

function addEventList (vm) {
    const eventList = { dom: [], com: [] };

    /** *************** 添加DOM事件 **********************/
        // 获取具有DOM事件的Vnode
    const VnodeListWithEvent = [];
    function parseVnodehEvent (vnode, VnodeListWithEvent) {
        if (vnode.data && vnode.data.on && (!vnode.componentInstance)) {
            VnodeListWithEvent.push(vnode);
        }
        if (vnode.children) {
            vnode.children.map((vm, i) => {
                parseVnodehEvent(vm, VnodeListWithEvent);
            });
        }
    }
    parseVnodehEvent(vm._vnode, VnodeListWithEvent);

    VnodeListWithEvent.map((Vnode, i) => {
        const VnodeEvent = Vnode.data.on;
        if (VnodeEvent) {
            const event = [];

            for (const key in VnodeEvent) {
                const eventFullFnName = VnodeEvent[key].fns.name;
                let eventFnName = '';
                if (eventFullFnName === key) {
                    //
                    if (vm.$options.methods) {
                        Object.keys(vm.$options.methods).map((m) => {
                            if (VnodeEvent[key].fns.toString().indexOf(m) > -1) {
                                eventFnName = m;
                            }
                        });
                    }
                } else {
                    eventFnName = eventFullFnName.split(' ')[1];
                }
                // VnodeEvent[key].fns
                // if(!eventFnName){
                //     debugger
                // }

                event.push({
                    name: eventFnName,
                    type: 'on' + key,
                    fn: eventFnName ? vm[eventFnName] : VnodeEvent[key].fns
                });
            }

            eventList.dom.push({
                name: 'ele' + i,
                el: Vnode.elm,
                event: event,
                isShow: false
            });

            // debugger
        }
    });

    vm.$options.eventList = eventList;

    /** *************** 添加组件事件 **********************/

        // if(vm.$options.name === "Container01"){
        //     debugger

    const ComEvent = vm.$options._parentListeners;

    for (const key in ComEvent) {
        const eventFullFnName = ComEvent[key].fns.name;
        let eventFnName = '';
        if (eventFullFnName === key) {
            //
            let $parent = vm.$parent;
            while (!eventFnName) {
                if ($parent.$options.methods) {
                    Object.keys($parent.$options.methods).map((m) => {
                        if (ComEvent[key].fns.toString().indexOf(m) > -1) {
                            eventFnName = m;
                        }
                    });
                }
                if (!$parent.$parent) {
                    break
                }
                $parent = $parent.$parent;
            }
        } else {
            eventFnName = eventFullFnName.split(' ')[1];
        }

        eventList.com.push({
            name: eventFnName,
            el: vm.el,
            fn: eventFnName ? vm[eventFnName] : ComEvent[key].fns
        });
    }

    // }

    //
}

// logo
const comLabelLogo = 'data:image/jpg;base64,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';

// previous vue
let preVm = null;
// clear DomEventLabel-fn
let clearDomEventLabel = null;
const EventLabelCollection = [];
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

};
let componentsLabelImgProps = {
    attr:{
        src:comLabelLogo,
    },
    style:{
       width:'20px',
       float:'left'
    }

};
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

};
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

};
// setElementProps
function setElementProps(el,props){
    for (const key in props) {
        if(key === 'attr'){
            for (const attrKey in props[key]) {
                el[attrKey] = props[key][attrKey];
            }
        }
        if(key === 'style'){
            for (const styleKey in props[key]) {
                el.style[styleKey] = props[key][styleKey];
            }
        }
    }
}
// createDomEventLabel
function createDomEventLabel (vm) {
  function setPosition (nodeEventMap) {
    nodeEventMap.map((map, i) => {
      const offsetTop = map.eventNode.offsetTop;
      const offsetLeft = map.eventNode.offsetLeft;
      const top = offsetTop;
      const left = map.eventNode.offsetWidth + offsetLeft;
      setElementProps(map.eventLabel,{style:{top:(top+'px'),left: (left + 'px')}});
    });
  }
  if (vm.$options.eventList) {
    const domEvent = vm.$options.eventList.dom;
    const nodeEventMap = [];
    // add label
    domEvent.map((e, i) => {
      const eventNode = e.el;

  let eventIcon = document.createElement('i');
  setElementProps(eventIcon,eventIconProps);
  const span = document.createElement('span');
  setElementProps(span,domEventLabelProps);
  span.appendChild(eventIcon);


  e.eventLabel = span;
  nodeEventMap.push({
    eventNode: eventNode,
    eventLabel: span
  });
  EventLabelCollection.push(span);
  // eventlabel add event
  span.addEventListener('click', () => {
    preVm.$options.eventList.dom.map((dom) => {
      if (dom.eventLabel === span) {
          setElementProps(span,{style:{color: '#409EFF',borderColor: '#409EFF'}});
          setElementProps(eventIcon,{style:{color: '#409EFF'}});
          dom.isShow = true;
      } else {
          // debugger
          setElementProps(dom.eventLabel,{style:{color: '#a6dfa5',borderColor: '#a6dfa5'}});
          setElementProps(dom.eventLabel.getElementsByTagName('i')[0],{style:{color: '#a6dfa5'}});
          dom.isShow = false;
      }
    });
    // updata view
    document.getElementById('event').__vue__.$forceUpdate();
  });
});
// add eventLabel
nodeEventMap.map((map, i) => {
  map.eventNode.parentNode.appendChild(map.eventLabel);
});
// position
setPosition(nodeEventMap);
window.removeEventListener('resize', setPosition(nodeEventMap));
window.addEventListener('resize', setPosition(nodeEventMap));
return EventLabelCollection
} else {
return []
}
}
// createComponentsLabel
function createComponentsLabel (el, vm, vmNname) {
const div = document.createElement('div');
div.title = `<${vmNname}/>`;
setElementProps(div,componentsLabelProps);
// createImg
const img = document.createElement('img');
setElementProps(img,componentsLabelImgProps);
div.appendChild(img);
// setEvent
div.addEventListener('click', (e) => {
e.stopPropagation();
e.preventDefault();
// clear previous style
if (preVm) {
  let el = preVm.$el;
  if (preVm.$options.comment) { // comment
     el = el.parentNode;
  }
  setElementProps(el,{style:{outline:'1px solid green'}});
}
// set previous vm
preVm = vm;
// set curVm
vm.$root.VCIIndex.change(vm);
// set cur style
setElementProps(el,{style:{outline:'3px solid red',outlineOffset:'-3px'}});
// clearDomEventLabel
clearDomEventLabel && clearDomEventLabel();
// create event label
const domEventLabel = createDomEventLabel(vm);
// set clearDomEventLabel-fn
vm.$root.clearDomEventLabel = clearDomEventLabel = function () {
  domEventLabel.map((v) => {
    v.remove();
  });
};
// set global $vm
window.$vm = vm;
});
// 把创建后的子元素追加到组件父级元素中
// el.parentNode.appendChild(div);
// 把创建后的子元素追加到组件元素中
// el.appendChild(div);
// positiong ComponentsLabel
function setCreateComponentsLabelPosition (map) {
map.map((map, i) => {
  const offsetTop = map.vmEl.offsetTop;
  const offsetLeft = map.vmEl.offsetLeft;
  const top = offsetTop;
  // let left = map.vmEl.offsetWidth/2 + offsetLeft
  const left = offsetLeft;
  setElementProps(map.componentsLabel,{style:{top:(top+'px'),left: (left + 'px')}});
});
}
window.setTimeout(() => {
setCreateComponentsLabelPosition([{
  vmEl: el,
  componentsLabel: div
}]);
}, 2000);
window.addEventListener('resize', () => {
setCreateComponentsLabelPosition([{
  vmEl: el,
  componentsLabel: div
}]);
});
return div
}

let _Vue;
function install (Vue,options={}) {
  if (install.installed && _Vue === Vue) return
  install.installed = true;
  _Vue = Vue;
  // debugger
  let noInspect = options.noInspect||[];
  noInspect.map((v)=>{
    NoInspect.push(v);
  });


  const componentsLabelCollection = [];
  // minxin mounted , destroyed
  Vue.mixin({
    mounted () {
      let el = this.$el;
      const vmNname = this.$options.name;
      if (this && this.$root === this) {
        // rootVm

        // set componentsLabelCollection
        this.$root.componentsLabelCollection = componentsLabelCollection;
        this.$root.$options.fileUrl = 'root';
        // set curVm
        this.curVm = null;
      }
      if (isViewCom(this)) {
        // remark selet element
        if (el.nodeType === 8) {
          el = el.parentNode;
          this.$options.comment = true;
        }
        /* const computedStyle = document.defaultView.getComputedStyle(el, null)
        const position = computedStyle.position
        if (position !== 'absolute' && position !== 'relative' && position !== 'fixed') {
          el.style.position = 'relative'
        }*/
        // Process Event
        window.setTimeout(() => {
          addEventList(this);
        });
        // add component label
        const componentsLabel = createComponentsLabel(el, this, vmNname);
        this.componentsLabel = componentsLabel;
        componentsLabelCollection.push({ vmEl: el, componentsLabel: componentsLabel });
      }
    },
    destroyed () {
      this.componentsLabel && this.componentsLabel.remove();
    }
  });
  Vue.component('Page', __vue_component__$a);
  Vue.component('VueComponentInspector', __vue_component__$6);
}

/*  */

const inBrowser = typeof window !== 'undefined';

const VCI = {
  install: install,
  version: '1.1.13'
};
if (inBrowser && window.Vue) {
  window.Vue.use(VCI,{
    noInspect:['ElPagination', 'ElDialog', 'ElAutocomplete', 'ElDropdown', 'ElDropdownMenu', 'ElDropdownItem', 'ElMenu', 'ElSubmenu', 'ElMenuItem', 'ElMenuItemGroup', 'ElInput', 'ElInputNumber', 'ElRadio', 'ElRadioGroup', 'ElRadioButton', 'ElCheckbox', 'ElCheckboxButton', 'ElCheckboxGroup', 'ElSwitch', 'ElSelect', 'ElOption', 'ElOptionGroup', 'ElButtonGroup', 'ElTable', 'ElTableColumn', 'ElDatePicker', 'ElTimeSelect', 'ElTimePicker', 'ElPopover', 'ElTooltip', 'ElBreadcrumb', 'ElBreadcrumbItem', 'ElForm', 'ElFormItem', 'ElTabs', 'ElTabPane', 'ElTag', 'ElTree', 'ElAlert', 'ElSlider', 'ElIcon', 'ElRow', 'ElCol', 'ElUpload', 'ElProgress', 'ElSpinner', 'ElBadge', 'ElCard', 'ElRate', 'ElSteps', 'ElStep', 'ElCarousel', 'ElScrollbar', 'ElCarouselItem', 'ElCollapse', 'ElCollapseItem', 'ElCascader', 'ElColorPicker', 'ElTransfer', 'ElContainer', 'ElHeader', 'ElAside', 'ElMain', 'ElFooter', 'ElTimeline', 'ElTimelineItem', 'ElLink', 'ElDivider', 'ElImage', 'ElCalendar', 'ElBacktop', 'ElPageHeader', 'ElCascaderPanel', 'ElAvatar', 'ElDrawer', 'ElPopconfirm', 'ElCollapseTransition', 'ElTreeNode', undefined, 'SvgIcon', 'SidebarItem','ElTableBody','ElTableHeader','ElSelectDropdown']
  });
}

module.exports = VCI;
