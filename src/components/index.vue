<template>
  <div id="index-container" class="index-container" style="">
    <div style="height: 100%;overflow: auto;padding-top: 35px;">
      <!--toggle btn-->
      <i class="el-icon-d-caret open-btn" style="" @click="toggle"/>
      <div class="tool-bar">
        VCI - __VERSION__ <br>
        <!--view switch-->
        <div>
          ComponentsView <el-switch v-model="componentsView" style="vertical-align: sub;margin-left: 10px;"/>
            <i class="el-icon-refresh refreshBtn" @click="()=>{componentsView&&showComponentsLabel()}"></i>
        </div>
      </div>
      <!--components navigation tree-->
      <Navigation :cur-vm="curVm" style="margin-top:30px"/>
      <!--name-->
      <h1 v-if="curVm" class="vm-name">
        <div><{{ curVm&&curVm.$options.name }}></div>
        <span class="path">{{path}}</span>
      </h1>
      <p v-else style="" class="no-select"> select a component to inspect </p>
      <el-collapse v-model="activeNames" style="margin-top:50px" @change="handleChange">
<!--        <el-collapse-item title="Basic" name="1">
          <Basic :curVm="curVm"/>
        </el-collapse-item>-->
        <el-collapse-item title="Data" name="2">
          <template slot="title">
            <!--<i class="header-icon el-icon-info"></i>--> Data
          </template>
          <Data id="data" :curVm="curVm" @showData="showData"/>
        </el-collapse-item>
        <el-collapse-item title="Event" name="3">
          <template slot="title">
            <!--<i class="header-icon el-icon-info"></i>--> Event
          </template>
          <Event id="event" :curVm="curVm"/>
        </el-collapse-item>
        <el-collapse-item title="DIY" name="4">
          <template slot="title">
            <!--<i class="header-icon el-icon-info"></i>--> DIY
          </template>
          <div class="diy">
              Here's your idea
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <div v-if="isShowDataSource" style="" class="data-source">
      <button @click="isShowDataSource=false">close</button>
      <pre>{{ dataSource }}</pre>
    </div>


  </div>
</template>
<script>
// import { ElementUI } from '../config'
// import { isViewCom, addEventList } from './../util/util'
import Navigation from './navigation.vue'
import Basic from './basic.vue'
import Event from './event.vue'
import Data from './data.vue'
export default {
  name: 'VueComponentInspector',
  components: {
    Navigation, Basic, Data, Event
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
      this.$root.componentsView = val
      if (val) {
        this.showComponentsLabel()
      } else {
        this.hideComponentsLabel()
      }
    },
    'curVm': {
      handler (val) {
        let vm = val
        let path = vm.$options.name
        while (vm.$parent && vm.$parent.$options.name) {
          path = vm.$parent.$options.name + ' / ' + path
          vm = vm.$parent
        }
        this.path = path
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
    this.$root.VCIIndex = this
  },
  methods: {
    // change curVm
    change (vm) {
      this.curVm = vm
    },
    toggle () {
      const index = document.getElementById('index-container')
      if (index.style.right === '0px') {
        index.style.right = '-396px'
      } else {
        index.style.right = '0px'
      }
    },
    handleChange (val) {
    },
    showData (data, flag) {
      flag && (this.isShowDataSource = true)
      this.dataSource = data
    },
    showComponentsLabel () {
      this.$root.componentsLabelCollection.map((map, i) => {
        if (map.componentsLabel.parentNode !== map.vmEl.parentNode) {
          if (map.vmEl.parentNode) {
            map.vmEl.parentNode.appendChild(map.componentsLabel)
          }
        }
        map.componentsLabel.style.display = 'block'
        map.vmEl.style.outline = '1px solid green'
        map.vmEl.style.outlineOffset = '-4px'
      })
    },
    hideComponentsLabel () {
      this.$root.componentsLabelCollection.map((map, i) => {
        document.body.appendChild(map.componentsLabel)
        map.componentsLabel.style.display = 'none'
        map.vmEl.style.outline = ''
      })
      this.$root.clearDomEventLabel && this.$root.clearDomEventLabel()
    }
  }

}
</script>

<style scoped>
  .tool-bar{
    position: absolute;
    top: 10px;
    z-index: 10;
    background: #ffffff;
    width: 91%;
    border-bottom: 1px solid #ebeef5;
    padding-bottom: 10px;
  }
  .index-container{
    position:absolute;
    width:400px;
    height:100%;
    right:-396px;
    bottom:0;
    background: #fff;
    z-index: 10000;
    transition: all 0.2s linear 0s;
    border: 1px solid #ccc;
    padding: 10px;
    box-sizing: border-box;
    border-left: 4px solid #a6e2c3;
    /*overflow:auto;*/
  }
  .open-btn{
    transform: rotate(-90deg);
    font-size: 30px;
    cursor:pointer;
    position: absolute;
    top: 0px;
    left: -36px;

  }
  .open-btn:hover{
    color: #409eff;
  }
  .data-source{
    position: absolute;
    height: 100%;
    background: lavender;
    width: 100%;
    top: 0;
    right: 0;
    overflow: auto;
    z-index: 10;
  }
  .path{
  font-size: 12px;
  background: #a6dfa4;
  color: #ffffff;
  padding: 0px 15px;
  padding-bottom: 2px;
  border-radius: 10px;
  /*font-weight: bolder;*/
    position: relative;
    top: -10px;
    word-wrap: break-word;
  }
  .no-select{
    color:#a6dfa5;
    margin-top:50px;
    text-align:center;
    font-size: 18px;
  }
  .vm-name{
      margin-top:50px;
      font-size: 25px;
      color: #a6dfa5;
      text-align:center;
  }
  .refreshBtn{
      font-size: 18px;
      margin-left: 6px;
      cursor: pointer;
  }
  .refreshBtn:hover{
      color: #519eff;
  }
   .diy{
       height: 100px;
       line-height: 100px;
       text-align: center;
       color: #2de523;
       font-size: 20px;
   }
</style>
<style>
  body{
    overflow:hidden;
  }

  .vue-component-inspector:hover{
      border: 1.5px solid #0b6207;
  }

  .event-icon:hover{
      color: #409EFF !important;
  }
  .event-label:hover{
      border-color: #409EFF !important;
  }

  /* scrollbar style */
  ::-webkit-scrollbar{
      width:9px
  }

  ::-webkit-scrollbar-track{
      -webkit-border-radius:5px;
      border-radius:5px;
      background:rgba(0, 0, 0, .1)
  }

  ::-webkit-scrollbar-thumb{
      -webkit-border-radius:5px;
      border-radius:5px;
      background:rgba(0, 0, 0, .2)
  }

  ::-webkit-scrollbar-thumb:hover{
      background:rgba(0, 0, 0, .4)
  }

  ::-webkit-scrollbar-thumb:window-inactive{
      background:rgba(0, 0, 0, .05)
  }
  /* scrollbar style */

</style>

