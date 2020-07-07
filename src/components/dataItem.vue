<template>
  <span>
    <!--{{item}}-->
    <span style="margin-right:10px;">{{ item.key }} :</span>
    <!--Object||Array-->
    <span v-if="item.type === 'Object' || item.type === 'Array'">
      <span style="font-weight: bolder;" :style="{color:item.type === 'Object'?'#519eff':'#f56c6c'}">{{ item.type }} <span v-if="item.type === 'Array'">({{ item.children?item.children.length:0 }})</span></span>
    </span>
    <!--boolean-->
    <span v-else-if=" item.type === 'boolean'">
      <el-checkbox v-if="type === 'dataTree'" v-model="item.value"/>
      <span v-else>{{ item.value }}</span>
      <!--<input v-model="item.value" type="text" @click="handleClick(item)">-->
    </span>
    <!--number-->
    <span v-else-if=" item.type === 'number'">
      <el-input-number size="mini" style="transform: scale(0.7);transform-origin: 0 50%;" v-if="type === 'dataTree'" v-model="item.value"></el-input-number>
      <!--<input v-if="type === 'dataTree'" v-model="item.value" type="number" @click="handleClick( item)">-->
      <span v-else>{{ item.value }}</span>
    </span>
    <!--string-->
    <span v-else>
      <!--<el-input size="mini" style="transform: scale(0.7);transform-origin: 0 50%;" v-if="type === 'dataTree'" v-model="item.value"></el-input>-->
      <input v-if="type === 'dataTree'" v-model="item.value" type="text" @click="handleClick(item)">
      <span v-else>{{ item.value }}</span>
    </span>
  </span>
</template>
<script>
export default {
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

}
</script>

<style scoped>
  .basic-container{

  }
</style>
<style>
</style>

