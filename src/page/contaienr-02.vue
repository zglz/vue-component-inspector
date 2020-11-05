<template>
  <div class="input-container">
    组件A
  </div>
</template>
<script>
export default {
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
      boy:{

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
    componentsView (view) {
    }
  }

}
</script>

<style scoped>
  .input-container{
    height: 100px;
    width: 200px;
    background: #e6e6fa;
    text-align: center;
    font-size: 30px;
  }
</style>
<style>
</style>

