<template>
  <div id="" class="basic-container" style="">
    <div class="wraper">

      <el-input v-if="treeData.length>0" v-model="filterText" placeholder="Enter keywords to filter" size="mini"/>
      <!--<i v-if="treeData.length>0" class="el-icon-top-left icon-top-left" @click="toParent" style="cursor:pointer"></i>-->
      <!--{{treeData}}-->
      <div class="treeWraper">
        <div v-if="showLoading"  class="loadingWraper">
          <treeLoading></treeLoading>
        </div>

        <el-tree
          ref="tree"
          :data="treeData"
          :default-expand-all="true"
          :expand-on-click-node="true"
          :highlight-current="true"
          :default-expanded-keys="idArr"
          :filter-node-method="filterNode"
          class="tree"
          node-key="id"
          @node-click="handleClick">
          <span slot-scope="{ node, data }" class="custom-tree-node" @mouseover="() => mouseover(data)" @mouseout="() => mouseout(data)">
            <!--{{data}}-->
            <span style="color:#606266"><<span style="color:#67c23a;">{{ node.label }}</span>><span v-if="data.root" style="color:#67c23a;"> - $vm</span></span>
            <i v-if="data.vm.componentsLabel && !data.root" class="el-icon-aim icon-aim" title="inpect" @click="() => check(data)" style="border-radius: 10px;"/>
            <i v-if="data.root" class="el-icon-top-left icon-top-left" title="parent" @click="() => toParent()"/>
          </span>
        </el-tree>
      </div>
    </div>
  </div>
</template>
<script>
//import { isViewCom } from './../util/util'
import treeLoading from './treeLoading.vue'
export default {
  name: 'Navigation',
  components: {
      treeLoading
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
        this.creatNavTree(val)
      }
    },
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted () {
    this.$root.VCINav = this
  },
  methods: {
    creatNavTree (vm) {
      this.showLoading = true
      function parseObj (data) {
        const result = []
        data.$children.map((vm, i) => {
            const item = {
                id: vm._uid,
                label: vm.$options.name ? vm.$options.name : 'anonymous',
                vm: vm
            }
            if (vm.$children.length > 0) {
                item.children = parseObj(vm)
            }
            result.push(item)
        })
        return result
      }
        window.setTimeout(()=>{
            const treeData = [{
                id: vm._uid,
                label: vm.$options.name,
                vm: vm,
                children: parseObj(vm),
                root: true //
            }]
            this.treeData = treeData
            this.showLoading = false
        },1000)

    },
    handleClick (data) {
    },
    toParent () {
      let $parent = this.curVm.$parent
      if($parent !== $parent.$root){
          while (!$parent.componentsLabel) {
              $parent = $parent.$parent
          }
          $parent.componentsLabel.click()
      }
    },
    check (data) {
      console.log(data)
      data.vm.componentsLabel.click()
    },
    mouseover (data) {
      const vm = data.vm
      let el = vm.$el
      if (el.nodeType === 8) {
          el = el.parentNode
          vm.$options.comment = true
      }
      el.style.outline = '3px solid red';
      el.style.outlineOffset='-4px';
    },
    mouseout (data) {
      const vm = data.vm
      if (this.curVm !== vm) {
        let el = vm.$el
        if (vm.$options.comment) { // comment-com
          el = el.parentNode
        }
        el.style.outline = ''
      }
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.toUpperCase().indexOf(value.toUpperCase()) !== -1
    }
  }
}
</script>

<style scoped>
  .wraper{
    border: 1px solid;
    border-radius: 7px;
    padding: 5px;
    height: 300px;
    overflow: hidden;
    position: relative;
  }
  .treeWraper{
    height: 230px;
    overflow: auto;
    margin-top: 10px;
  }
  .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
  }
  .icon-top-left{
      cursor: pointer;
      border: 1px solid #000;
  }
  .icon-top-left:hover{
      border: 1px solid #519eff;
      color: #ffffff;
      background: #519eff;
  }
  .icon-aim:hover{
      border: 1px solid #519eff;
      color: #ffffff;
      background: #519eff;
  }
  .loadingWraper{
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    bottom: 0;
    background: white;
    z-index: 10;
    text-align: center;
    line-height: 240px;
  }

</style>
<style>
</style>

