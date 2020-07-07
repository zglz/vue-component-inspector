<template>
  <div class="page-container">
    <contaienr02 style="height:100px;width:200px;background:lavender"/>
    <contaienr01 style="height:300px;width:400px;background:lavender;margin-left:100px" @getData01="getData01" @getData02="getData02(1)"/>
    <contaienr03 style="height:300px;width:400px;background:lavender"/>

  </div>
</template>
<script>
import contaienr01 from './contaienr-01.vue'
import contaienr02 from './contaienr-02.vue'
import contaienr03 from './contaienr-03.vue'
export default {
  name: 'Page',
  components: {
    contaienr01, contaienr02, contaienr03
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

}
</script>
<style scoped>
</style>
<style>
</style>

