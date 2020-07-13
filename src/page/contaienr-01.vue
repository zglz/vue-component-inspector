<template>
  <div class="input-container">

    <button @click="btnClick01">btnClick01</button><br><br><br>
    <button @click="btnClick02('btnClick02')">btnClick02</button><br><br><br>
    <button @click="mouseover" @mouseover="mouseover">mouseover</button><br><br><br>
    <button @click="i=true">inline-event</button><br><br><br>
    <el-button type="primary" icon="" size="mini" @click="formCreate">el-button</el-button>
    <!--<div>{{a.b}}</div>-->
    <div v-for="(item,index) in a.b" :key="index" style="">
      {{ item }}
    </div>

  </div>
</template>
<script>
export default {
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
        this.componentsView('com')
      } else {
        this.componentsView('mor')
      }
    }
  },
  mounted () {

  },
  methods: {
    btnClick01 () {
      console.log('btnClick01')
    },
    btnClick02 (p) {
      console.log(p)
    },
    btnClick03 () {
      console.log('btnClick03')
    },
    mouseover () {
      console.log('mouseover')
    },
    formCreate () {
      console.log('formCreate')
    }
  }

}
</script>

<style scoped>
</style>
<style>
</style>

