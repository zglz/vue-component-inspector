<template>
  <div class="event-container" style="">
    <!--{{curVm&&curVm.$options.eventList}}-->
    <!--DOM-Event-->
    <p class="type-title">DOM-Event</p>
    <br>
    <div v-if="curVm&&curVm.$options.eventList&&curVm.$options.eventList.dom&&curVm.$options.eventList.dom.length>0">
      <span v-for="(item , index) in curVm&&curVm.$options.eventList.dom">
        <div v-if="item.isShow" style="padding-left: 20px;">
          <!--<span class="dom-type">{{item.name}}</span><br>-->
          <span v-for="( eventItem , index) in item.event" style="display:block;margin-bottom:5px">
            {{ eventItem.type }}
            - <el-tag  type="success" style="height: 25px;line-height: 25px;">{{ eventItem.name }}</el-tag>
            <span class="el-icon-view codeView" style="" @click="viewCode(eventItem,'dom')"/><br>
          </span>

        </div>
      </span>
    </div>
    <!--Component-Event-->
    <p class="type-title">Component-Event</p>
    <br>
    <div v-if="curVm&&curVm.$options.eventList&&curVm.$options.eventList.dom&&curVm.$options.eventList.com.length>0" style="padding-left: 20px;">
      <span v-for="(event , index) in curVm&&curVm.$options.eventList.com" style="display:block;margin-bottom:5px">
        {{ event.type }}
        - <el-tag type="success"  style="height: 25px;line-height: 25px;" >{{ event.name?event.name:'anonymous' }}</el-tag>
        <span class="el-icon-view codeView" style="" @click="viewCode(event,'com')"/><br>

      </span>
    </div>

  </div>
</template>
<script>
export default {
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
        console.log(eventItem.fn)
      } else {
        if (eventItem.name) {
          // find fn
          let $parent = this.curVm.$parent
          while (!$parent[eventItem.name]) {
            $parent = $parent.$parent
          }
          console.log($parent[eventItem.name])
        } else {
          console.log(eventItem.fn)
        }
      }
    },
    handleChange (val) {
    }
  }

}
</script>

<style scoped>
  .event-container{
    padding-left: 10px;
  }
  .dom-type{
    background: rgb(255, 253, 52);
    border: 1px solid rgb(128, 136, 125);
    display: inline-block;
    border-radius: 5px;
    padding: 1px 5px;
  }
  .codeView{
    cursor:pointer;
    vertical-align: -3px;
    margin-left: 6px;
    font-size: 20px;
  }
  .codeView:hover{
    color: #519eff;
  }
  .type-title{
    margin-bottom: 10px;
    margin-top: 10px;
    color: #a6dfa3;
    font-size: 15px;
    /*background: #a6dfa3;*/
    padding: 0px 5px;
    border-radius: 4px;
    padding-bottom: 2px;
    display:inline-block;
    font-weight: bolder;
  }

</style>
<style>
</style>

