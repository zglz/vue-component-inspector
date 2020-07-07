<template>
  <div class="basic-container" style="">
    <p>组件类型:普通组件</p>
    <p>组件路径:{{ url }}</p>


  </div>
</template>
<script>
export default {
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
            let vm = val
            let url=vm.$options.name
            while (vm.$parent && vm.$parent.$options.name) {
                  url = vm.$parent.$options.name + '/' + url
                  vm = vm.$parent
            }
            this.url = url
          }
      }
  },
  mounted () {
    //      debugger
    //      this.curVm.a = this.$root.curVm

  },
  methods: {
    toggle () {
      const index = document.getElementById('index-container')
      if (index.style.right === '0px') {
        index.style.right = '-400px'
      } else {
        index.style.right = '0px'
      }
    },
    handleChange (val) {
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

