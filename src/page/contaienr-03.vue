<template>
  <div class="input-container">
    <!--{{a}}-->
    <br><br><br><br><br><br><br><br>
    <div v-if="a.d">{{ a.d }}</div>
    <div v-if="a">{{ a }}</div>
    <br>
    <div v-if="b">{{ b }}</div>
    <!--非响应式数据-->

  </div>
</template>
<script>
export default {
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

